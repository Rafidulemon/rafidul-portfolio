"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MdCheck, MdContentCopy, MdOutlineEmail, MdPhone, MdPlace, MdSchedule } from "react-icons/md";
import SocialIcons from "../display/SocialIcons";
import type { ContactInfo as ContactData } from "@/types/content";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked: the value is still a normal link
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
      className="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-cyan-500/10 hover:text-cyan-600 dark:text-gray-400"
    >
      {copied ? <MdCheck className="text-emerald-500" /> : <MdContentCopy />}
    </button>
  );
}

export default function ContactInfo({ contact }: { contact: ContactData }) {
  const tel = contact.phone_primary?.replace(/\s+/g, "");
  const rows = [
    {
      icon: <MdOutlineEmail />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      copy: contact.email,
    },
    contact.phone_primary && {
      icon: <MdPhone />,
      label: "Phone",
      value: contact.phone_primary,
      href: `tel:${tel}`,
      copy: contact.phone_primary,
    },
    contact.location && { icon: <MdPlace />, label: "Location", value: contact.location, href: "", copy: "" },
    (contact.response_time || contact.office_hours) && {
      icon: <MdSchedule />,
      label: "Response time",
      value: [contact.response_time, contact.office_hours && `Office hours: ${contact.office_hours}`]
        .filter(Boolean)
        .join(" "),
      href: "",
      copy: "",
    },
  ].filter(Boolean) as {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    copy: string;
  }[];

  return (
    <div className="space-y-4">
      {contact.availability && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4"
        >
          <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div>
            <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Currently available</div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{contact.availability}</p>
          </div>
        </motion.div>
      )}

      <ul className="space-y-3">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (i + 1), duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur transition hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-xl text-white shadow">
              {r.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">{r.label}</div>
              {r.href ? (
                <a href={r.href} className="block break-words text-sm font-medium text-gray-900 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300">
                  {r.value}
                </a>
              ) : (
                <div className="text-sm font-medium text-gray-900 dark:text-white">{r.value}</div>
              )}
            </div>
            {r.copy && <CopyButton value={r.copy} label={r.label.toLowerCase()} />}
          </motion.li>
        ))}
      </ul>

      {contact.socials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
        >
          <div className="mb-3 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Find me online</div>
          <SocialIcons socials={contact.socials} size={26} className="!justify-start gap-x-5" />
        </motion.div>
      )}
    </div>
  );
}
