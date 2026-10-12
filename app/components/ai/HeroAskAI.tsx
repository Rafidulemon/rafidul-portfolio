"use client";

import { useState } from "react";
import { openChat } from "../display/ChatIcon";

const SUGGESTIONS = [
  "What AI projects have you built?",
  "What's your tech stack?",
  "Are you available for hire?",
];

export default function HeroAskAI() {
  const [value, setValue] = useState("");

  const submit = (text: string) => {
    const prompt = text.trim();
    if (!prompt) return;
    openChat(prompt);
    setValue("");
  };

  return (
    <div className="mt-6 w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-white/70 px-3 py-2 shadow-md shadow-cyan-500/10 backdrop-blur dark:bg-black/40"
      >
        <span aria-hidden>✨</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
          aria-label="Ask my AI assistant"
          placeholder="Ask my AI anything about my work…"
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-500 dark:text-white md:text-base"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary_dark px-3 py-1 text-sm text-white hover:bg-cyan-700"
        >
          Ask
        </button>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="rounded-full border border-cyan-500/40 px-3 py-1 text-xs text-primary_dark hover:bg-cyan-500/10 dark:text-cyan-200"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
