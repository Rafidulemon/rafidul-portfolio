"use client";

import Link from "next/link";
import projects from "../../data/projects.json";
import blogs from "../../data/blogs.json";

export type CardRef =
  | { type: "project"; id: string }
  | { type: "blog"; id: string }
  | { type: "contact" };

const MARKER = /\[\[(project|blog|contact)(?::([^\]\s]+))?\]\]/g;

/** Splits a streamed reply into visible text and the cards the model asked for. */
export function parseReply(raw: string): { text: string; cards: CardRef[] } {
  const cards: CardRef[] = [];
  const seen: Record<string, boolean> = {};
  const withoutComplete = raw.replace(MARKER, (_m, type: string, id?: string) => {
    const key = `${type}:${id ?? ""}`;
    if (!seen[key]) {
      seen[key] = true;
      if (type === "contact") cards.push({ type: "contact" });
      else if (id) cards.push({ type: type as "project" | "blog", id });
    }
    return "";
  });
  // Hide a marker that is still being streamed, e.g. "[[proj".
  const text = withoutComplete.replace(/\[\[[^\]]*$/, "").trim();
  return { text, cards };
}

const cardBase =
  "block rounded-lg border border-cyan-500/30 bg-white/70 p-3 text-sm shadow-sm transition hover:border-cyan-500 dark:bg-black/40";

export default function ChatCards({ cards }: { cards: CardRef[] }) {
  if (!cards.length) return null;
  return (
    <div className="mt-2 flex flex-col gap-2">
      {cards.slice(0, 4).map((card, index) => {
        if (card.type === "contact") {
          return (
            <Link
              key={index}
              href="/contact"
              className="rounded-lg bg-gradient-to-br from-cyan-500 to-teal-700 px-3 py-2 text-center text-sm font-medium text-white"
            >
              Contact me / book a call
            </Link>
          );
        }
        if (card.type === "project") {
          const project = projects.find((p) => String(p.id) === card.id);
          if (!project) return null;
          const href = project.live_link || project.github_link;
          return (
            <div key={index} className={cardBase}>
              <div className="font-semibold text-primary_dark dark:text-cyan-300">
                {project.project_title}
              </div>
              <div className="mt-1 text-gray-700 dark:text-gray-300">
                {project.project_details}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {(project.stack ?? []).slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-gray-200 px-1.5 py-0.5 text-[11px] dark:bg-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-cyan-600 underline dark:text-cyan-300"
                >
                  {project.live_link ? "Live demo" : "View on GitHub"}
                </a>
              )}
            </div>
          );
        }
        const blog = blogs.find((b) => String(b.id) === card.id);
        if (!blog) return null;
        return (
          <Link key={index} href={`/blogs/${blog.id}`} className={cardBase}>
            <div className="text-[11px] uppercase tracking-wide text-gray-500">
              Blog · {blog.date}
            </div>
            <div className="font-semibold text-primary_dark dark:text-cyan-300">
              {blog.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
