import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";
import { ThemeProvider } from "next-themes";
import ChatIcon from "./components/display/ChatIcon";
import Script from "next/script";
import TechBackground from "./components/display/TechBackground";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rafidul-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Md. Rafidul Islam – Software Engineer Portfolio",
  description:
    "The official portfolio of Md. Rafidul Islam, a Software Engineer specializing in Next.js, React, and modern web development.",
  keywords: [
    "Md. Rafidul Islam",
    "Md Rafidul Islam portfolio",
    "Software Engineer Bangladesh",
    "Next.js Developer",
    "React Developer",
  ],
  icons: {
    icon: "/images/icon.png",
  },
  authors: [{ name: "Md. Rafidul Islam" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Md. Rafidul Islam – Software Engineer Portfolio",
    description:
      "Explore the projects and skills of Md. Rafidul Islam, a Next.js and React developer from Bangladesh.",
    images: [
      {
        url: "/images/icon.png",
        width: 1200,
        height: 630,
        alt: "Md. Rafidul Islam Portfolio",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="5wiKa8lQKL-XM3zooTfAV2af_gLy8uoYkPWNczGPb9s"
        />
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md. Rafidul Islam",
              jobTitle: "Software Engineer",
              url: "https://rafidul-portfolio.vercel.app",
              sameAs: [
                "https://github.com/rafidulemon",
                "https://www.linkedin.com/in/md-rafidul-islam-8b013118b/",
              ],
            }),
          }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#eaf9ff] via-[#fefefe] to-[#d4f3ff] text-black dark:from-[#050505] dark:via-[#0b1222] dark:to-[#010308] dark:text-white">
        <ThemeProvider defaultTheme="dark" attribute="class">
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
              <div className="px-6 md:px-10 pt-20 md:pt-32 pb-6 min-h-screen">
                {children}
              </div>
              <ChatIcon />
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
