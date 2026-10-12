"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, api, cx, inputCls, useToasts } from "./ui";

type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  status: "draft" | "published";
  tags: string[];
  published_at: string | null;
  updated_at: string;
};
type Legacy = { id: string; title: string; date: string; hidden: boolean };

export default function BlogsAdmin() {
  const { push, view: toasts } = useToasts();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [legacy, setLegacy] = useState<Legacy[]>([]);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | "published" | "draft">("all");

  const load = useCallback(async () => {
    const res = await api<{ posts: Post[]; legacy: Legacy[] }>("/api/admin/blogs");
    if (res.ok) {
      setPosts(res.data.posts);
      setLegacy(res.data.legacy);
    } else setError(res.data.error || "Could not load posts");
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (p: Post) => {
    if (!confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
    const res = await api(`/api/admin/blogs/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      push("success", "Post deleted.");
      load();
    } else push("error", res.data.error || "Could not delete");
  };

  const toggleLegacy = async (item: Legacy) => {
    const hidden = legacy.filter((l) => l.hidden).map((l) => l.id);
    const next = item.hidden ? hidden.filter((id) => id !== item.id) : [...hidden, item.id];
    const res = await api("/api/admin/content/blog_meta", { method: "PUT", body: JSON.stringify({ hidden: next }) });
    if (res.ok) {
      setLegacy(legacy.map((l) => (l.id === item.id ? { ...l, hidden: !l.hidden } : l)));
      push("success", item.hidden ? "Post is visible again." : "Post hidden from the public site.");
    } else push("error", res.data.error || "Could not update");
  };

  const filtered = (posts ?? []).filter(
    (p) => (tab === "all" || p.status === tab) && (!q || `${p.title} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blogs</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Write, publish and manage your articles.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
        >
          ✎ New post
        </Link>
      </div>

      {error && <Card className="mt-6 text-red-500">{error}</Card>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
          className={cx(inputCls, "max-w-xs")}
        />
        <div role="tablist" className="flex gap-1">
          {(["all", "published", "draft"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cx(
                "rounded-full px-3 py-1 text-xs font-medium capitalize",
                tab === t ? "bg-cyan-600 text-white" : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {t === "draft" ? "Drafts" : t}
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-4 p-0">
        {posts === null && !error && <p className="p-6 text-sm text-slate-500">Loading…</p>}
        {posts && filtered.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">
              {posts.length === 0 ? "You haven't written any posts here yet." : "No posts match."}
            </p>
            {posts.length === 0 && (
              <Link href="/admin/blogs/new" className="mt-3 inline-block text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300">
                Write your first post →
              </Link>
            )}
          </div>
        )}
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {filtered.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/blogs/${p.id}`} className="block truncate font-medium text-slate-900 hover:text-cyan-700 dark:text-white dark:hover:text-cyan-300">
                  {p.title}
                </Link>
                <p className="truncate text-xs text-slate-500">
                  /blogs/{p.slug} · updated {new Date(p.updated_at).toLocaleDateString()}
                  {p.tags.length > 0 && ` · ${p.tags.join(", ")}`}
                </p>
              </div>
              <span
                className={cx(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  p.status === "published"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                )}
              >
                {p.status === "published" ? "Published" : "Draft"}
              </span>
              <div className="flex gap-1.5">
                <Link href={`/admin/blogs/${p.id}`} className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                  Edit
                </Link>
                {p.status === "published" && (
                  <a href={`/blogs/${p.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    View ↗
                  </a>
                )}
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => remove(p)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <h2 className="mb-1 mt-10 text-lg font-semibold text-slate-900 dark:text-white">Original posts ({legacy.length})</h2>
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
        These articles were built into the site as code, so their text can&apos;t be edited here. You can hide or show them on the public site.
      </p>
      <Card className="p-0">
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {legacy.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className={cx("truncate text-sm", l.hidden ? "text-slate-400 line-through" : "text-slate-900 dark:text-slate-100")}>
                  {l.title}
                </p>
                <p className="text-xs text-slate-500">{l.date}</p>
              </div>
              {!l.hidden && (
                <a href={`/blogs/${l.id}`} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-700 hover:underline dark:text-cyan-300">
                  View ↗
                </a>
              )}
              <Button size="sm" onClick={() => toggleLegacy(l)}>
                {l.hidden ? "Show" : "Hide"}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
      {toasts}
    </div>
  );
}
