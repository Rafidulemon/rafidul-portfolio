"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SmartImage from "../display/SmartImage";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { SkillInfo } from "@/types/content";

type Skill = SkillInfo;
type GroupId = "all" | "languages" | "frontend" | "backend" | "tools";

const GROUPS: { id: GroupId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & Data" },
  { id: "tools", label: "Tools & DevOps" },
];

const LEVELS: Record<string, { label: string; rank: number; chip: string; bar: string }> = {
  advanced: {
    label: "Advanced",
    rank: 3,
    chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    bar: "bg-gradient-to-r from-emerald-400 to-cyan-400",
  },
  intermediate: {
    label: "Intermediate",
    rank: 2,
    chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    bar: "bg-gradient-to-r from-sky-400 to-cyan-400",
  },
  beginner: {
    label: "Learning",
    rank: 1,
    chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    bar: "bg-gradient-to-r from-amber-400 to-orange-400",
  },
};

const levelOf = (skill: Skill) => LEVELS[skill.proficiency] ?? LEVELS.beginner;

const sortSkills = (list: Skill[]) =>
  [...list].sort(
    (a, b) =>
      levelOf(b).rank - levelOf(a).rank ||
      b.years_of_experience - a.years_of_experience
  );

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function MarqueeRow({ items, reverse }: { items: Skill[]; reverse?: boolean }) {
  // Duplicated once so translating by -50% loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max gap-3 py-1 motion-reduce:animate-none group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map((skill, i) => (
          <div
            key={`${skill.id}-${i}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-black/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-sm text-gray-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white p-1">
              <SmartImage
                src={skill.icon}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </span>
            {skill.skill_name}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const level = levelOf(skill);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: Math.min(index, 8) * 0.04,
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      onPointerMove={onMove}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur transition-shadow hover:shadow-xl hover:shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-white/10 dark:bg-white/[0.04] md:p-5"
    >
      {/* Mouse-follow glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(0,188,212,0.18), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 md:h-14 md:w-14">
          <SmartImage
            src={skill.icon}
            alt={`${skill.skill_name} logo`}
            width={48}
            height={48}
            className="h-full w-full object-contain"
          />
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${level.chip}`}
        >
          {level.label}
        </span>
      </div>

      <h3 className="relative mt-3 font-poppins text-base font-semibold text-gray-900 dark:text-white md:text-lg">
        {skill.skill_name}
      </h3>

      {/* 3-step level meter: honest, unlike made-up percentages */}
      <div
        className="relative mt-2 flex gap-1"
        role="img"
        aria-label={`${level.label} level, ${skill.years_of_experience} years`}
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
          >
            <motion.span
              className={`block h-full rounded-full ${level.bar}`}
              initial={{ width: reduce ? (step <= level.rank ? "100%" : 0) : 0 }}
              whileInView={{ width: step <= level.rank ? "100%" : 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + step * 0.12, ease: "easeOut" }}
            />
          </span>
        ))}
      </div>

      <div className="relative mt-2 text-xs text-gray-600 dark:text-gray-400">
        {skill.years_of_experience}+ {skill.years_of_experience === 1 ? "year" : "years"}
      </div>

      <p className="relative mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
        {skill.details}
      </p>
    </motion.div>
  );
}

export default function SkillsSection({ skills: input }: { skills: SkillInfo[] }) {
  const skills = useMemo(() => sortSkills(input), [input]);
  const [group, setGroup] = useState<GroupId>("all");

  const visible = useMemo(
    () => (group === "all" ? skills : skills.filter((s) => s.group === group)),
    [group, skills]
  );

  const stats = useMemo(
    () => [
      { label: "Technologies", value: skills.length, suffix: "" },
      {
        label: "Years building",
        value: Math.max(...skills.map((s) => s.years_of_experience)),
        suffix: "+",
      },
      {
        label: "Advanced skills",
        value: skills.filter((s) => s.proficiency === "advanced").length,
        suffix: "",
      },
      { label: "Domains", value: GROUPS.length - 1, suffix: "" },
    ],
    [skills]
  );

  const half = Math.ceil(skills.length / 2);
  const rowA = skills.slice(0, half);
  const rowB = skills.slice(half);

  return (
    <section
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-6xl sm:my-8 md:my-12 lg:my-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
          Toolkit
        </span>
        <h2
          id="skills-heading"
          className="mt-4 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Skills &{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
          The stack I use to design, build and ship full-stack products, from
          pixel-perfect interfaces to type-safe APIs.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-center backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="bg-gradient-to-br from-cyan-500 to-emerald-400 bg-clip-text font-poppins text-3xl font-bold text-transparent md:text-4xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee (decorative: the grid below lists every skill) */}
      <div className="mt-8 space-y-3" aria-hidden>
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      {/* Filters */}
      <div
        role="group"
        aria-label="Filter skills by domain"
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        {GROUPS.map((g) => {
          const selected = group === g.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setGroup(g.id)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-200"
            >
              {selected && (
                <motion.span
                  layoutId="skills-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 shadow-lg shadow-cyan-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {!selected && (
                <span className="absolute inset-0 rounded-full border border-black/10 dark:border-white/15" />
              )}
              <span className={`relative ${selected ? "text-white" : ""}`}>
                {g.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <motion.div
        layout
        className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
