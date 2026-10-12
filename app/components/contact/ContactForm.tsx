"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MdAutoAwesome, MdSend } from "react-icons/md";
import { openChat } from "../display/ChatIcon";

const schema = z.object({
  name: z.string().trim().min(1, "Please tell me your name").max(100, "That name is too long"),
  email: z.string().trim().email("That doesn't look like a valid email").max(200),
  title: z.string().trim().min(1, "Add a short subject").max(100, "Keep the subject under 100 characters"),
  message: z.string().trim().min(10, "Tell me a little more (at least 10 characters)").max(5000, "Please keep it under 5000 characters"),
  website: z.string().optional(), // honeypot
});
type FormData = z.infer<typeof schema>;

const TOPICS = [
  {
    id: "hiring",
    label: "Hiring",
    subject: "Job opportunity",
    starter: "Hi Rafid,\n\nWe're hiring for a role I think you'd be a great fit for.\n\nRole: \nCompany: \nLocation / remote: \n\nLooking forward to hearing from you.",
  },
  {
    id: "freelance",
    label: "Freelance project",
    subject: "Project inquiry",
    starter: "Hi Rafid,\n\nI'd like to talk about a project.\n\nWhat I need built: \nTimeline: \nBudget range: \n\nThanks!",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    subject: "Collaboration idea",
    starter: "Hi Rafid,\n\nI'd love to collaborate on something.\n\nThe idea: \nWhat I'm looking for: \n",
  },
  { id: "question", label: "Just a question", subject: "Quick question", starter: "Hi Rafid,\n\n" },
] as const;

const ACKS: Record<string, string> = {
  hiring: "Thanks for reaching out about a role. I've flagged your message as a hiring inquiry and will reply within 24 hours on business days.",
  freelance: "Thanks for the project inquiry. I've flagged it as a freelance request and will get back to you soon to discuss scope and timeline.",
  collaboration: "Thanks for proposing a collaboration. I'll review it and reply shortly.",
  question: "Thanks for your question. I'll get back to you as soon as I can.",
};

const fieldCls = (invalid: boolean) =>
  `peer w-full rounded-xl border bg-white/80 px-4 pb-2 pt-6 text-[15px] text-gray-900 outline-none transition placeholder-transparent focus:ring-4 dark:bg-black/30 dark:text-white ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-black/10 focus:border-cyan-500 focus:ring-cyan-500/20 dark:border-white/15"
  }`;

const labelCls =
  "pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-gray-500 transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-cyan-600 dark:text-gray-400";

export default function ContactForm() {
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState<string>("");
  const [sent, setSent] = useState<{ intent: string } | null>(null);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { website: "" } });

  const message = watch("message") ?? "";

  const pickTopic = (id: string) => {
    const t = TOPICS.find((x) => x.id === id);
    if (!t) return;
    setTopic(id);
    if (!watch("title")) setValue("title", t.subject, { shouldValidate: false });
    // Only drop in the starter text if they haven't started writing.
    if (!watch("message")?.trim()) setValue("message", t.starter, { shouldValidate: false });
  };

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(
          res.status === 429
            ? "You've sent a few messages already. Please try again in a little while."
            : result.message || "Something went wrong sending your message. Please try again, or email me directly."
        );
        return;
      }
      setSent({ intent: result.intent || topic || "other" });
      reset();
      setTopic("");
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-5 shadow-xl shadow-cyan-900/5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] md:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
              <motion.circle
                cx="26" cy="26" r="24" fill="none" strokeWidth="3"
                className="stroke-emerald-500"
                initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
              />
              <motion.path
                d="M15 27l8 8 14-16" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                className="stroke-emerald-500"
                initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }}
              />
            </svg>
            <h3 className="mt-5 font-poppins text-2xl font-bold text-gray-900 dark:text-white">Message sent!</h3>
            <p className="mt-2 max-w-md text-gray-700 dark:text-gray-300">
              {ACKS[sent.intent] ?? "Thanks for your message. I'll get back to you as soon as I can."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setSent(null)}
                className="rounded-full border border-cyan-500/50 px-5 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-200"
              >
                Send another message
              </button>
              <Link
                href="/projects"
                className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/30"
              >
                Browse my projects
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative space-y-4"
            aria-label="Contact form"
          >
            <div>
              <h2 className="font-poppins text-xl font-bold text-gray-900 dark:text-white md:text-2xl">Send me a message</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">What brings you here? Pick one to get started faster.</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Topic">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={topic === t.id}
                    onClick={() => pickTopic(t.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                      topic === t.id
                        ? "border-transparent bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow"
                        : "border-black/10 text-gray-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:text-gray-300 dark:hover:text-cyan-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <input id="c-name" placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} className={fieldCls(!!errors.name)} />
                <label htmlFor="c-name" className={labelCls}>Your name</label>
                {errors.name && <p className="mt-1 text-xs text-red-500" role="alert">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <input id="c-email" type="email" placeholder="Your email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} className={fieldCls(!!errors.email)} />
                <label htmlFor="c-email" className={labelCls}>Your email</label>
                {errors.email && <p className="mt-1 text-xs text-red-500" role="alert">{errors.email.message}</p>}
              </div>
            </div>

            <div className="relative">
              <input id="c-title" placeholder="Subject" aria-invalid={!!errors.title} {...register("title")} className={fieldCls(!!errors.title)} />
              <label htmlFor="c-title" className={labelCls}>Subject</label>
              {errors.title && <p className="mt-1 text-xs text-red-500" role="alert">{errors.title.message}</p>}
            </div>

            <div className="relative">
              <textarea
                id="c-message"
                rows={8}
                placeholder="Message"
                aria-invalid={!!errors.message}
                {...register("message")}
                className={`${fieldCls(!!errors.message)} resize-y`}
              />
              <label htmlFor="c-message" className={labelCls}>Message</label>
              <div className="mt-1 flex items-start justify-between gap-3">
                <p className="text-xs text-red-500" role="alert">{errors.message?.message}</p>
                <span className={`shrink-0 text-xs ${message.length > 5000 ? "text-red-500" : "text-gray-400"}`}>{message.length}/5000</span>
              </div>
            </div>

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>

            {serverError && (
              <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {serverError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex min-w-[160px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-7 py-3 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <MdSend className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => openChat("I'd like to get in touch. What should I include in my message?")}
                className="flex items-center gap-1.5 text-sm text-gray-700 transition hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-300"
              >
                <MdAutoAwesome className="text-cyan-500" /> Not sure what to write? Ask my AI
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
