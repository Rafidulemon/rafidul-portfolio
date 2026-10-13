import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { RANGES, type RangeKey, clearViews, getStats } from "@/app/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const r = new URL(req.url).searchParams.get("range") ?? "7d";
  const range = (r in RANGES ? r : "7d") as RangeKey;
  try {
    return NextResponse.json(await getStats(range));
  } catch (error) {
    console.error("[admin] analytics:", error);
    return NextResponse.json({ error: "Could not load visitor data" }, { status: 500 });
  }
}

/** Wipes all recorded visits (the "Clear data" button). */
export async function DELETE(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  await clearViews();
  return NextResponse.json({ ok: true });
}
