import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { getContentForAdmin, isContentKey, resetContent, saveContent } from "@/app/lib/content/store";
import { syncEmbeddings } from "@/app/lib/ai/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { key: string } };

export async function GET(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isContentKey(params.key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  try {
    return NextResponse.json(await getContentForAdmin(params.key));
  } catch (error) {
    console.error("[admin] read failed:", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isContentKey(params.key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const result = await saveContent(params.key, body);
    if (!result.ok) {
      return NextResponse.json({ error: "Validation failed", issues: result.issues }, { status: 400 });
    }
    // Keep the AI search/chat index in step with what was just saved (best effort).
    let embedded = 0;
    try {
      embedded = (await syncEmbeddings()).embedded;
    } catch (error) {
      console.error("[admin] embedding sync failed:", error);
    }
    return NextResponse.json({ ok: true, data: result.data, embedded });
  } catch (error) {
    console.error("[admin] save failed:", error);
    return NextResponse.json({ error: "Could not save to the database" }, { status: 500 });
  }
}

/** Reverts a section to the content the site shipped with. */
export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isContentKey(params.key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  try {
    await resetContent(params.key);
    try {
      await syncEmbeddings();
    } catch {
      // best effort
    }
    return NextResponse.json({ ok: true, ...(await getContentForAdmin(params.key)) });
  } catch (error) {
    console.error("[admin] reset failed:", error);
    return NextResponse.json({ error: "Could not reset" }, { status: 500 });
  }
}
