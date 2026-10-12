import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import SiteChrome from "./components/layout/SiteChrome";
import { getContent } from "./lib/content/store";

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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContent("contact");
  return (
    <html lang="en" suppressHydrationWarning>
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
          <SiteChrome socials={contact.socials} ownerName={contact.full_name}>
            {children}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
