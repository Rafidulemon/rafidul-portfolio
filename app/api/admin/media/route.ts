import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { ensureSchema, sql } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB request body limit

// Identify the real file type from its first bytes instead of trusting the browser.
function sniffImage(b: Uint8Array): string | null {
  const hex = (n: number) => Array.from(b.slice(0, n)).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (hex(8) === "89504e470d0a1a0a") return "image/png";
  if (hex(3) === "ffd8ff") return "image/jpeg";
  if (hex(4) === "47494638") return "image/gif";
  if (hex(4) === "52494646" && Buffer.from(b.slice(8, 12)).toString("ascii") === "WEBP") return "image/webp";
  if (Buffer.from(b.slice(4, 12)).toString("ascii") === "ftypavif") return "image/avif";
  return null; // SVG and everything else is refused (SVG can carry scripts)
}

export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  await ensureSchema();
  const rows = await sql`select id, name, mime, size, created_at from media order by created_at desc limit 60`;
  return NextResponse.json({
    items: rows.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      mime: r.mime as string,
      size: r.size as number,
      url: `/api/media/${r.id}`,
      created_at: new Date(r.created_at).toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    file = f instanceof File ? f : null;
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is larger than 4 MB" }, { status: 413 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffImage(bytes);
  if (!mime) {
    return NextResponse.json({ error: "Only PNG, JPEG, GIF, WebP or AVIF images are allowed" }, { status: 415 });
  }

  const hex = "\\x" + Buffer.from(bytes).toString("hex");
  const name = file.name.replace(/[^\w.\- ]+/g, "").slice(0, 120) || "image";
  await ensureSchema();
  const rows = await sql`insert into media (mime, size, name, data) values (${mime}, ${bytes.length}, ${name}, ${hex}::bytea) returning id`;
  const id = rows[0].id as string;
  return NextResponse.json({ ok: true, id, url: `/api/media/${id}`, name, mime, size: bytes.length }, { status: 201 });
}
