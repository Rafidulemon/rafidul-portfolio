import Link from "next/link";
import { dbEnabled } from "@/app/lib/db";
import { contentStatus } from "@/app/lib/content/store";
import { listPosts } from "@/app/lib/blog/store";
import { hasLlm } from "@/app/lib/ai/llm";
import { SECTIONS, SECTION_ORDER } from "../_components/specs";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let status: Record<string, string> = {};
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let dbError = "";
  try {
    [status, posts] = await Promise.all([contentStatus(), listPosts()]);
  } catch (error) {
    console.error("[admin] dashboard:", error);
    dbError = "Could not reach the database. Check DATABASE_URL.";
  }

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Edit what appears on your portfolio. Changes go live as soon as you save.
      </p>

      {(!dbEnabled || dbError) && (
        <div className="mt-5 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
          {dbError || "DATABASE_URL is not set, so edits cannot be saved."}
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/blogs"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-500 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="text-sm text-slate-500">Blog posts</div>
          <div className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{published}</div>
          <div className="text-xs text-slate-500">published · {drafts} draft{drafts === 1 ? "" : "s"}</div>
        </Link>
        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center rounded-xl border-2 border-dashed border-cyan-500/50 bg-cyan-500/5 p-5 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-300"
        >
          ✎ Write a new post
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="text-sm text-slate-500">System</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <span className={dbEnabled && !dbError ? "text-emerald-600" : "text-red-500"}>●</span> Database{" "}
              {dbEnabled && !dbError ? "connected" : "unavailable"}
            </li>
            <li>
              <span className={hasLlm() ? "text-emerald-600" : "text-amber-500"}>●</span> AI assistant{" "}
              {hasLlm() ? "configured" : "not configured"}
            </li>
          </ul>
        </div>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-slate-900 dark:text-white">Site content</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {SECTION_ORDER.map((key) => {
          const spec = SECTIONS[key];
          const updated = status[key];
          return (
            <Link
              key={key}
              href={`/admin/${key}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-500 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">{spec.title}</h3>
                <span
                  className={
                    updated
                      ? "rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-700 dark:text-emerald-300"
                      : "rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300"
                  }
                >
                  {updated ? "Customised" : "Original"}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{spec.description}</p>
              {updated && (
                <p className="mt-2 text-xs text-slate-500">Last saved {new Date(updated).toLocaleString()}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
