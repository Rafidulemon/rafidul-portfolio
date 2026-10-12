import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { ensureSchema, sql } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await ensureSchema();
  const rows = await sql`delete from media where id = ${params.id}::uuid returning id`;
  return rows.length ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
