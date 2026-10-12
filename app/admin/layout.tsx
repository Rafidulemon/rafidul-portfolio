import type { Metadata } from "next";

// The admin area must never appear in search results.
export const metadata: Metadata = {
  title: "Admin | Portfolio",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {children}
    </div>
  );
}
