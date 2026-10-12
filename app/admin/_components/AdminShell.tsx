"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cx } from "./ui";

const NAV: { group: string; items: { href: string; label: string; icon: string }[] }[] = [
  { group: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: "▦" }] },
  {
    group: "Content",
    items: [
      { href: "/admin/blogs", label: "Blogs", icon: "✎" },
      { href: "/admin/projects", label: "Projects", icon: "❐" },
      { href: "/admin/skills", label: "Skills", icon: "★" },
      { href: "/admin/services", label: "Services", icon: "☰" },
    ],
  },
  {
    group: "Profile",
    items: [
      { href: "/admin/about", label: "About", icon: "☺" },
      { href: "/admin/contact", label: "Contact details", icon: "✉" },
      { href: "/admin/info", label: "My information (AI)", icon: "✦" },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  // The resolved theme is unknown on the server, so only show theme-dependent text after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const isActive = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  const nav = (
    <nav className="flex h-full flex-col" aria-label="Admin">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 font-bold text-white">
          R
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">Portfolio admin</div>
          <div className="text-xs text-slate-500">Content manager</div>
        </div>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {NAV.map((g) => (
          <div key={g.group}>
            <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{g.group}</div>
            <ul className="space-y-0.5">
              {g.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                      isActive(item.href)
                        ? "bg-cyan-600 font-medium text-white"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    )}
                  >
                    <span className="w-4 text-center" aria-hidden>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="space-y-1 border-t border-slate-200 p-3 dark:border-slate-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="w-4 text-center">↗</span> View site
        </a>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="w-4 text-center">◐</span> {mounted ? (resolvedTheme === "dark" ? "Light theme" : "Dark theme") : "Switch theme"}
        </button>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
        >
          <span className="w-4 text-center">⎋</span> Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 min-[1024px]:block">
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 min-[1024px]:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {nav}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 min-[1024px]:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
          >
            ☰ Menu
          </button>
          <span className="text-sm font-semibold">Portfolio admin</span>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
