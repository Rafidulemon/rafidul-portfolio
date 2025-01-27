"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Text } from "../typography/Text";

const NextAppRouterThemeChangeDescription = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tailwindCode = `
// tailwind.config.ts 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ...
}
`;

  const layout = `
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f6fefe] dark:bg-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

`;

  const testCode = `
// app/components/Header.tsx
"use client";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
const { resolvedTheme, theme, setTheme } = useTheme();

return (
    <div className="flex justify-between items-center py-4">
        <li
        className="cursor-pointer py-4 md:py-0 md:text-[30px] text-center border-b-2 md:border-b-0 text-yellow-500"
        onClick={() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
        >
            {resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </li>
    </div>
);
}
export default Header;
`;

  return (
    <div>
      <p>
        Implementing theme switching in a Next.js app is a common feature that
        enhances the user experience by allowing users to toggle between light
        and dark themes. In this guide, we will walk through how to implement a
        dynamic theme switcher using Next.js App Router while ensuring the theme
        persists even after the user refreshes the page or revisits the app.
      </p>
      <h3 className="text-xl font-semibold mt-6">Understanding the Basics</h3>
      <p className="mt-2">
        Next.js is a powerful React framework that allows developers to build
        scalable and optimized web applications. One of the cool features you
        can implement is theme switching. Theme switching is a design choice
        that lets users switch between a light and dark mode, which has become a
        standard in modern web development.
      </p>
      <h3 className="text-xl font-semibold mt-6">
        Why Theme Persistence Matters
      </h3>
      <p className="mt-2">
        When building an app with theme switching, it&apos;s important to
        maintain the theme state between sessions. This ensures a smooth user
        experience, as users won&apos;t need to select their preferred theme
        every time they visit the site. Using cookies or local storage, we can
        store the user&apos;s theme preference, making it persist even after the
        app is reloaded.
      </p>
      <h3 className="text-xl font-semibold mt-6">
        Steps to Implement Theme Switching in Next.js
      </h3>
      <ol className="mt-2 list-decimal pl-6">
        <li className="mt-2">
          Set up a Next.js project and install necessary packages.
        </li>
        <li className="mt-2">Update tailwind.config.ts</li>
        <li className="mt-2">Install next-themes.</li>
        <li className="mt-2">Wrap up the app with ThemeProvider</li>
        <li className="mt-2">
          Test the functionality to ensure that the theme persists across page
          reloads.
        </li>
      </ol>
      <h3 className="text-xl font-semibold mt-6">
        Code Example: Switching Theme in Next.js
      </h3>
      <p className="mt-2">
        Here&apos;s a simple implementation of a theme switcher in Next.js using
        React Context and localStorage.
      </p>

      <div className="flex flex-col mt-6 gap-4 dark:text-gray-300 text-gray-800">
        <div className="flex flex-col gap-2 mb-4">
          <Text
            text="Update tailwind.config.ts"
            isBold
            isPoppins
            className="text-lg mb-2"
          />
          <Text
            text="Add the following line in your tailwind.config.ts file"
            isPoppins
            className="mb-2"
          />

          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
              {tailwindCode}
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy(tailwindCode)}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Text
            text="Install next-themes"
            isBold
            isPoppins
            className="text-lg mb-2"
          />
          <Text
            text="Run the following command to install next-themes:"
            isPoppins
            className="mb-2"
          />
          <div className="flex flex-col gap-2">
            <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px]">
                npm i next-themes
              </pre>
              <button
                className="absolute top-2 right-2 text-gray-300 hover:text-white"
                onClick={() => handleCopy("npm i next-themes")}
                aria-label="Copy command"
              >
                <MdContentCopy size={20} />
              </button>
            </div>
            <Text text="if you use yarn" />
            <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px]">
                yarn add next-themes
              </pre>
              <button
                className="absolute top-2 right-2 text-gray-300 hover:text-white"
                onClick={() => handleCopy("yarn add next-themes")}
                aria-label="Copy command"
              >
                <MdContentCopy size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Text
            text="Update tailwind.config.ts"
            isBold
            isPoppins
            className="text-lg mb-2"
          />
          <Text
            text="Add the following line in your tailwind.config.ts file"
            isPoppins
            className="mb-2"
          />

          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
              {tailwindCode}
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy(tailwindCode)}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Text
            text="Wrap up the app with ThemeProvider"
            isBold
            isPoppins
            className="text-lg mb-2"
          />
          <Text
            text="Wrap up your layout with ThemeProvider from next-themes"
            isPoppins
            className="mb-2"
          />
          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] max-w-[90%] overflow-x-auto md:-mt-8">
              {layout}
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy(layout)}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Text
            text="Test"
            isBold
            isPoppins
            className="text-lg mb-2"
          />
          <Text
            text="Create theme switcher and test"
            isPoppins
            className="mb-2"
          />
          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] max-w-[90%] overflow-x-auto md:-mt-8">
              {testCode}
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy(testCode)}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>

        <Text
          className="text-lg mb-2"
          text="That's it! Your translation should work properly now."
          isBold
          isPoppins
        />
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Text text="For any further queries, feel free to " />
          <Link href={"/contact"}>
            <Text
              className="hidden md:flex hover:underline hover:text-primary_dark"
              isBold
              text="CONTACT ME"
            />
            <Text
              className="md:hidden text-primary_dark underline"
              isBold
              text="CONTACT ME"
            />
          </Link>
        </div>
        {/* <div>
          <Text text="YouTube Video" isBold className="text-lg" />
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/zKguO4oaAGs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}
        
      </div>
    </div>
  );
};

export default NextAppRouterThemeChangeDescription;
