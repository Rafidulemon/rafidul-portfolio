"use client";

import { usePathname } from "next/navigation";
import Header from "../navigations/Header";
import Footer from "../navigations/Footer";
import ChatIcon from "../display/ChatIcon";
import TechBackground from "../display/TechBackground";
import SearchPalette from "../ai/SearchPalette";
import type { SocialLink } from "@/types/content";

/** Public-site frame. The admin area renders bare, with its own layout. */
export default function SiteChrome({
  children,
  socials,
  ownerName,
}: {
  children: React.ReactNode;
  socials: SocialLink[];
  ownerName: string;
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
        <div className="fixed top-0 left-0 right-0 z-10">
          <Header />
        </div>
        <div className="px-6 md:px-10 pt-20 md:pt-32 pb-6 min-h-screen">{children}</div>
        <ChatIcon />
        <SearchPalette />
        <Footer socials={socials} ownerName={ownerName} />
      </div>
    </div>
  );
}
