import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { STATUSES, type MessageStatus, deleteMessage, getMessage, isUuid, setStatus } from "@/app/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function GET(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isUuid(params.id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const found = await getMessage(params.id);
  return found ? NextResponse.json(found) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isUuid(params.id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  if (!STATUSES.includes(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const ok = await setStatus(params.id, body.status as MessageStatus);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isUuid(params.id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const ok = await deleteMessage(params.id);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
