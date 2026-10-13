"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Spinner from "@/app/components/display/Spinner";
import { Button, api, cx, inputCls, useToasts } from "./ui";

type Status = "new" | "read" | "replied" | "archived";
type Msg = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  status: Status;
  intent: string;
  urgency: string;
  summary: string;
  draft: string;
  created_at: string;
  replies: number;
};
type Reply = { id: string; to_email: string; subject: string; body: string; created_at: string };
type Counts = Record<Status, number>;

const TABS: { id: "all" | Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "read", label: "Read" },
  { id: "replied", label: "Replied" },
  { id: "archived", label: "Archived" },
];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  read: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  replied: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  archived: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const short = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString()
    ? d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
};

function Pill({ status }: { status: Status }) {
  return <span className={cx("rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", STATUS_STYLE[status])}>{status}</span>;
}

export default function MessagesAdmin() {
  const { push, view: toasts } = useToasts();
  const [tab, setTab] = useState<"all" | Status>("all");
  const [q, setQ] = useState("");
  const [list, setList] = useState<Msg[] | null>(null);
  const [counts, setCounts] = useState<Counts>({ new: 0, read: 0, replied: 0, archived: 0 });
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ message: Msg; replies: Reply[] } | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const threadEnd = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("status", tab);
    if (q.trim()) params.set("q", q.trim());
    const res = await api<{ messages: Msg[]; counts: Counts }>(`/api/admin/messages?${params}`);
    if (res.ok) {
      setList(res.data.messages);
      setCounts(res.data.counts);
      window.dispatchEvent(new CustomEvent("messages-unread", { detail: res.data.counts.new }));
      setError("");
    } else setError(res.data.error || "Could not load messages");
  }, [tab, q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 250 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  // Deep link from the notification email: /admin/messages?id=…
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) setSelected(id);
  }, []);

  const open = useCallback(
    async (id: string) => {
      setSelected(id);
      setReply("");
      const res = await api<{ message: Msg; replies: Reply[] }>(`/api/admin/messages/${id}`);
      if (!res.ok) {
        push("error", res.data.error || "Could not open message");
        setSelected(null);
        return;
      }
      setDetail(res.data);
      if (res.data.message.status === "new") {
        await api(`/api/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ status: "read" }) });
        setDetail((d) => (d ? { ...d, message: { ...d.message, status: "read" } } : d));
        load();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [load]
  );

  useEffect(() => {
    if (selected && detail?.message.id !== selected) open(selected);
  }, [selected, detail?.message.id, open]);

  useEffect(() => {
    threadEnd.current?.scrollIntoView({ block: "nearest" });
  }, [detail?.replies.length, detail?.message.id]);

  const send = async () => {
    if (!detail || !reply.trim()) return;
    setSending(true);
    const res = await api(`/api/admin/messages/${detail.message.id}/reply`, {
      method: "POST",
      body: JSON.stringify({ body: reply }),
    });
    setSending(false);
    if (!res.ok) {
      push("error", res.data.error || "Could not send the reply");
      return;
    }
    push("success", `Reply sent to ${detail.message.email}`);
    setReply("");
    setDetail(null); // reload the thread
    open(detail.message.id);
    load();
  };

  const setStatus = async (status: Status) => {
    if (!detail) return;
    const res = await api(`/api/admin/messages/${detail.message.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    if (res.ok) {
      setDetail({ ...detail, message: { ...detail.message, status } });
      load();
    } else push("error", res.data.error || "Could not update");
  };

  const remove = async () => {
    if (!detail || !confirm(`Delete this message from ${detail.message.name}, with its replies? This cannot be undone.`)) return;
    const res = await api(`/api/admin/messages/${detail.message.id}`, { method: "DELETE" });
    if (res.ok) {
      push("success", "Message deleted.");
      setSelected(null);
      setDetail(null);
      load();
    } else push("error", res.data.error || "Could not delete");
  };

  const active = useMemo(() => (detail && detail.message.id === selected ? detail : null), [detail, selected]);

  return (
    <div className="mx-auto max-w-6xl">
      {toasts}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Messages from your contact form. Replies are sent by email and saved here.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cx(
              "rounded-full border px-3 py-1 text-sm transition",
              tab === t.id
                ? "border-cyan-600 bg-cyan-600 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            {t.label}
            {t.id !== "all" && counts[t.id] > 0 && <span className="ml-1.5 opacity-80">{counts[t.id]}</span>}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email or text…"
          aria-label="Search messages"
          className={cx(inputCls, "ml-auto max-w-xs")}
        />
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p>}

      <div className="mt-4 grid gap-4 min-[1024px]:grid-cols-[360px_1fr]">
        {/* List */}
        <div className={cx("overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60", selected && "max-[1023px]:hidden")}>
          {list === null ? (
            <div className="flex justify-center p-8"><Spinner size="md" label="Loading messages…" showLabel /></div>
          ) : list.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">{q || tab !== "all" ? "No messages match." : "No messages yet. They'll show up here when someone uses your contact form."}</p>
          ) : (
            <ul className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
              {list.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => open(m.id)}
                    className={cx(
                      "block w-full px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60",
                      selected === m.id && "bg-cyan-50 dark:bg-cyan-950/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={cx("truncate text-sm", m.status === "new" ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-700 dark:text-slate-200")}>
                        {m.status === "new" && <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-cyan-500" aria-label="Unread" />}
                        {m.name}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">{short(m.created_at)}</span>
                    </div>
                    <div className="truncate text-sm text-slate-700 dark:text-slate-300">{m.subject}</div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="truncate text-xs text-slate-500">{m.body.replace(/\s+/g, " ")}</span>
                      {m.replies > 0 && <span className="shrink-0 text-[11px] text-emerald-600">↩ {m.replies}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Thread */}
        <div className={cx("min-w-0", !selected && "max-[1023px]:hidden")}>
          {!active ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
              {selected ? <Spinner size="md" label="Opening message…" showLabel /> : "Select a message to read and reply."}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <button type="button" onClick={() => setSelected(null)} className="mb-3 text-sm text-cyan-700 hover:underline dark:text-cyan-300 min-[1024px]:hidden">
                ← All messages
              </button>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-semibold text-slate-900 dark:text-white">{active.message.subject}</h2>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                    {active.message.name} · <a className="text-cyan-700 hover:underline dark:text-cyan-300" href={`mailto:${active.message.email}`}>{active.message.email}</a>
                  </p>
                  <p className="text-xs text-slate-500">{fmt(active.message.created_at)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill status={active.message.status} />
                  {active.message.intent !== "other" && (
                    <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[11px] font-medium capitalize text-violet-700 dark:text-violet-300">{active.message.intent}</span>
                  )}
                  {active.message.urgency === "high" && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:text-red-300">High urgency</span>
                  )}
                </div>
              </div>

              {active.message.summary && (
                <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                  <span className="font-semibold">AI summary:</span> {active.message.summary}
                </p>
              )}

              <div className="mt-4 space-y-3">
                <div className="max-w-[92%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                  {active.message.body}
                </div>
                {active.replies.map((r) => (
                  <div key={r.id} className="ml-auto max-w-[92%]">
                    <div className="whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-cyan-600 p-4 text-sm text-white">{r.body}</div>
                    <p className="mt-1 text-right text-[11px] text-slate-500">Sent to {r.to_email} · {fmt(r.created_at)}</p>
                  </div>
                ))}
                <div ref={threadEnd} />
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="reply" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Reply to {active.message.name}
                  </label>
                  {active.message.draft && (
                    <Button size="sm" variant="ghost" onClick={() => setReply(active.message.draft)}>
                      ✦ Use AI draft
                    </Button>
                  )}
                </div>
                <textarea
                  id="reply"
                  rows={6}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={`Write your reply. It will be emailed to ${active.message.email}.`}
                  className={cx(inputCls, "resize-y")}
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {active.message.status === "archived" ? (
                      <Button size="sm" onClick={() => setStatus("read")}>Unarchive</Button>
                    ) : (
                      <Button size="sm" onClick={() => setStatus("archived")}>Archive</Button>
                    )}
                    {active.message.status !== "new" && (
                      <Button size="sm" onClick={() => setStatus("new")}>Mark unread</Button>
                    )}
                    <Button size="sm" variant="danger" onClick={remove}>Delete</Button>
                  </div>
                  <Button variant="primary" onClick={send} loading={sending} disabled={!reply.trim()}>
                    {sending ? "Sending…" : "Send reply"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
