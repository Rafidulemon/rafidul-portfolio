"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { AboutInfo, SkillInfo } from "@/types/content";
import SmartImage from "../display/SmartImage";

function Meter({ label, level, index }: { label: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(level);
      return;
    }
    const controls = animate(0, level, {
      duration: 1.1,
      delay: index * 0.12,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, level, index, reduce]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
        <span className="font-poppins text-sm font-semibold text-cyan-600 dark:text-cyan-300">{shown}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
        role="progressbar"
        aria-label={label}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400"
          initial={{ width: reduce ? `${level}%` : 0 }}
          animate={inView ? { width: `${level}%` } : undefined}
          transition={{ duration: 1.1, delay: index * 0.12, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function AboutSkills({ about, skills }: { about: AboutInfo; skills: SkillInfo[] }) {
  const core = skills
    .filter((s) => s.proficiency === "advanced")
    .sort((a, b) => b.years_of_experience - a.years_of_experience)
    .slice(0, 10);

  return (
    <section aria-labelledby="skills-about-heading" className="mx-auto mt-20 w-full max-w-6xl">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
            What I do
          </span>
          <h2
            id="skills-about-heading"
            className="mt-2 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
          >
            My professional{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">
              skills
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">{about.skills_summary}</p>

          {core.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Core stack</p>
              <ul className="flex flex-wrap gap-2">
                {core.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 py-1 pl-1 pr-3 text-xs font-medium text-gray-800 backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-200"
                  >
                    <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white p-0.5">
                      <SmartImage src={s.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                    </span>
                    {s.skill_name}
                  </li>
                ))}
              </ul>
              <Link
                href="/#skills-heading"
                className="mt-3 inline-block text-sm text-cyan-700 hover:underline dark:text-cyan-300"
              >
                See all skills →
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="space-y-6 rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] md:p-8"
        >
          {about.skill_bars.map((bar, i) => (
            <Meter key={bar.label} label={bar.label} level={bar.level} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
