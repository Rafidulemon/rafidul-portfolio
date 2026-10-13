"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SmartImage from "@/app/components/display/SmartImage";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  MdArrowOutward,
  MdArticle,
  MdAutoAwesome,
  MdDarkMode,
  MdDesignServices,
  MdHome,
  MdLightMode,
  MdPerson,
  MdSearch,
  MdWorkOutline,
} from "react-icons/md";
import SocialIcons from "../display/SocialIcons";
import { openSearch } from "../ai/SearchPalette";
import { givenName, shortRole } from "@/app/lib/name";
import type { ContactInfo } from "@/types/content";

const NAV = [
  { href: "/", label: "Home", icon: <MdHome /> },
  { href: "/about", label: "About", icon: <MdPerson /> },
  { href: "/projects", label: "Projects", icon: <MdWorkOutline /> },
  { href: "/services", label: "Services", icon: <MdDesignServices /> },
  { href: "/blogs", label: "Blogs", icon: <MdArticle /> },
  { href: "/match", label: "AI Match", icon: <MdAutoAwesome />, ai: true },
];

const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Toggle theme"}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/10 text-xl text-gray-700 transition hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-gray-200 dark:hover:text-cyan-300 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 14, opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -14, opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="absolute"
          >
            {dark ? <MdDarkMode className="text-[#F6F1D5]" /> : <MdLightMode className="text-amber-500" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function Logo({ contact, onClick }: { contact: ContactInfo; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${contact.full_name}, home`} className="group flex items-center gap-3">
      <span className="relative h-10 w-10 shrink-0 md:h-11 md:w-11">
        <span
          aria-hidden
          className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 opacity-80 blur-[1px] transition-all duration-500 group-hover:-inset-1 group-hover:opacity-100"
        />
        <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-white bg-slate-900 dark:border-slate-900">
          <SmartImage src="portfolio/images/hero-image.png" alt="" width={88} height={88} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </span>
      </span>
      <span className="hidden leading-tight sm:block">
        <span className="block font-poppins text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
          Rafid
          <span className="text-cyan-500">.</span>
        </span>
        <span className="block text-[11px] text-gray-500 dark:text-gray-400">{shortRole(contact.title)}</span>
      </span>
    </Link>
  );
}

function Burger({ open }: { open: boolean }) {
  const line = "absolute left-0 h-0.5 w-5 rounded bg-current";
  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <motion.span className={line} style={{ top: 3 }} animate={open ? { rotate: 45, top: 9 } : { rotate: 0, top: 3 }} />
      <motion.span className={line} style={{ top: 9 }} animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }} />
      <motion.span className={line} style={{ top: 15 }} animate={open ? { rotate: -45, top: 9 } : { rotate: 0, top: 15 }} />
    </span>
  );
}

export default function Header({ contact }: { contact: ContactInfo }) {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Close the drawer on navigation, lock page scroll while it is open, close on Escape.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[45]">
      <motion.div
        animate={{ paddingTop: scrolled ? 8 : 16, paddingBottom: scrolled ? 8 : 12 }}
        transition={{ duration: 0.25 }}
        className="px-3 md:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-300 md:px-5 ${
            scrolled
              ? "border border-black/10 bg-white/75 py-1.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1222]/75 dark:shadow-black/30"
              : "border border-transparent bg-transparent py-3"
          }`}
        >
          <Logo contact={contact} />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden min-[1024px]:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(path, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "text-cyan-700 dark:text-cyan-200"
                          : "text-gray-700 hover:bg-black/5 hover:text-cyan-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-cyan-200"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-cyan-500/15 ring-1 ring-cyan-500/30"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        {item.ai && <MdAutoAwesome className="text-cyan-500" />}
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl K)"
              className="flex h-10 items-center gap-2 rounded-full border border-black/10 px-3 text-sm text-gray-700 transition hover:border-cyan-500/60 hover:text-cyan-700 dark:border-white/15 dark:text-gray-200 dark:hover:text-cyan-300"
            >
              <MdSearch className="text-xl" />
              <kbd className="hidden rounded border border-black/10 bg-black/5 px-1.5 text-[10px] text-gray-600 dark:border-white/20 dark:bg-white/10 dark:text-gray-300 min-[1200px]:inline">
                Ctrl K
              </kbd>
            </button>
            <ThemeToggle />
            <Link
              href="/contact"
              className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-xl hover:shadow-cyan-500/30 min-[1024px]:flex"
            >
              Let&apos;s talk
              <MdArrowOutward className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-gray-800 transition hover:border-cyan-500/60 dark:border-white/15 dark:text-gray-100 min-[1024px]:hidden"
            >
              <Burger open={open} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[46] bg-black/50 backdrop-blur-sm min-[1024px]:hidden"
            />
            <motion.aside
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="fixed right-0 top-0 z-[47] flex h-full w-[min(88vw,360px)] flex-col overflow-y-auto border-l border-black/10 bg-white/95 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1222]/95 min-[1024px]:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo contact={contact} onClick={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-gray-800 dark:border-white/15 dark:text-gray-100"
                >
                  <Burger open />
                </button>
              </div>

              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
                className="mt-8 space-y-1"
              >
                {NAV.map((item) => {
                  const active = isActive(path, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition ${
                          active
                            ? "bg-cyan-500/15 text-cyan-700 ring-1 ring-cyan-500/30 dark:text-cyan-200"
                            : "text-gray-800 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className={`text-xl ${active ? "text-cyan-500" : "text-gray-500 dark:text-gray-400"}`}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 py-3 font-medium text-white shadow-lg shadow-cyan-500/25"
                >
                  Let&apos;s talk <MdArrowOutward />
                </Link>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openSearch();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 py-2.5 text-sm text-gray-800 dark:border-white/15 dark:text-gray-200"
                  >
                    <MdSearch className="text-lg" /> Search
                  </button>
                  <ThemeToggle className="!h-auto !w-12 !rounded-xl" />
                </div>
              </div>

              <div className="mt-auto pt-8">
                <SocialIcons socials={contact.socials} size={22} className="gap-x-5" />
                <p className="mt-4 text-center text-xs text-gray-500">{contact.email}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
