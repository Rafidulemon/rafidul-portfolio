import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import type { SocialLink } from "@/types/content";

const ICONS: Record<string, { Icon: React.ComponentType<{ size?: number }>; className: string }> = {
  facebook: { Icon: FaFacebook, className: "text-[#1877F2]" },
  instagram: { Icon: FaInstagram, className: "text-[#E1306C]" },
  github: { Icon: FaGithub, className: "dark:text-white text-gray-600" },
  linkedin: { Icon: FaLinkedin, className: "text-[#0077B5]" },
  twitter: { Icon: FaTwitter, className: "text-[#1DA1F2]" },
  x: { Icon: FaTwitter, className: "dark:text-white text-gray-600" },
  youtube: { Icon: FaYoutube, className: "text-[#FF0000]" },
};

export const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "GitHub", "LinkedIn", "Twitter", "YouTube"];

export default function SocialIcons({
  socials,
  size = 30,
  className = "",
}: {
  socials: SocialLink[];
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-row items-center justify-center gap-x-6 ${className}`}>
      {socials
        .filter((s) => s.url)
        .map((s) => {
          const entry = ICONS[s.platform.toLowerCase()] ?? {
            Icon: FaGlobe,
            className: "dark:text-white text-gray-600",
          };
          return (
            <a
              key={`${s.platform}-${s.url}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className={`transition-transform hover:scale-110 ${entry.className}`}
            >
              <entry.Icon size={size} />
            </a>
          );
        })}
    </div>
  );
}
