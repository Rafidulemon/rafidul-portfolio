"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Spinner from "../display/Spinner";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  MdArrowOutward,
  MdArticle,
  MdAutoAwesome,
  MdBuild,
  MdClose,
  MdCode,
  MdDarkMode,
  MdDownload,
  MdFolder,
  MdHistory,
  MdHome,
  MdLightMode,
  MdMail,
  MdPerson,
  MdSearch,
  MdWorkOutline,
} from "react-icons/md";
import { openChat } from "../display/ChatIcon";

type Kind = "project" | "blog" | "skill" | "service";
type Filter = "all" | Kind;

type ApiResult = {
  uid: string;
  kind: Kind;
  title: string;
  snippet: string;
  meta?: string;
  href: string;
};

type Row = {
  key: string;
  group: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  plain?: boolean;
  external?: boolean;
  hint?: string;
  run: () => void;
};

export const openSearch = () => window.dispatchEvent(new Event("open-search"));

const RECENT_KEY = "searchRecent";
const SUGGESTIONS = ["AI projects", "Next.js", "tRPC and Prisma", "Blogs about AI agents"];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "blog", label: "Blogs" },
  { id: "skill", label: "Skills" },
];

const KIND_META: Record<Kind, { label: string; plural: string; icon: ReactNode }> = {
  project: { label: "Project", plural: "Projects", icon: <MdFolder /> },
  blog: { label: "Blog", plural: "Blog posts", icon: <MdArticle /> },
  skill: { label: "Skill", plural: "Skills", icon: <MdCode /> },
  service: { label: "Service", plural: "Services", icon: <MdBuild /> },
};

const PAGES = [
  { path: "/", title: "Home", icon: <MdHome />, words: "home start landing" },
  { path: "/about", title: "About", icon: <MdPerson />, words: "about me experience education resume bio" },
  { path: "/projects", title: "Projects", icon: <MdWorkOutline />, words: "projects work portfolio" },
  { path: "/blogs", title: "Blogs", icon: <MdArticle />, words: "blogs articles posts writing" },
  { path: "/match", title: "AI Job Match", icon: <MdAutoAwesome />, words: "ai job match recruiter hire fit" },
  { path: "/contact", title: "Contact", icon: <MdMail />, words: "contact email hire reach message" },
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .map(escapeRegExp);
  if (!tokens.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${tokens.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-sm bg-cyan-400/20 text-cyan-700 dark:text-cyan-200"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded-md border border-black/10 bg-black/5 px-1.5 py-0.5 font-sans text-[10px] font-medium text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
    {children}
  </kbd>
);

export default function SearchPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [results, setResults] = useState<ApiResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const q = query.trim();
  const searching = q.length >= 2;

  // ---- open / close ----
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      try {
        const saved = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
        if (Array.isArray(saved)) setRecent(saved.slice(0, 5));
      } catch {
        setRecent([]);
      }
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    setQuery("");
    setFilter("all");
    setResults([]);
    setFailed(false);
    setActive(0);
    returnFocusRef.current?.focus?.();
  }, [open]);

  // ---- search ----
  useEffect(() => {
    if (!open) return;
    if (!searching) {
      setResults([]);
      setLoading(false);
      setFailed(false);
      return;
    }
    setLoading(true);
    setFailed(false);
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const kind = filter === "all" ? "" : `&kind=${filter}`;
        const res = await fetch(`/api/ai/search?q=${encodeURIComponent(q)}${kind}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        setResults(data.results ?? []);
        setActive(0);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setResults([]);
        setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [q, filter, open, searching]);

  // ---- actions ----
  const remember = useCallback(() => {
    if (!searching) return;
    try {
      const next = [q, ...recent.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // storage blocked
    }
  }, [q, recent, searching]);

  const goTo = useCallback(
    (href: string, external?: boolean) => {
      remember();
      close();
      if (external) window.open(href, "_blank", "noopener,noreferrer");
      else router.push(href);
    },
    [close, remember, router]
  );

  const askAi = useCallback(
    (text?: string) => {
      remember();
      close();
      openChat((text ?? q) || undefined);
    },
    [close, q, remember]
  );

  const clearRecent = () => {
    setRecent([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
      // ignore
    }
  };

  // ---- rows ----
  const rows: Row[] = useMemo(() => {
    const out: Row[] = [];
    const pageRow = (p: (typeof PAGES)[number]): Row => ({
      key: `page:${p.path}`,
      group: "Pages",
      icon: p.icon,
      title: p.title,
      hint: "Go to",
      run: () => goTo(p.path),
    });

    if (!searching) {
      recent.forEach((r) =>
        out.push({
          key: `recent:${r}`,
          group: "Recent",
          icon: <MdHistory />,
          title: r,
          run: () => setQuery(r),
        })
      );
      SUGGESTIONS.forEach((s) =>
        out.push({
          key: `sugg:${s}`,
          group: "Try searching",
          icon: <MdSearch />,
          title: s,
          run: () => setQuery(s),
        })
      );
      PAGES.forEach((p) => out.push(pageRow(p)));
      out.push(
        {
          key: "act:ai",
          group: "Actions",
          icon: <MdAutoAwesome />,
          title: "Ask my AI assistant",
          subtitle: "Chat about projects, skills and availability",
          run: () => askAi(""),
        },
        {
          key: "act:cv",
          group: "Actions",
          icon: <MdDownload />,
          title: "Download CV",
          run: () => goTo("/md_rafidul_islam_resume.pdf", true),
        },
        {
          key: "act:theme",
          group: "Actions",
          icon: resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />,
          title: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
          run: () => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
            close();
          },
        }
      );
      return out;
    }

    const lower = q.toLowerCase();
    if (filter === "all") {
      PAGES.filter((p) => `${p.title} ${p.words}`.toLowerCase().includes(lower)).forEach((p) =>
        out.push(pageRow(p))
      );
    }

    (["project", "blog", "skill", "service"] as Kind[]).forEach((kind) => {
      results
        .filter((r) => r.kind === kind)
        .forEach((r) => {
          const external = /^https?:/i.test(r.href);
          out.push({
            key: r.uid,
            group: KIND_META[kind].plural,
            icon: KIND_META[kind].icon,
            title: r.title,
            subtitle: r.snippet,
            meta: r.meta,
            external,
            hint: external ? "Open" : "Go to",
            run: () => goTo(r.href, external),
          });
        });
    });

    out.push({
      key: "ask-ai",
      group: "Ask AI",
      icon: <MdAutoAwesome />,
      title: `Ask the AI: “${q}”`,
      subtitle: "Get a conversational answer grounded in my portfolio",
      plain: true,
      hint: "Ask",
      run: () => askAi(),
    });
    return out;
  }, [searching, recent, q, filter, results, goTo, askAi, close, resolvedTheme, setTheme]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(rows.length - 1, 0)));
  }, [rows.length]);

  useEffect(() => {
    document.getElementById(`sp-row-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (query) setQuery("");
      else close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (rows.length ? (a + 1) % rows.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (rows.length ? (a - 1 + rows.length) % rows.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && searching) askAi();
      else rows[active]?.run();
    } else if (e.key === "Tab" && searching) {
      e.preventDefault();
      const i = FILTERS.findIndex((f) => f.id === filter);
      const next = (i + (e.shiftKey ? -1 : 1) + FILTERS.length) % FILTERS.length;
      setFilter(FILTERS[next].id);
    }
  };

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -14, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 420, damping: 34 },
      };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/55 px-3 pt-[8vh] backdrop-blur-md md:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={close}
          onKeyDown={onKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio"
        >
          <motion.div
            {...motionProps}
            onMouseDown={(e) => e.stopPropagation()}
            className="flex max-h-[78vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1222]/95"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-black/10 px-4 dark:border-white/10">
              <MdSearch className="shrink-0 text-xl text-gray-500" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={200}
                role="combobox"
                aria-expanded="true"
                aria-controls="sp-list"
                aria-activedescendant={rows.length ? `sp-row-${active}` : undefined}
                aria-label="Search"
                autoComplete="off"
                spellCheck={false}
                placeholder="Search projects, blogs, skills… or ask anything"
                className="h-14 w-full bg-transparent text-base text-black outline-none placeholder:text-gray-500 dark:text-white"
              />
              {loading ? (
                <Spinner size="xs" label="Searching" className="shrink-0" />
              ) : query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="shrink-0 rounded-md p-1 text-gray-500 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <MdClose />
                </button>
              ) : (
                <Kbd>Esc</Kbd>
              )}
            </div>

            {/* Filters */}
            {searching && (
              <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2 dark:border-white/10">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFilter(f.id);
                      inputRef.current?.focus();
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filter === f.id
                        ? "bg-cyan-600 text-white"
                        : "text-gray-600 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <span className="ml-auto hidden text-[11px] text-gray-500 md:inline">
                  <Kbd>Tab</Kbd> switch filter
                </span>
              </div>
            )}

            {/* Results */}
            <div
              ref={listRef}
              id="sp-list"
              role="listbox"
              className="min-h-[120px] flex-1 overflow-y-auto p-2"
            >
              {searching && loading && results.length === 0 && (
                <div className="space-y-2 p-2" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex animate-pulse gap-3">
                      <div className="h-9 w-9 rounded-lg bg-black/10 dark:bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 rounded bg-black/10 dark:bg-white/10" />
                        <div className="h-3 w-3/4 rounded bg-black/5 dark:bg-white/5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {rows.map((row, i) => {
                const showHeader = row.group !== lastGroup;
                lastGroup = row.group;
                const selected = i === active;
                return (
                  <div key={row.key}>
                    {showHeader && (
                      <div className="flex items-center justify-between px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                        <span>{row.group}</span>
                        {row.group === "Recent" && (
                          <button
                            type="button"
                            onClick={clearRecent}
                            className="font-medium normal-case tracking-normal text-gray-500 hover:text-red-500"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    )}
                    <div
                      id={`sp-row-${i}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => selected || setActive(i)}
                      onClick={row.run}
                      className={`group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                        selected ? "bg-cyan-500/15" : ""
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ${
                          selected
                            ? "bg-cyan-600 text-white"
                            : "bg-black/5 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                        }`}
                      >
                        {row.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-black dark:text-white">
                            <Highlight text={row.title} query={searching && !row.plain ? q : ""} />
                          </span>
                        </span>
                        {row.subtitle && (
                          <span className="mt-0.5 block truncate text-xs text-gray-600 dark:text-gray-400">
                            <Highlight text={row.subtitle} query={searching && !row.plain ? q : ""} />
                          </span>
                        )}
                        {row.meta && (
                          <span className="mt-0.5 block truncate text-[11px] text-gray-500">
                            {row.meta}
                          </span>
                        )}
                      </span>
                      {selected && row.hint && (
                        <span className="hidden shrink-0 items-center gap-1 text-[11px] text-gray-500 md:flex">
                          {row.hint}
                          {row.external ? <MdArrowOutward /> : <Kbd>↵</Kbd>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {searching && !loading && results.length === 0 && (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {failed
                      ? "Search is unavailable right now."
                      : `No matches for “${q}”.`}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Try different words, or ask the AI below.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2 text-[11px] text-gray-500 dark:border-white/10">
              <span className="flex items-center gap-1">
                <MdAutoAwesome className="text-cyan-500" /> AI-powered semantic search
              </span>
              <span className="hidden items-center gap-3 md:flex">
                <span className="flex items-center gap-1">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>↵</Kbd> open
                </span>
                {searching && (
                  <span className="flex items-center gap-1">
                    <Kbd>Ctrl ↵</Kbd> ask AI
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
