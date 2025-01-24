import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/navigations/Header";
import Footer from "./components/navigations/Footer";

export const metadata: Metadata = {
  title: "Md. Rafidul Islam",
  description: "Portfolio website of Md. Rafidul Islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Header />
          <div className="bg-black px-6 md:px-10 mt-16 md:mt-20 mb-6 min-h-screen">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
