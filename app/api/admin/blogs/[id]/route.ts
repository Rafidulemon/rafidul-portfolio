import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { deletePost, getPostById, savePost } from "@/app/lib/blog/store";
import { syncEmbeddings } from "@/app/lib/ai/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

const parseId = (raw: string) => {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export async function GET(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const post = await getPostById(id);
  return post ? NextResponse.json({ post }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const result = await savePost(id, body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error, issues: result.issues }, { status: result.status });
    }
    try {
      await syncEmbeddings();
    } catch {
      // best effort
    }
    return NextResponse.json({ ok: true, post: result.post });
  } catch (error) {
    console.error("[admin] update post failed:", error);
    return NextResponse.json({ error: "Could not save the post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const ok = await deletePost(id);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
