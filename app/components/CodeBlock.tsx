"use client";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

type CodeBlockProps = {
  code: string;
  language?: string;        // e.g., "ts", "tsx", "js", "bash", "json"
  fileName?: string;        // optional label shown above the block
  className?: string;       // for extra Tailwind classes
  wrap?: boolean;           // set to true to soft-wrap long lines
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "",
  fileName,
  className = "",
  wrap = false,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`relative bg-gray-900 my-1 md:my-2 text-gray-100 rounded-lg border border-gray-800 ${className}`}>
      {fileName && (
        <div className="flex items-center justify-between px-3 py-2 text-xs border-b border-gray-800 bg-gray-950/40 rounded-t-lg">
          <span className="font-mono text-gray-300 truncate">{fileName}</span>
          <span className="text-[10px] uppercase tracking-wide text-gray-500">Code</span>
        </div>
      )}

      <pre
        className={`m-0 p-4 overflow-x-auto ${
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        }`}
      >
        <code className={`language-${language} font-mono text-[12px] md:text-[14px]`}>{code}</code>
      </pre>

      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800/60 px-2.5 py-1.5 text-xs text-gray-200 hover:bg-gray-700 active:scale-[0.98]"
      >
        <MdContentCopy size={16} />
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeBlock;
