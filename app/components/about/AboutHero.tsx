"use client";

import SmartImage from "@/app/components/display/SmartImage";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MdArrowOutward, MdAutoAwesome, MdDownload } from "react-icons/md";
import SocialIcons from "../display/SocialIcons";
import { openChat } from "../display/ChatIcon";
import type { AboutInfo, ContactInfo } from "@/types/content";

type Stat = { label: string; value: string };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function AboutHero({
  about,
  contact,
  stats,
}: {
  about: AboutInfo;
  contact: ContactInfo;
  stats: Stat[];
}) {
  const reduce = useReducedMotion();
  const first = about.name.split(" ").slice(0, 2).join(" ");
  const rest = about.name.split(" ").slice(2).join(" ");

  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto mt-4 grid w-full max-w-6xl items-center gap-10 md:mt-10 md:grid-cols-5"
    >
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="md:col-span-3"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {contact.availability || "Open to new opportunities"}
        </motion.span>

        <motion.h1
          id="about-heading"
          variants={item}
          className="mt-5 font-poppins text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
        >
          <span className="text-gray-500 dark:text-gray-400">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            {first}
          </span>
          {rest && <span> {rest}</span>}
        </motion.h1>

        <motion.p variants={item} className="mt-2 text-lg font-medium text-cyan-700 dark:text-cyan-300">
          {about.personal.occupation}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg"
        >
          {about.summary}
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl"
          >
            Get in touch
            <MdArrowOutward className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="/md_rafidul_islam_resume.pdf"
            download="Md. Rafidul Islam Resume.pdf"
            className="flex items-center gap-1.5 rounded-full border border-cyan-500/50 px-5 py-2.5 font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-200"
          >
            <MdDownload /> Download CV
          </a>
          <button
            type="button"
            onClick={() => openChat("Give me a quick introduction to you and your strongest skills.")}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-300"
          >
            <MdAutoAwesome className="text-cyan-500" /> Ask my AI
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <SocialIcons socials={contact.socials} size={22} className="!justify-start gap-x-5" />
        </motion.div>
      </motion.div>

      {/* Portrait */}
      <div className="relative mx-auto flex w-full max-w-[320px] justify-center md:col-span-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* Rotating gradient ring */}
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#06b6d4,#34d399,#6366f1,#06b6d4)] opacity-80 blur-[2px]"
          />
          <div className="absolute -inset-6 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-4 border-white/80 bg-slate-900 dark:border-slate-900 md:h-[280px] md:w-[280px]">
            <SmartImage
              src="portfolio/images/about-photo.jpg"
              alt={`Portrait of ${about.name}`}
              fill
              sizes="280px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Floating stat chips */}
          {stats.slice(0, 2).map((s, i) => (
            <motion.div
              key={s.label}
              animate={reduce ? undefined : { y: [0, i ? 7 : -7, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute rounded-2xl border border-black/10 bg-white/90 px-4 py-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90 ${
                i === 0 ? "-left-6 top-6 md:-left-12" : "-right-4 bottom-8 md:-right-10"
              }`}
            >
              <div className="font-poppins text-xl font-bold text-cyan-600 dark:text-cyan-300">{s.value}</div>
              <div className="text-[11px] text-gray-600 dark:text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
