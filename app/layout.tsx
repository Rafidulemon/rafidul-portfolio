import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Md. Rafidul Islam",
  description: "Portfolio website of Md. Rafidul Islam",
  icons: {
    icon: "/images/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-[#f6fefe] bg-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <div className="fixed top-0 left-0 right-0 z-10">
              <Header />
            </div>
            <div className="px-6 md:px-10 mt-20 md:mt-24 pb-6 min-h-screen">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
