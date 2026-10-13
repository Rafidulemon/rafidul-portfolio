import { ensureSchema, sql } from "@/app/lib/db";
import { mediaUrl } from "@/app/lib/media";

export const runtime = "nodejs";

// Public: serves images uploaded from the admin panel.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return new Response("Not found", { status: 404 });
  try {
    await ensureSchema();
    const rows = await sql`select mime, data, key from media where id = ${params.id}::uuid`;
    if (!rows.length) return new Response("Not found", { status: 404 });

    // Newer uploads live in R2: send visitors straight to the public object.
    if (rows[0].key) {
      return Response.redirect(mediaUrl(String(rows[0].key)), 308);
    }
    const raw = rows[0].data as unknown;
    const bytes =
      typeof raw === "string"
        ? Buffer.from(raw.replace(/^\\x/, ""), "hex")
        : Buffer.from(raw as Uint8Array);

    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": String(rows[0].mime),
        // Ids are random and files are never edited in place, so they can be cached forever.
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  } catch (error) {
    console.error("[media] read failed:", error);
    return new Response("Unavailable", { status: 503 });
  }
}
