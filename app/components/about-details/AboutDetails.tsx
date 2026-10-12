"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineEmail, MdPhone, MdPlace } from "react-icons/md";
import type { AboutInfo, ContactInfo } from "@/types/content";

type Tab = "personal" | "education" | "experience";
const TABS: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
];

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-4 border-b border-black/5 py-3 last:border-0 dark:border-white/10">
    <dt className="text-sm font-semibold text-gray-900 dark:text-white">{label}</dt>
    <dd className="col-span-2 break-words text-sm text-gray-700 dark:text-gray-300">{children}</dd>
  </div>
);

export default function AboutDetails({
  about,
  contact,
}: {
  about: AboutInfo;
  contact: ContactInfo;
}) {
  const [tab, setTab] = useState<Tab>("personal");

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div role="tablist" className="flex flex-wrap items-center justify-center gap-2">
        {TABS.map((t) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t.id)}
              className="relative rounded-full px-5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-200"
            >
              {selected ? (
                <motion.span
                  layoutId="about-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 shadow-lg shadow-cyan-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-black/10 dark:border-white/15" />
              )}
              <span className={`relative ${selected ? "text-white" : ""}`}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "personal" && (
              <dl>
                <Row label="Name">{about.name}</Row>
                <Row label="Occupation">{about.personal.occupation}</Row>
                {contact.phone_primary && (
                  <Row label="Phone">
                    <a href={`tel:${contact.phone_primary.replace(/\s+/g, "")}`}>{contact.phone_primary}</a>
                  </Row>
                )}
                <Row label="Email">
                  <a className="text-cyan-600 underline dark:text-cyan-300" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </Row>
                {about.personal.date_of_birth && <Row label="Date of birth">{about.personal.date_of_birth}</Row>}
                {about.personal.nationality && <Row label="Nationality">{about.personal.nationality}</Row>}
                {about.personal.address && <Row label="Address">{about.personal.address}</Row>}
              </dl>
            )}

            {tab === "education" && (
              <ol className="space-y-6">
                {about.education.map((e, i) => (
                  <li key={i} className="relative border-l-2 border-cyan-500/40 pl-5">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan-500" />
                    <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-white">{e.degree}</h3>
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{e.institution}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {[e.field, e.year && `Passing year: ${e.year}`].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "experience" && (
              <ol className="space-y-6">
                {about.experience.map((x, i) => (
                  <li key={i} className="relative border-l-2 border-cyan-500/40 pl-5">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan-500" />
                    <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-white">{x.role}</h3>
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                      {x.url ? (
                        <a href={x.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {x.company}
                        </a>
                      ) : (
                        x.company
                      )}
                    </p>
                    {x.note && <p className="text-sm text-gray-600 dark:text-gray-400">{x.note}</p>}
                    <p className="text-xs text-gray-500">{x.period}</p>
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const ContactChips = ({ about, contact }: { about: AboutInfo; contact: ContactInfo }) => (
  <ul className="mt-5 flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
    {about.personal.address && (
      <li className="flex items-center gap-3">
        <MdPlace className="text-lg text-cyan-500" /> {about.personal.address}
      </li>
    )}
    {contact.phone_primary && (
      <li className="flex items-center gap-3">
        <MdPhone className="text-lg text-cyan-500" />
        <a href={`tel:${contact.phone_primary.replace(/\s+/g, "")}`}>{contact.phone_primary}</a>
      </li>
    )}
    <li className="flex items-center gap-3">
      <MdOutlineEmail className="text-lg text-cyan-500" />
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </li>
  </ul>
);
