"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MdArrowOutward, MdSchool, MdWorkOutline } from "react-icons/md";
import type { AboutInfo } from "@/types/content";

function Timeline({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The accent line "draws" itself as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 font-poppins text-2xl font-bold text-gray-900 dark:text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-xl text-white shadow">
          {icon}
        </span>
        {title}
      </h3>
      <div ref={ref} className="relative pl-8">
        <div className="absolute bottom-0 left-[11px] top-1 w-0.5 rounded bg-black/10 dark:bg-white/10" aria-hidden />
        <motion.div
          aria-hidden
          style={{ height: reduce ? "100%" : height }}
          className="absolute left-[11px] top-1 w-0.5 rounded bg-gradient-to-b from-cyan-500 to-emerald-400"
        />
        <ol className="space-y-5">{children}</ol>
      </div>
    </div>
  );
}

function Entry({
  index,
  current,
  children,
}: {
  index: number;
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.05 }}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute -left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          current
            ? "border-emerald-400 bg-emerald-500"
            : "border-cyan-500 bg-white dark:bg-slate-900"
        }`}
      >
        {current && <span className="absolute h-6 w-6 animate-ping rounded-full bg-emerald-400/50" />}
        <span className={`h-2 w-2 rounded-full ${current ? "bg-white" : "bg-cyan-500"}`} />
      </span>
      <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur transition hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04] md:p-5">
        {children}
      </div>
    </motion.li>
  );
}

export default function AboutTimeline({ about }: { about: AboutInfo }) {
  return (
    <section aria-labelledby="journey-heading" className="mx-auto mt-24 w-full max-w-6xl">
      <div className="mb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          Journey
        </span>
        <h2
          id="journey-heading"
          className="mt-2 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          Experience &{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">
            education
          </span>
        </h2>
      </div>

      <div className="grid gap-12 min-[1024px]:grid-cols-[3fr_2fr]">
        <Timeline title="Experience" icon={<MdWorkOutline />}>
          {about.experience.map((x, i) => {
            const current = /present|current|now/i.test(x.period);
            return (
              <Entry key={`${x.company}-${i}`} index={i} current={current}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-poppins text-lg font-semibold text-gray-900 dark:text-white">{x.role}</h4>
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                      {x.url ? (
                        <a
                          href={x.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 hover:underline"
                        >
                          {x.company} <MdArrowOutward className="text-sm" />
                        </a>
                      ) : (
                        x.company
                      )}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      current
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "bg-black/5 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                    }`}
                  >
                    {current ? "Current · " : ""}
                    {x.period.replace(/^from\s+/i, "")}
                  </span>
                </div>
                {x.note && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{x.note}</p>}
              </Entry>
            );
          })}
        </Timeline>

        <Timeline title="Education" icon={<MdSchool />}>
          {about.education.map((e, i) => (
            <Entry key={`${e.degree}-${i}`} index={i}>
              <h4 className="font-poppins text-base font-semibold text-gray-900 dark:text-white">{e.degree}</h4>
              <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{e.institution}</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {[e.field, e.year].filter(Boolean).join(" · ")}
              </p>
            </Entry>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
