"use client";

import { ReactNode, useMemo, useState } from "react";
import SmartImage from "../display/SmartImage";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  MdArrowOutward,
  MdAutoAwesome,
  MdOutlineCode,
  MdPhoneIphone,
  MdStar,
  MdWorkOutline,
} from "react-icons/md";
import { ProjectInfo } from "@/types/content";
import { openChat } from "../display/ChatIcon";

type TypeId = "ai" | "web" | "mobile";
type TypeFilter = "all" | TypeId;
type OriginFilter = "all" | "professional" | "personal";

// Professional work first; array order (stable sort) otherwise.
const sortProjects = (list: ProjectInfo[]) =>
  list
    .slice()
    .sort(
      (a, b) =>
        Number(b.category === "professional") - Number(a.category === "professional")
    );

// Full class strings so Tailwind can see them at build time.
const TYPES: Record<
  TypeId,
  { label: string; icon: ReactNode; tile: string; glow: string; button: string }
> = {
  ai: {
    label: "AI",
    icon: <MdAutoAwesome />,
    tile: "from-violet-500 to-fuchsia-500",
    glow: "168,85,247",
    button: "from-violet-600 to-fuchsia-500",
  },
  web: {
    label: "Web",
    icon: <MdOutlineCode />,
    tile: "from-cyan-500 to-blue-500",
    glow: "6,182,212",
    button: "from-cyan-600 to-blue-500",
  },
  mobile: {
    label: "Mobile",
    icon: <MdPhoneIphone />,
    tile: "from-amber-500 to-orange-500",
    glow: "245,158,11",
    button: "from-amber-500 to-orange-500",
  },
};

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
];

const ORIGIN_FILTERS: { id: OriginFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "professional", label: "Professional" },
  { id: "personal", label: "Personal" },
];

function Pills<T extends string>({
  label,
  items,
  value,
  onChange,
  layoutId,
  counts,
}: {
  label: string;
  items: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
  counts: Record<string, number>;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center justify-center gap-2">
      {items.map((item) => {
        const selected = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item.id)}
            className="relative rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-200"
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 shadow-lg shadow-cyan-500/30"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full border border-black/10 dark:border-white/15" />
            )}
            <span className={`relative flex items-center gap-1.5 ${selected ? "text-white" : ""}`}>
              {item.label}
              <span
                className={`rounded-full px-1.5 text-[10px] ${
                  selected ? "bg-white/25" : "bg-black/5 dark:bg-white/10"
                }`}
              >
                {counts[item.id] ?? 0}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: ProjectInfo;
  index: number;
  featured: boolean;
}) {
  const reduce = useReducedMotion();
  const type = TYPES[project.type as TypeId] ?? TYPES.web;
  const shownStack = project.stack.slice(0, featured ? 8 : 4);
  const extra = project.stack.length - shownStack.length;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 240, damping: 26, delay: (index % 3) * 0.07 }}
      whileHover={reduce ? undefined : { y: -6 }}
      onPointerMove={onMove}
      style={{ ["--glow" as string]: type.glow }}
      className={`group relative flex overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04] ${
        featured ? "flex-col md:col-span-2 md:flex-row" : "flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-black/5 dark:bg-white/5 ${
          featured ? "aspect-[16/10] md:aspect-auto md:w-[55%] md:min-h-[320px]" : "aspect-[16/10]"
        }`}
      >
        <SmartImage
          src={project.src}
          alt={`${project.project_title} screenshot`}
          fill
          sizes={
            featured
              ? "(min-width: 1100px) 600px, (min-width: 768px) 50vw, 100vw"
              : "(min-width: 1100px) 380px, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`flex items-center gap-1 rounded-full bg-gradient-to-r ${type.tile} px-2.5 py-1 text-[11px] font-semibold text-white shadow`}
          >
            {type.icon}
            {type.label}
          </span>
          {featured && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur">
              <MdStar /> Featured
            </span>
          )}
        </div>
        {project.category === "professional" && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <MdWorkOutline /> Professional
          </span>
        )}
      </div>

      {/* Mouse-follow glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(var(--glow), 0.14), transparent 70%)",
        }}
      />

      {/* Body */}
      <div className={`relative flex flex-1 flex-col p-5 md:p-6 ${featured ? "md:justify-center" : ""}`}>
        <h3
          className={`font-poppins font-semibold text-gray-900 dark:text-white ${
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}
        >
          {project.project_title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-[15px]">
          {project.project_details}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {shownStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full px-2 py-0.5 text-[11px] text-gray-500">+{extra}</span>
          )}
        </div>

        <div className={`flex flex-wrap items-center gap-2 ${featured ? "pt-6" : "mt-auto pt-5"}`}>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 rounded-full bg-gradient-to-r ${type.button} px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:shadow-lg`}
            >
              Live demo <MdArrowOutward className="text-sm" />
            </a>
          )}
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-1.5 text-xs font-medium text-gray-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:text-gray-300 dark:hover:text-cyan-300"
            >
              <FaGithub /> Code
            </a>
          )}
          <button
            type="button"
            onClick={() =>
              openChat(
                `Tell me about the "${project.project_title}" project: what it does, the stack, and what Rafid built.`
              )
            }
            className="flex items-center gap-1 rounded-full border border-black/10 px-3.5 py-1.5 text-xs font-medium text-gray-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:text-gray-300 dark:hover:text-cyan-300"
          >
            <MdAutoAwesome className="text-sm text-cyan-500" /> Ask AI
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({
  projects: input,
  compact = false,
  showCta = false,
  titleAs = "h2",
}: {
  projects: ProjectInfo[];
  compact?: boolean;
  showCta?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const Title = titleAs;
  const projects = useMemo(() => sortProjects(input), [input]);
  const [type, setType] = useState<TypeFilter>("all");
  const [origin, setOrigin] = useState<OriginFilter>("all");

  const matches = (p: ProjectInfo, t: TypeFilter, o: OriginFilter) =>
    (t === "all" || p.type === t) && (o === "all" || p.category === o);

  // Each pill's count respects the *other* filter, so numbers match what you'd see.
  const typeCounts = useMemo(() => {
    const out: Record<string, number> = {};
    TYPE_FILTERS.forEach((f) => (out[f.id] = projects.filter((p) => matches(p, f.id, origin)).length));
    return out;
  }, [origin, projects]);
  const originCounts = useMemo(() => {
    const out: Record<string, number> = {};
    ORIGIN_FILTERS.forEach((f) => (out[f.id] = projects.filter((p) => matches(p, type, f.id)).length));
    return out;
  }, [type, projects]);

  const filtered = useMemo(() => {
    const list = projects.filter((p) => matches(p, type, origin));
    // Pull the featured project to the front so it renders as the big card.
    const feat = list.find((p) => p.featured);
    return feat ? [feat, ...list.filter((p) => p !== feat)] : list;
  }, [type, origin, projects]);

  const hasFeatured = !!filtered[0]?.featured;
  // 5 cards with a featured one (2+1 / 3) and 6 without (3 / 3) fill whole rows.
  const limit = compact ? (hasFeatured ? 5 : 6) : filtered.length;
  const visible = filtered.slice(0, limit);

  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-6xl sm:my-8 md:my-12 lg:my-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
          Portfolio
        </span>
        <Title
          id="projects-heading"
          className="mt-4 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Selected{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            work
          </span>
        </Title>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
          Production SaaS platforms, AI products and personal builds. Open any
          project, or ask the AI how it was made.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Pills
          label="Filter projects by type"
          items={TYPE_FILTERS}
          value={type}
          onChange={setType}
          layoutId="projects-type-pill"
          counts={typeCounts}
        />
        <Pills
          label="Filter projects by origin"
          items={ORIGIN_FILTERS}
          value={origin}
          onChange={setOrigin}
          layoutId="projects-origin-pill"
          counts={originCounts}
        />
      </div>

      <motion.div
        layout
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 min-[1100px]:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={i === 0 && !!project.featured}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          No projects match these filters yet.
        </p>
      )}

      {compact && filtered.length > visible.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="group flex items-center gap-2 rounded-full border border-cyan-500/40 px-6 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-300"
          >
            View all {filtered.length} projects
            <MdArrowOutward className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}

      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 p-8 text-center md:p-12"
        >
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Like what you see?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-700 dark:text-gray-300 md:text-base">
            Let&apos;s talk about what I can build for you.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl"
            >
              Contact me
            </Link>
            <Link
              href="/match"
              className="flex items-center gap-2 rounded-full border border-cyan-500/50 px-6 py-2.5 font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-200"
            >
              <MdAutoAwesome /> Try the AI job match
            </Link>
          </div>
        </motion.div>
      )}
    </section>
  );
}
