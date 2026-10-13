"use client";

import { usePathname } from "next/navigation";
import Header from "../navigations/Header";
import Footer from "../navigations/Footer";
import ChatIcon from "../display/ChatIcon";
import TechBackground from "../display/TechBackground";
import SearchPalette from "../ai/SearchPalette";
import PageViewTracker from "../analytics/PageViewTracker";
import type { ContactInfo } from "@/types/content";

/** Public-site frame. The admin area renders bare, with its own layout. */
export default function SiteChrome({
  children,
  contact,
}: {
  children: React.ReactNode;
  contact: ContactInfo;
}) {
  const path = usePathname();
  if (path.startsWith("/admin")) return <>{children}</>;

  return (
    <div className="relative min-h-screen">
      {/* Ambient background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <TechBackground />
        <div className="absolute -top-32 right-[-5%] h-72 w-72 rounded-full bg-cyan-400/30 blur-[140px] dark:bg-cyan-500/40" />
        <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-pink-200/40 blur-[120px] dark:bg-purple-700/30" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-amber-100/40 blur-[150px] dark:bg-emerald-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_45%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_50%)]" />
      </div>
      <div>
        <a
          href="#main-content"
          className="sr-only z-[70] rounded-lg bg-cyan-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <PageViewTracker />
        <Header contact={contact} />
        <main id="main-content" className="px-6 md:px-10 pt-24 md:pt-28 pb-6 min-h-screen">
          {children}
        </main>
        <ChatIcon />
        <SearchPalette />
        <Footer contact={contact} />
      </div>
    </div>
  );
}
