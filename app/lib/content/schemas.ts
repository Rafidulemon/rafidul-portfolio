import { z } from "zod";
import type { ContentKey } from "./defaults";

const str = (max = 300) => z.string().trim().max(max);
const req = (max = 300) => z.string().trim().min(1, "Required").max(max);
// Accepts site paths, https URLs and mailto/tel links; blocks javascript: and data: URLs.
const link = z
  .string()
  .trim()
  .max(500)
  .refine(
    (v) => v === "" || /^(https?:\/\/|\/|mailto:|tel:)/i.test(v),
    "Must start with https://, /, mailto: or tel:"
  );
const image = z
  .string()
  .trim()
  .max(500)
  // An R2 object key ("portfolio/uploads/…"), a /path or an https:// URL. Script-capable schemes are refused.
  .refine((v) => !/^\s*(javascript|data|vbscript|file|blob):/i.test(v) && !/\s|\.\./.test(v), "Must be an uploaded image, a /path or an https:// URL");
const tags = (maxItems = 30) => z.array(req(60)).max(maxItems);

const skill = z.object({
  id: z.number().int().positive(),
  skill_name: req(60),
  proficiency: z.enum(["advanced", "intermediate", "beginner"]),
  icon: image,
  category: str(60),
  details: str(500),
  years_of_experience: z.number().min(0).max(60),
  percentage: z.number().min(0).max(100),
  group: z.enum(["languages", "frontend", "backend", "tools"]),
});

const service = z.object({
  id: z.number().int().positive(),
  iconKey: z.enum(["web", "mobile", "design", "ai", "saas", "api", "ab", "performance", "consulting"]),
  featured: z.boolean(),
  service_title: req(100),
  tagline: str(200),
  highlights: z.array(req(200)).max(8),
  tech: tags(12),
  service_details: str(2000),
});

const project = z.object({
  id: z.number().int().positive(),
  type: z.enum(["ai", "web", "mobile"]),
  category: z.enum(["professional", "personal"]),
  featured: z.boolean().optional(),
  src: image,
  project_title: req(100),
  project_details: str(1000),
  github_link: link.optional(),
  live_link: link.optional(),
  stack: tags(20),
});

const contact = z.object({
  full_name: req(100),
  title: str(200),
  location: str(200),
  time_zone: str(100),
  email: z.string().trim().email().max(200),
  phone_primary: str(40),
  phone_secondary: str(40).optional(),
  portfolio_url: link,
  availability: str(300),
  preferred_contact_methods: tags(8),
  response_time: str(300),
  office_hours: str(200),
  socials: z
    .array(z.object({ platform: req(40), handle: str(100).optional(), url: link }))
    .max(12),
  notes: str(600).optional(),
});

const about = z.object({
  name: req(100),
  summary: str(1500),
  skills_summary: str(1500),
  skill_bars: z.array(z.object({ label: req(80), level: z.number().min(0).max(100) })).max(8),
  personal: z.object({
    occupation: str(100),
    date_of_birth: str(40),
    nationality: str(60),
    address: str(200),
  }),
  education: z
    .array(z.object({ degree: req(150), institution: str(200), field: str(150), year: str(20) }))
    .max(15),
  experience: z
    .array(
      z.object({
        role: req(100),
        company: req(150),
        url: link.optional(),
        period: str(80),
        note: str(200).optional(),
      })
    )
    .max(25),
});

const info = z.object({
  profile: z.string().trim().max(20000),
  faqs: z.array(z.object({ keywords: tags(15), answer: req(1500) })).max(100),
});

const blogMeta = z.object({ hidden: z.array(z.string().max(100)).max(200) });

export const SCHEMAS = {
  skills: z.array(skill).max(100),
  services: z.array(service).max(30),
  projects: z.array(project).max(100),
  contact,
  about,
  info,
  blog_meta: blogMeta,
} satisfies Record<ContentKey, z.ZodTypeAny>;

export const blogPostInput = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
    // Purely numeric slugs would collide with the ids of the legacy posts.
    .refine((s) => /[a-z]/.test(s), "Slug must contain at least one letter"),
  title: req(200),
  summary: str(400),
  content: z.string().max(200_000),
  cover: image,
  tags: tags(10),
  author: str(100),
  status: z.enum(["draft", "published"]),
});
