import skills from "../../data/skills.json";
import services from "../../data/services.json";
import projects from "../../data/projects.json";
import contact from "../../data/contact.json";
import faqs from "../../data/faqs.json";
import { rafidProfile } from "../../data/rafid-info";
import type {
  AboutInfo,
  ContactInfo,
  ProjectInfo,
  ServiceInfo,
  SiteInfo,
  SkillInfo,
} from "@/types/content";

/** Everything the site shipped with before the admin panel. Used until a section is saved. */
export const DEFAULTS = {
  skills: skills as unknown as SkillInfo[],
  services: services as unknown as ServiceInfo[],
  projects: projects as unknown as ProjectInfo[],
  contact: {
    ...(contact as unknown as ContactInfo),
    socials: [
      ...(contact as unknown as ContactInfo).socials,
      // The footer always showed Instagram; keep it editable instead of hard-coded.
      {
        platform: "Instagram",
        handle: "rafidulemon",
        url: "https://www.instagram.com/rafidulemon",
      },
    ],
  } as ContactInfo,
  about: {
    name: "Md. Rafidul Islam",
    summary:
      "Crafted by a skilled Software Engineer, specializing in Mobile App Development and Web Development, the digital experiences by this innovative mind blend technology and creativity seamlessly. Dedicated to delivering exceptional solutions, this talent strives to make a meaningful impact through their work.",
    skills_summary:
      "With expertise spanning web development encompassing JavaScript, TypeScript, React.js, Next.js, and database management tools like MySQL, MongoDB, and Prisma, alongside mobile app development proficiency in Java and Android, I bring a comprehensive skill set to the table. Complemented by UI/UX design capabilities utilizing Figma and Adobe XD, I am equipped to deliver impactful solutions across diverse platforms.",
    skill_bars: [
      { label: "Web Development", level: 80 },
      { label: "Mobile App Development", level: 70 },
      { label: "UI/UX Design", level: 60 },
    ],
    personal: {
      occupation: "Software Engineer",
      date_of_birth: "12 Nov 1997",
      nationality: "Bangladeshi",
      address: "Patiya, Chittagong, Bangladesh",
    },
    education: [
      {
        degree: "B.SC. in Computer Science & Engineering",
        institution: "BRAC University",
        field: "Computer Science & Engineering",
        year: "2020",
      },
      {
        degree: "Higher Secondary Certificate",
        institution: "Govt. City College, Chittagong",
        field: "Science",
        year: "2015",
      },
      {
        degree: "Secondary School Certificate",
        institution: "Abdus Sobhan Rahat Ali High School, Patiya, Chittagong",
        field: "Science",
        year: "2013",
      },
    ],
    experience: [
      { role: "Software Engineer", company: "Echologyx Ltd.", url: "https://www.echologyx.com/", period: "From July 2026 to Present" },
      { role: "Software Engineer", company: "Ninja Digital Innovations", url: "https://www.ninja-digital-innovations.com/", period: "From July 2025 to June 2026" },
      { role: "Software Engineer (Remote)", company: "Brand Cloud Inc. Bangladesh", url: "https://bc-bangladesh.com/", period: "From August 2023 to June 2025" },
      { role: "Jr. Business Analyst", company: "SoftBD Ltd.", url: "https://www.softbdltd.com/", period: "From January 2023 to July 2023" },
      { role: "Trainee", company: "BJET", url: "https://bjet.org/", period: "From April 2022 to September 2022", note: "Bangladesh Japan ICT Engineers Training Program" },
      { role: "Associate Software Engineer", company: "Nexkraft Limited", url: "https://nexkraft.com/", period: "From November 2021 to March 2022" },
    ],
  } as AboutInfo,
  info: {
    profile: rafidProfile.trim(),
    faqs: faqs as SiteInfo["faqs"],
  } as SiteInfo,
  // Legacy (hand-coded) blog posts the admin has hidden from the public site.
  blog_meta: { hidden: [] as string[] },
};

export type ContentMap = typeof DEFAULTS;
export type ContentKey = keyof ContentMap;
export const CONTENT_KEYS = Object.keys(DEFAULTS) as ContentKey[];
