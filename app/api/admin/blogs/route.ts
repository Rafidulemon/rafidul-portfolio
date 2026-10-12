import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { legacyBlogList, listPosts, savePost } from "@/app/lib/blog/store";
import { getContentForAdmin } from "@/app/lib/content/store";
import { syncEmbeddings } from "@/app/lib/ai/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  try {
    const [posts, meta] = await Promise.all([listPosts(), getContentForAdmin("blog_meta")]);
    const hidden = new Set(meta.data.hidden);
    const legacy = legacyBlogList().map((b) => ({ ...b, hidden: hidden.has(b.id) }));
    return NextResponse.json({ posts, legacy });
  } catch (error) {
    console.error("[admin] list posts failed:", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const result = await savePost(null, body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error, issues: result.issues }, { status: result.status });
    }
    try {
      await syncEmbeddings();
    } catch {
      // best effort
    }
    return NextResponse.json({ ok: true, post: result.post }, { status: 201 });
  } catch (error) {
    console.error("[admin] create post failed:", error);
    return NextResponse.json({ error: "Could not save the post" }, { status: 500 });
  }
}
