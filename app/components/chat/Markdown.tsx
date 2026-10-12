import React from "react";

// Minimal, dependency-free markdown for chat bubbles. Builds React elements
// only (never injects HTML), and only allows safe link protocols.

const SAFE_HREF = /^(https?:\/\/|mailto:|\/)/i;

const renderInline = (text: string, keyPrefix: string): React.ReactNode[] =>
  text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g)
    .filter(Boolean)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code
            key={key}
            className="rounded bg-black/10 px-1 py-0.5 font-fira_code text-[0.85em] dark:bg-white/10"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link && SAFE_HREF.test(link[2])) {
        const external = /^https?:/i.test(link[2]);
        return (
          <a
            key={key}
            href={link[2]}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-cyan-600 underline underline-offset-2 dark:text-cyan-300"
          >
            {link[1]}
          </a>
        );
      }
      return <React.Fragment key={key}>{part}</React.Fragment>;
    });

export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={`b${blocks.length}`}
          className="my-2 overflow-x-auto rounded-md bg-black/80 p-3 font-fira_code text-xs text-gray-100"
        >
          {code.join("\n")}
        </pre>
      );
      continue;
    }

    const listMatch = line.match(/^\s*([-*•]|\d+\.)\s+/);
    if (listMatch) {
      const ordered = /\d/.test(listMatch[1]);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*•]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*•]|\d+\.)\s+/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={`b${blocks.length}`}
          className={`my-1 ml-5 space-y-1 ${ordered ? "list-decimal" : "list-disc"}`}
        >
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `l${blocks.length}-${idx}`)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !/^\s*([-*•]|\d+\.)\s+/.test(lines[i])
    ) {
      para.push(lines[i].replace(/^#{1,6}\s+/, ""));
      i++;
    }
    blocks.push(
      <p key={`b${blocks.length}`} className="my-1 first:mt-0 last:mb-0">
        {para.map((p, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <br />}
            {renderInline(p, `p${blocks.length}-${idx}`)}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return <>{blocks}</>;
}
