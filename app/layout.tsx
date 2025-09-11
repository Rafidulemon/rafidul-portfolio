import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";
import { ThemeProvider } from "next-themes";
import ChatIcon from "./components/display/ChatIcon";
import Script from "next/script";

export const metadata: Metadata = {
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
  authors: [{ name: "Md. Rafidul Islam" }],
  openGraph: {
    type: "website",
    url: "https://rafidul-portfolio.vercel.app",
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
    canonical: "https://rafidul-portfolio.vercel.app",
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
      <body className="bg-[#f6fefe] dark:bg-black">
        <ThemeProvider defaultTheme="dark" attribute="class">
          <div>
            <div className="fixed top-0 left-0 right-0 z-10">
              <Header />
            </div>
            <div className="px-6 md:px-10 mt-20 md:mt-24 pb-6 min-h-screen">
              {children}
            </div>
            <ChatIcon />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
