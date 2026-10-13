import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../CodeBlock";
import { mediaUrl } from "@/app/lib/media";

// Raw HTML in the Markdown is NOT rendered (react-markdown's default), and unsafe link
// protocols such as javascript: are stripped by its default URL transform.
export default function MarkdownContent({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 className="mb-3 mt-8 font-poppins text-2xl font-bold text-primary_dark dark:text-cyan-300 md:text-3xl">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-8 font-poppins text-2xl font-bold text-primary_dark dark:text-cyan-300">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-6 font-poppins text-xl font-semibold text-gray-900 dark:text-white">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="mb-2 mt-4 font-semibold text-gray-900 dark:text-white">{children}</h4>
        ),
        p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
        a: ({ href, children }) => {
          const external = /^https?:\/\//i.test(href ?? "");
          return (
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-cyan-600 underline underline-offset-2 hover:text-cyan-500 dark:text-cyan-300"
            >
              {children}
            </a>
          );
        },
        ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-1.5">{children}</ul>,
        ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-1.5">{children}</ol>,
        blockquote: ({ children }) => (
          <blockquote className="my-5 border-l-4 border-cyan-500 bg-cyan-500/5 px-4 py-1 italic text-gray-700 dark:text-gray-300">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-black/10 dark:border-white/10" />,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary author-provided URLs
          <img
            src={typeof src === "string" ? mediaUrl(src) : undefined}
            alt={alt ?? ""}
            loading="lazy"
            className="my-5 h-auto max-w-full rounded-xl"
          />
        ),
        table: ({ children }) => (
          <div className="my-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-black/10 bg-black/5 px-3 py-2 text-left dark:border-white/10 dark:bg-white/5">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-black/10 px-3 py-2 dark:border-white/10">{children}</td>
        ),
        // Fenced blocks arrive as <pre><code class="language-x">; inline code has no <pre>.
        pre: ({ children }) => {
          const child = React.Children.toArray(children)[0] as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>;
          const lang = /language-([\w-]+)/.exec(child?.props?.className ?? "")?.[1];
          const code = String(child?.props?.children ?? "").replace(/\n$/, "");
          return <CodeBlock code={code} language={lang} wrap />;
        },
        code: ({ children }) => (
          <code className="rounded bg-black/10 px-1.5 py-0.5 font-fira_code text-[0.9em] dark:bg-white/10">
            {children}
          </code>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
