"use client";

import { motion } from "framer-motion";
import { MdCake, MdFlag, MdOutlineEmail, MdPhone, MdPlace, MdSchedule } from "react-icons/md";
import type { AboutInfo, ContactInfo } from "@/types/content";

export default function AboutFacts({ about, contact }: { about: AboutInfo; contact: ContactInfo }) {
  const facts = [
    { icon: <MdPlace />, label: "Based in", value: about.personal.address || contact.location, href: "" },
    {
      icon: <MdOutlineEmail />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: <MdPhone />,
      label: "Phone",
      value: contact.phone_primary,
      href: contact.phone_primary ? `tel:${contact.phone_primary.replace(/\s+/g, "")}` : "",
    },
    { icon: <MdSchedule />, label: "Replies", value: contact.response_time, href: "" },
    { icon: <MdFlag />, label: "Nationality", value: about.personal.nationality, href: "" },
    { icon: <MdCake />, label: "Born", value: about.personal.date_of_birth, href: "" },
  ].filter((f) => f.value);

  return (
    <section aria-label="Quick facts" className="mx-auto mt-14 w-full max-w-6xl">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {facts.map((f, i) => {
          const body = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-xl text-white shadow">
                {f.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {f.label}
                </span>
                <span className="block break-words text-sm font-medium text-gray-900 dark:text-white">
                  {f.value}
                </span>
              </span>
            </>
          );
          const cls =
            "flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04]";
          return (
            <motion.li
              key={f.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {f.href ? (
                <a href={f.href} className={cls}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
