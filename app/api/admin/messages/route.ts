import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { listMessages } from "@/app/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const url = new URL(req.url);
  try {
    return NextResponse.json(
      await listMessages({ status: url.searchParams.get("status") ?? undefined, q: url.searchParams.get("q") ?? undefined })
    );
  } catch (error) {
    console.error("[admin] list messages:", error);
    return NextResponse.json({ error: "Could not load messages" }, { status: 500 });
  }
}
