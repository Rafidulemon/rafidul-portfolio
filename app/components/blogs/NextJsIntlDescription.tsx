"use client";

import { useState } from "react";
import { Text } from "../typography/Text";
import { MdContentCopy } from "react-icons/md";
import Button from "../display/Button";
import Link from "next/link";

const NextJsIntlDescription = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `
import { NextIntlProvider } from 'next-intl';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}

export default MyApp;
`;

  const structuredCodeExample = `
├── messages
│   ├── en.json
│   └── bn.json
├── next.config.mjs
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── navigation.ts
    └── app
        │── [locale]
        │   ├── page.tsx
        │   └── about
        │       └── page.tsx
        └── layout.tsx
`;

  const en_json = `
//messages/en.json
{
  "HomePage": {
    "title": "Hello world!",
    "about": "Go to the about page"
  }
}
`;

  const bn_json = `
//messages/bn.json
{
  "HomePage": {
    "title": "হ্যালো বিশ্ব!",
    "about": "অবাউট পেজে যান"
  }
}
`;

  const next_config = `
//next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [],
        deviceSizes: [640, 768, 1024, 1280, 1920],
        formats: ["image/webp"],
        minimumCacheTTL: 60,
        unoptimized: true
      },
};

export default withNextIntl(nextConfig);
`;

  const i18n = `
// src/i18n.ts
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "bn"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale || "en";

  if (!locales.includes(locale)) {
    throw new Error(\`Unsupported locale: \${locale}\`);
  }

  return {
    locale,
    messages: (await import(\`../messages/\${locale}.json\`)).default,
  };
});
`;

  const middleware = `
// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "bn"],

  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|bn)/:path*"],
};

`;

  const navigation = `
// src/navigation.ts
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "bn"] as const;
export const localePrefix = "always";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

`;

  const layout = `
// src/app/layout.ts
import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  icons: {
    icon: "/logo/icon.png",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={\`antialiased\`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

`;

  const test_header = `
/"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguageHandler = (locale: "en" | "bn" | undefined) => {
    router.replace(pathname, { locale });
  };

  return (
    <header className="fixed top-10 z-50 bg-white w-full flex flex-col gap-0">
      <div className="flex items-center justify-center md:ml-10">
        <button
          onClick={() => changeLanguageHandler("en")}
          className={\`px-2 py-1 text-[12px] font-medium rounded-l-sm transition-all duration-200 focus:outline-none \${
            locale === "en"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-primary"
          }\`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguageHandler("bn")}
          className={\`px-2 py-1 text-[12px] font-medium rounded-r-sm transition-all duration-200 focus:outline-none \${
            locale === "bn"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-primary"
          }\`}
        >
          বাংলা
        </button>
      </div>
    </header>
  );
}


`;

  const test_home = `
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col items-center">
      <h1>{t("HomePage.title")}</h1>
      <Link href="/about">
        <a>{t("HomePage.about")}</a>
      </Link>
    </div>
  );
}
`;

  return (
    <div className="flex flex-col gap-4 dark:text-gray-300 text-gray-800">
      <Text
        text="Next.js App Router provides a robust way to manage translations with the `next-intl` package. This guide will help you set up internationalization in your Next.js app."
        isPoppins
        className="mb-4"
      />
      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Install next-intl"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Run the following command to install next-intl:"
          isPoppins
          className="mb-2"
        />
        <div className="flex flex-col gap-2">
          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px]">
              npm install next-intl
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy("npm install next-intl")}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
          <Text text="if you use yarn" />
          <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px]">
              yarn add next-intl
            </pre>
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              onClick={() => handleCopy("yarn add next-intl")}
              aria-label="Copy command"
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text text="File Structure" isBold isPoppins className="text-lg mb-2" />
        <Text
          text="You need to follow the following file structure:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {structuredCodeExample}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(structuredCodeExample)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
        <Text text="In case you’re migrating an existing app to next-intl, you’ll typically move your existing pages into the [locale] folder as part of the setup." />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Let’s get started!"
          isBold
          isPoppins
          className="text-xl mb-4"
        />

        <Text text="JSON Files" isBold isPoppins className="text-lg mb-2" />
        <Text
          text="Messages represent the translations that are available per language and can be provided either locally or loaded from a remote data source."
          isPoppins
          className="mb-2"
        />

        <Text
          text="The simplest option is to add JSON files in your local project folder:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {en_json}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(en_json)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-4">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {bn_json}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(bn_json)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Set up next.config.mjs"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now, set up the plugin which creates an alias to provide a request-specific i18n configuration to Server Components—more on this in the following steps."
          isPoppins
          className="mb-2"
        />
        <Text
          text="Create the next.config.mjs file in the root directory of your project:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {next_config}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(next_config)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Set up i18n.ts file"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now let's create i18n.ts file where you'll configure locale-specific settings and enable smooth integration with the next-intl plugin"
          isPoppins
          className="mb-2"
        />
        <Text
          text="Create the i18n.ts file inside the src folder:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="md:whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8 max-w-[90%] overflow-x-auto">{i18n}</pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(i18n)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Set up middleware file"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now let's create middleware.ts file which will enable automatic locale detection and redirection based on the user's request and also it will ensure that the correct translations are served while excluding irrelevant paths (e.g., API routes or static files)."
          isPoppins
          className="mb-2"
        />
        <Text
          text="Create the middleware.ts file inside the src folder:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {middleware}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(middleware)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
        <Text text="Note" isBold className="text-xl" />
        <Text
          text="If you are using images, you need to add the pathname to the middleware."
          isPoppins
          className="mb-2"
        />
        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2 ">
          <pre className="font-fira_code text-[12px] md:text-[14px] max-w-[90%] overflow-x-auto">
            [&quot;/&quot;,&quot;/((?!api|_next|favicon.ico|public|gif|images|logo|slider).*)&quot;,
                &quot;/(en|bn)/:path*&quot;]
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() =>
              handleCopy(
                `matcher: ["/","/((?!api|_next|favicon.ico|public|gif|images|logo|slider).*)", "/(en|bn)/:path*"]`
              )
            }
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Set up navigation file"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now let's create navigation.ts file that configures shared pathnames for navigation with next-intl, enabling seamless locale-aware routing in a Next.js app by providing utilities for linking, redirection, and accessing pathnames with locale prefixes."
          isPoppins
          className="mb-2"
        />
        <Text
          text="Create the navigation.ts file inside the src folder:"
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {navigation}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(navigation)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Text
          text="Update the root layout"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now let's wrap up the {children} or <body> with the <NextIntlClientProvider> component to enable locale-aware routing and localization in your Next.js app."
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
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
          text="Test the language switch"
          isBold
          isPoppins
          className="text-lg mb-2"
        />
        <Text
          text="Now let's test the application."
          isPoppins
          className="mb-2"
        />
        <Text
          text="Add language switch button in the header."
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {test_header}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(test_header)}
            aria-label="Copy command"
          >
            <MdContentCopy size={20} />
          </button>
        </div>

        <Text
          text="Now check the Hellow world in different languages."
          isPoppins
          className="mb-2"
        />

        <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md mb-2">
          <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-8">
            {test_home}
          </pre>
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => handleCopy(test_home)}
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
        <Text
          text="For any further queries, feel free to "
        />
        <Link href={"/contact"}>
          <Text className="hidden md:flex hover:underline hover:text-primary_dark" isBold text="CONTACT ME"/>
          <Text className="md:hidden text-primary_dark underline" isBold text="CONTACT ME"/>
        </Link>
      </div>
    </div>
  );
};

export default NextJsIntlDescription;
