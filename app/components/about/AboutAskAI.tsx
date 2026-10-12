"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdAutoAwesome } from "react-icons/md";
import { openChat } from "../display/ChatIcon";

const QUESTIONS = [
  "What are you working on right now?",
  "What was your biggest project?",
  "Which technologies do you enjoy most?",
  "Are you open to relocating or remote work?",
];

export default function AboutAskAI({ firstName }: { firstName: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      aria-labelledby="ask-about-heading"
      className="relative mx-auto my-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 p-8 text-center md:p-12"
    >
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          <MdAutoAwesome /> Curious?
        </span>
        <h2 id="ask-about-heading" className="mt-2 font-poppins text-2xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Ask my AI about {firstName}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-700 dark:text-gray-300 md:text-base">
          It knows my projects, skills and experience. Try a question, or reach out directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => openChat(q)}
              className="rounded-full border border-cyan-500/40 bg-white/60 px-4 py-1.5 text-sm text-cyan-800 transition hover:bg-cyan-500/15 dark:bg-black/20 dark:text-cyan-200"
            >
              {q}
            </button>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-7 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl"
        >
          Contact me
        </Link>
      </div>
    </motion.section>
  );
}
