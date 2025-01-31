import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";
import { ThemeProvider } from "next-themes";
import ChatIcon from "./components/display/ChatIcon";

export const metadata: Metadata = {
  title: "Md. Rafidul Islam",
  description: "Portfolio website of Md. Rafidul Islam",
  icons: {
    icon: "/images/icon.png",
  },
  keywords: ["Md. Rafidul Islam", "Portfolio", "Md. Rafidul Islam Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
