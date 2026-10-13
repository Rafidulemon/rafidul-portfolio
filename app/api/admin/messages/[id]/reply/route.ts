import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin/guard";
import { createTransporter, mailConfig, oneLine } from "@/app/lib/mail";
import { addReply, getMessage, isUuid } from "@/app/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  if (!isUuid(params.id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const input = await req.json().catch(() => ({}));
  const text = String(input.body ?? "").trim();
  if (!text) return NextResponse.json({ error: "Write a reply first" }, { status: 400 });
  if (text.length > 10_000) return NextResponse.json({ error: "Reply is too long (max 10,000 characters)" }, { status: 400 });

  const found = await getMessage(params.id);
  if (!found) return NextResponse.json({ error: "Message not found" }, { status: 404 });
  const { message } = found;

  if (!mailConfig()) return NextResponse.json({ error: "Email service is not configured on the server" }, { status: 503 });

  const base = oneLine(input.subject) || message.subject;
  const subject = (/^re:/i.test(base) ? base : `Re: ${base}`).slice(0, 200);
  const quoted = message.body
    .split("\n")
    .map((l) => `> ${l}`)
    .join("\n");
  const when = new Date(message.created_at).toUTCString();
  const mailText = `${text}\n\n— — —\nOn ${when}, ${message.name} wrote:\n${quoted}`;

  try {
    const { cfg, transporter } = createTransporter();
    await transporter.sendMail({
      from: cfg.from,
      to: { name: oneLine(message.name).replace(/["<>]/g, ""), address: message.email },
      replyTo: cfg.owner,
      subject,
      text: mailText,
    });
  } catch (error) {
    console.error("[admin] reply send failed:", error);
    return NextResponse.json({ error: "The email could not be sent. Check the mail settings and try again." }, { status: 502 });
  }

  // Saved only after the email actually went out, so the thread never shows a reply that wasn't sent.
  await addReply(params.id, { to_email: message.email, subject, body: text });
  return NextResponse.json({ ok: true });
}
