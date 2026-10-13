import { ensureSchema, sql } from "./db";

export type MessageStatus = "new" | "read" | "replied" | "archived";
export const STATUSES: MessageStatus[] = ["new", "read", "replied", "archived"];

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  status: MessageStatus;
  intent: string;
  urgency: string;
  summary: string;
  draft: string;
  created_at: string;
  read_at: string | null;
  replies: number;
};
export type ReplyRow = { id: string; to_email: string; subject: string; body: string; created_at: string };

const iso = (d: unknown) => (d ? new Date(d as string).toISOString() : null);
const toMessage = (r: Record<string, unknown>): MessageRow => ({
  id: r.id as string,
  name: r.name as string,
  email: r.email as string,
  subject: r.subject as string,
  body: r.body as string,
  status: r.status as MessageStatus,
  intent: r.intent as string,
  urgency: r.urgency as string,
  summary: r.summary as string,
  draft: r.draft as string,
  created_at: iso(r.created_at)!,
  read_at: iso(r.read_at),
  replies: Number(r.replies ?? 0),
});

export async function createMessage(m: {
  name: string;
  email: string;
  subject: string;
  body: string;
  intent?: string;
  urgency?: string;
  summary?: string;
  draft?: string;
}) {
  await ensureSchema();
  const rows = await sql`insert into messages (name, email, subject, body, intent, urgency, summary, draft)
    values (${m.name}, ${m.email}, ${m.subject}, ${m.body}, ${m.intent ?? "other"}, ${m.urgency ?? "normal"}, ${m.summary ?? ""}, ${m.draft ?? ""})
    returning id`;
  return rows[0].id as string;
}

export async function listMessages(opts: { status?: string; q?: string } = {}) {
  await ensureSchema();
  const status = STATUSES.includes(opts.status as MessageStatus) ? (opts.status as string) : null;
  const q = opts.q?.trim() ? `%${opts.q.trim().replace(/[%_]/g, "")}%` : null;
  const rows = await sql`select m.*, (select count(*) from message_replies r where r.message_id = m.id) as replies
    from messages m
    where (${status}::text is null or m.status = ${status})
      and (${q}::text is null or m.name ilike ${q} or m.email ilike ${q} or m.subject ilike ${q} or m.body ilike ${q})
    order by m.created_at desc limit 200`;
  const c = await sql`select status, count(*)::int n from messages group by status`;
  const counts: Record<string, number> = { new: 0, read: 0, replied: 0, archived: 0 };
  for (const r of c) counts[r.status as string] = r.n as number;
  return { messages: rows.map(toMessage), counts };
}

export async function getMessage(id: string) {
  await ensureSchema();
  const rows = await sql`select m.*, (select count(*) from message_replies r where r.message_id = m.id) as replies
    from messages m where m.id = ${id}::uuid`;
  if (!rows.length) return null;
  const replies = await sql`select id, to_email, subject, body, created_at from message_replies where message_id = ${id}::uuid order by created_at asc`;
  return {
    message: toMessage(rows[0]),
    replies: replies.map((r) => ({
      id: r.id as string,
      to_email: r.to_email as string,
      subject: r.subject as string,
      body: r.body as string,
      created_at: iso(r.created_at)!,
    })) as ReplyRow[],
  };
}

export async function setStatus(id: string, status: MessageStatus) {
  await ensureSchema();
  const rows = await sql`update messages set status = ${status},
      read_at = case when ${status} <> 'new' and read_at is null then now() else read_at end
    where id = ${id}::uuid returning id`;
  return rows.length > 0;
}

export async function addReply(id: string, r: { to_email: string; subject: string; body: string }) {
  await ensureSchema();
  await sql`insert into message_replies (message_id, to_email, subject, body) values (${id}::uuid, ${r.to_email}, ${r.subject}, ${r.body})`;
  await sql`update messages set status = 'replied', read_at = coalesce(read_at, now()) where id = ${id}::uuid`;
}

export async function deleteMessage(id: string) {
  await ensureSchema();
  const rows = await sql`delete from messages where id = ${id}::uuid returning id`;
  return rows.length > 0;
}

export async function unreadCount() {
  await ensureSchema();
  const rows = await sql`select count(*)::int n from messages where status = 'new'`;
  return rows[0].n as number;
}

export const isUuid = (v: string) => /^[0-9a-f-]{36}$/i.test(v);
