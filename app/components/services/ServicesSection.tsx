"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MdArrowOutward,
  MdAutoAwesome,
  MdCheckCircle,
  MdDesignServices,
  MdDns,
  MdExpandMore,
  MdLayers,
  MdLightbulb,
  MdOutlineCode,
  MdPhoneIphone,
  MdScience,
  MdSpeed,
} from "react-icons/md";
import { ServiceIconKey, ServiceInfo } from "@/types/content";
import { openChat } from "../display/ChatIcon";

// Full class strings (not interpolated) so Tailwind can see them at build time.
const ACCENTS: Record<
  ServiceIconKey,
  { icon: ReactNode; tile: string; glow: string; check: string; chip: string }
> = {
  web: {
    icon: <MdOutlineCode />,
    tile: "from-cyan-500 to-blue-500",
    glow: "6,182,212",
    check: "text-cyan-500",
    chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  },
  ai: {
    icon: <MdAutoAwesome />,
    tile: "from-violet-500 to-fuchsia-500",
    glow: "168,85,247",
    check: "text-violet-500",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  saas: {
    icon: <MdLayers />,
    tile: "from-emerald-500 to-teal-500",
    glow: "16,185,129",
    check: "text-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  mobile: {
    icon: <MdPhoneIphone />,
    tile: "from-sky-500 to-indigo-500",
    glow: "59,130,246",
    check: "text-sky-500",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  api: {
    icon: <MdDns />,
    tile: "from-amber-500 to-orange-500",
    glow: "245,158,11",
    check: "text-amber-500",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  design: {
    icon: <MdDesignServices />,
    tile: "from-pink-500 to-rose-500",
    glow: "244,63,94",
    check: "text-rose-500",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  ab: {
    icon: <MdScience />,
    tile: "from-lime-500 to-green-500",
    glow: "132,204,22",
    check: "text-lime-500",
    chip: "bg-lime-500/10 text-lime-700 dark:text-lime-300",
  },
  performance: {
    icon: <MdSpeed />,
    tile: "from-yellow-400 to-orange-500",
    glow: "250,204,21",
    check: "text-yellow-500",
    chip: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  },
  consulting: {
    icon: <MdLightbulb />,
    tile: "from-slate-400 to-cyan-500",
    glow: "100,116,139",
    check: "text-slate-500",
    chip: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  },
};

const PROCESS = [
  { title: "Discover", text: "We align on goals, users, scope and success metrics." },
  { title: "Design", text: "Wireframes, architecture and a clear plan before code." },
  { title: "Build", text: "Iterative delivery with regular demos and feedback." },
  { title: "Launch & support", text: "Deploy, monitor, measure and keep improving." },
];

function ServiceCard({
  service,
  index,
  open,
  onToggle,
}: {
  service: ServiceInfo;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const accent = ACCENTS[service.iconKey];
  const reduce = useReducedMotion();
  const panelId = `service-details-${service.id}`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 240, damping: 24, delay: (index % 3) * 0.08 }}
      whileHover={reduce ? undefined : { y: -6 }}
      onPointerMove={onMove}
      style={{ ["--glow" as string]: accent.glow }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04] md:p-6"
    >
      {/* Accent line + mouse-follow glow */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.tile} opacity-70 transition-opacity group-hover:opacity-100`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 30%), rgba(var(--glow), 0.16), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.tile} text-3xl text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
        >
          {accent.icon}
        </span>
        <span
          aria-hidden
          className="font-poppins text-4xl font-bold text-black/[0.07] dark:text-white/[0.08]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-4 font-poppins text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
        {service.service_title}
      </h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {service.tagline}
      </p>

      <ul className="relative mt-4 space-y-2">
        {service.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <MdCheckCircle className={`mt-0.5 shrink-0 text-base ${accent.check}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {service.tech.map((t) => (
          <span
            key={t}
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${accent.chip}`}
          >
            {t}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden"
          >
            <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-gray-700 dark:border-white/10 dark:text-gray-300">
              {service.service_details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-300"
        >
          {open ? "Show less" : "How I work"}
          <MdExpandMore
            className={`text-lg transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              openChat(`Tell me about your ${service.service_title} service: what you deliver and relevant past work.`)
            }
            className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-gray-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:text-gray-300 dark:hover:text-cyan-300"
          >
            <MdAutoAwesome className="text-sm text-cyan-500" /> Ask AI
          </button>
          <Link
            href="/contact"
            className={`flex items-center gap-1 rounded-full bg-gradient-to-r ${accent.tile} px-3 py-1 text-xs font-medium text-white shadow transition hover:shadow-lg`}
          >
            Get a quote <MdArrowOutward className="text-sm" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesSection({
  services,
  featuredOnly = false,
  showProcess = false,
  showCta = false,
  titleAs = "h2",
}: {
  services: ServiceInfo[];
  featuredOnly?: boolean;
  showProcess?: boolean;
  showCta?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const list = featuredOnly ? services.filter((s) => s.featured) : services;
  const Title = titleAs;
  // One card open at a time. While one is open, rows size to content so the
  // neighbouring cards don't stretch into empty boxes.
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="services-heading"
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
          Services
        </span>
        <Title
          id="services-heading"
          className="mt-4 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          What I can{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            build for you
          </span>
        </Title>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
          From a first idea to a production launch: web apps, AI features, mobile
          apps and the backend that powers them.
        </p>
      </motion.div>

      <div
        className={`mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 min-[1100px]:grid-cols-3 ${
          openId !== null ? "items-start" : ""
        }`}
      >
        {list.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={i}
            open={openId === service.id}
            onToggle={() => setOpenId((cur) => (cur === service.id ? null : service.id))}
          />
        ))}
      </div>

      {featuredOnly && services.length > list.length && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="group flex items-center gap-2 rounded-full border border-cyan-500/40 px-6 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-300"
          >
            View all {services.length} services
            <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}

      {showProcess && (
        <div className="mt-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            How we&apos;ll work together
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {PROCESS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="relative rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-poppins font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      )}

      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 p-8 text-center md:p-12"
        >
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-700 dark:text-gray-300 md:text-base">
            Tell me what you&apos;re building and I&apos;ll reply within 24 hours on business days.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl"
            >
              Hire me
            </Link>
            <button
              type="button"
              onClick={() => openChat("I have a project idea. What should I tell you to get started?")}
              className="flex items-center gap-2 rounded-full border border-cyan-500/50 px-6 py-2.5 font-medium text-cyan-700 transition hover:bg-cyan-500/10 dark:text-cyan-200"
            >
              <MdAutoAwesome /> Ask my AI first
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
