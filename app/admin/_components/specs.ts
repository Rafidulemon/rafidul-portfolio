import type { ContentKey } from "@/app/lib/content/defaults";

export type Option = { value: string; label: string };

export type Field =
  | { kind: "text" | "url" | "email"; name: string; label: string; help?: string; placeholder?: string }
  | { kind: "textarea" | "markdown"; name: string; label: string; help?: string; rows?: number; placeholder?: string }
  | { kind: "number"; name: string; label: string; help?: string; min?: number; max?: number; step?: number }
  | { kind: "select"; name: string; label: string; options: Option[]; help?: string }
  | { kind: "boolean"; name: string; label: string; help?: string }
  | { kind: "tags"; name: string; label: string; help?: string; placeholder?: string }
  | { kind: "lines"; name: string; label: string; help?: string; rows?: number }
  | { kind: "image"; name: string; label: string; help?: string }
  | { kind: "group"; name: string; label: string; fields: Field[] }
  | {
      kind: "list";
      name: string;
      label: string;
      help?: string;
      itemTitle: (item: any, index: number) => string;
      fields: Field[];
      blank: () => any;
    };

export type SectionSpec = {
  key: ContentKey;
  title: string;
  description: string;
  mode: "list" | "object";
  fields: Field[];
  /** Where to see the result on the public site. */
  publicPath: string;
  /** list mode only */
  itemTitle?: (item: any) => string;
  itemSubtitle?: (item: any) => string;
  itemImage?: (item: any) => string;
  blank?: (items: any[]) => any;
  noun?: string;
};

const nextId = (items: any[]) => items.reduce((m, i) => Math.max(m, Number(i.id) || 0), 0) + 1;

export const SECTIONS: Record<string, SectionSpec> = {
  skills: {
    key: "skills",
    title: "Skills",
    description: "Technologies shown in the Skills section on the homepage.",
    mode: "list",
    publicPath: "/#skills-heading",
    noun: "skill",
    itemTitle: (s) => s.skill_name || "Untitled skill",
    itemSubtitle: (s) => `${s.proficiency} · ${s.years_of_experience}+ yrs · ${s.group}`,
    itemImage: (s) => s.icon,
    blank: (items) => ({
      id: nextId(items),
      skill_name: "New skill",
      proficiency: "intermediate",
      icon: "",
      category: "",
      details: "",
      years_of_experience: 1,
      percentage: 50,
      group: "tools",
    }),
    fields: [
      { kind: "text", name: "skill_name", label: "Name" },
      {
        kind: "select",
        name: "proficiency",
        label: "Level",
        options: [
          { value: "advanced", label: "Advanced" },
          { value: "intermediate", label: "Intermediate" },
          { value: "beginner", label: "Learning (beginner)" },
        ],
      },
      {
        kind: "select",
        name: "group",
        label: "Filter group",
        help: "Which filter pill on the homepage this skill appears under.",
        options: [
          { value: "languages", label: "Languages" },
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend & Data" },
          { value: "tools", label: "Tools & DevOps" },
        ],
      },
      { kind: "number", name: "years_of_experience", label: "Years of experience", min: 0, max: 60, step: 1 },
      { kind: "image", name: "icon", label: "Logo / icon" },
      { kind: "text", name: "category", label: "Category (internal)", help: "e.g. framework, database. Used by the AI assistant." },
      { kind: "textarea", name: "details", label: "Short description", rows: 3 },
      { kind: "number", name: "percentage", label: "Percentage (internal)", min: 0, max: 100, step: 1, help: "Not shown on the site. Used for ordering in the AI keyword fallback." },
    ],
  },

  services: {
    key: "services",
    title: "Services",
    description: "What you offer. Featured services appear on the homepage; all appear on /services.",
    mode: "list",
    publicPath: "/services",
    noun: "service",
    itemTitle: (s) => s.service_title || "Untitled service",
    itemSubtitle: (s) => `${s.featured ? "Featured · " : ""}${s.tagline}`,
    blank: (items) => ({
      id: nextId(items),
      iconKey: "web",
      featured: false,
      service_title: "New service",
      tagline: "",
      highlights: [],
      tech: [],
      service_details: "",
    }),
    fields: [
      { kind: "text", name: "service_title", label: "Title" },
      {
        kind: "select",
        name: "iconKey",
        label: "Icon & colour",
        options: [
          { value: "web", label: "Web (cyan)" },
          { value: "ai", label: "AI (violet)" },
          { value: "saas", label: "SaaS (emerald)" },
          { value: "mobile", label: "Mobile (sky)" },
          { value: "api", label: "API / backend (amber)" },
          { value: "design", label: "Design (rose)" },
          { value: "ab", label: "A/B testing (lime)" },
          { value: "performance", label: "Performance (yellow)" },
          { value: "consulting", label: "Consulting (slate)" },
        ],
      },
      { kind: "boolean", name: "featured", label: "Show on the homepage", help: "Featured services are listed on the homepage; all services are on /services." },
      { kind: "text", name: "tagline", label: "Tagline", help: "One sentence under the title." },
      { kind: "lines", name: "highlights", label: "Highlights", help: "One per line (up to 8).", rows: 4 },
      { kind: "tags", name: "tech", label: "Technologies", placeholder: "Type and press Enter" },
      { kind: "textarea", name: "service_details", label: "Full description", help: "Shown under “How I work” and used by the AI assistant.", rows: 6 },
    ],
  },

  projects: {
    key: "projects",
    title: "Projects",
    description: "Work shown in the Projects section and on /projects. Mark one as featured for the large card.",
    mode: "list",
    publicPath: "/projects",
    noun: "project",
    itemTitle: (p) => p.project_title || "Untitled project",
    itemSubtitle: (p) => `${p.type} · ${p.category}${p.featured ? " · featured" : ""}`,
    itemImage: (p) => p.src,
    blank: (items) => ({
      id: nextId(items),
      type: "web",
      category: "personal",
      featured: false,
      src: "",
      project_title: "New project",
      project_details: "",
      github_link: "",
      live_link: "",
      stack: [],
    }),
    fields: [
      { kind: "text", name: "project_title", label: "Title" },
      {
        kind: "select",
        name: "type",
        label: "Type",
        options: [
          { value: "web", label: "Web" },
          { value: "ai", label: "AI" },
          { value: "mobile", label: "Mobile" },
        ],
      },
      {
        kind: "select",
        name: "category",
        label: "Origin",
        options: [
          { value: "professional", label: "Professional (client / employer work)" },
          { value: "personal", label: "Personal" },
        ],
      },
      { kind: "boolean", name: "featured", label: "Featured (large card)", help: "Only the first featured project in a list is shown large." },
      { kind: "image", name: "src", label: "Screenshot", help: "Landscape images (about 16:10) look best." },
      { kind: "textarea", name: "project_details", label: "Description", rows: 4 },
      { kind: "url", name: "live_link", label: "Live demo URL", placeholder: "https://…" },
      { kind: "url", name: "github_link", label: "GitHub URL", placeholder: "https://github.com/…" },
      { kind: "tags", name: "stack", label: "Tech stack", placeholder: "Type and press Enter" },
    ],
  },

  contact: {
    key: "contact",
    title: "Contact details",
    description: "Shown on the Contact and About pages, in the footer, and known to the AI assistant (except phone numbers).",
    mode: "object",
    publicPath: "/contact",
    fields: [
      { kind: "text", name: "full_name", label: "Full name" },
      { kind: "text", name: "title", label: "Headline / role" },
      { kind: "email", name: "email", label: "Email" },
      { kind: "text", name: "phone_primary", label: "Primary phone" },
      { kind: "text", name: "phone_secondary", label: "Secondary phone (optional)" },
      { kind: "text", name: "location", label: "Location" },
      { kind: "text", name: "time_zone", label: "Time zone" },
      { kind: "url", name: "portfolio_url", label: "Portfolio URL" },
      { kind: "text", name: "availability", label: "Availability", help: "e.g. Open to full-time roles and freelance projects." },
      { kind: "text", name: "response_time", label: "Typical response time" },
      { kind: "text", name: "office_hours", label: "Office hours" },
      { kind: "tags", name: "preferred_contact_methods", label: "Preferred contact methods", placeholder: "email, phone…" },
      {
        kind: "list",
        name: "socials",
        label: "Social links",
        help: "Shown as icons in the footer and About page. Known platforms get their brand icon.",
        itemTitle: (s) => s.platform || "New link",
        blank: () => ({ platform: "GitHub", handle: "", url: "" }),
        fields: [
          {
            kind: "select",
            name: "platform",
            label: "Platform",
            options: ["Facebook", "Instagram", "GitHub", "LinkedIn", "Twitter", "YouTube"].map((p) => ({ value: p, label: p })),
          },
          { kind: "text", name: "handle", label: "Handle (optional)" },
          { kind: "url", name: "url", label: "URL", placeholder: "https://…" },
        ],
      },
      { kind: "textarea", name: "notes", label: "Notes for the AI assistant", rows: 3 },
    ],
  },

  about: {
    key: "about",
    title: "About",
    description: "Your bio, personal details, education and work history for the About page and homepage intro.",
    mode: "object",
    publicPath: "/about",
    fields: [
      { kind: "text", name: "name", label: "Display name" },
      { kind: "textarea", name: "summary", label: "Bio / intro paragraph", help: "Shown on the homepage hero and the About page.", rows: 5 },
      { kind: "textarea", name: "skills_summary", label: "“My professional skills” paragraph", rows: 5 },
      {
        kind: "list",
        name: "skill_bars",
        label: "Skill bars (About page)",
        itemTitle: (b) => `${b.label || "Bar"} · ${b.level ?? 0}%`,
        blank: () => ({ label: "New area", level: 50 }),
        fields: [
          { kind: "text", name: "label", label: "Label" },
          { kind: "number", name: "level", label: "Level (0–100)", min: 0, max: 100, step: 1 },
        ],
      },
      {
        kind: "group",
        name: "personal",
        label: "Personal details",
        fields: [
          { kind: "text", name: "occupation", label: "Occupation" },
          { kind: "text", name: "date_of_birth", label: "Date of birth" },
          { kind: "text", name: "nationality", label: "Nationality" },
          { kind: "text", name: "address", label: "Address" },
        ],
      },
      {
        kind: "list",
        name: "education",
        label: "Education",
        itemTitle: (e) => e.degree || "New entry",
        blank: () => ({ degree: "", institution: "", field: "", year: "" }),
        fields: [
          { kind: "text", name: "degree", label: "Degree / certificate" },
          { kind: "text", name: "institution", label: "Institution" },
          { kind: "text", name: "field", label: "Field of study" },
          { kind: "text", name: "year", label: "Passing year" },
        ],
      },
      {
        kind: "list",
        name: "experience",
        label: "Work experience (newest first)",
        itemTitle: (x) => `${x.role || "Role"} · ${x.company || ""}`,
        blank: () => ({ role: "", company: "", url: "", period: "", note: "" }),
        fields: [
          { kind: "text", name: "role", label: "Role" },
          { kind: "text", name: "company", label: "Company" },
          { kind: "url", name: "url", label: "Company website", placeholder: "https://…" },
          { kind: "text", name: "period", label: "Period", placeholder: "From July 2025 to Present" },
          { kind: "text", name: "note", label: "Note (optional)" },
        ],
      },
    ],
  },

  info: {
    key: "info",
    title: "My information (AI knowledge)",
    description: "The text your AI assistant answers from, plus keyword answers used when the AI is offline.",
    mode: "object",
    publicPath: "/",
    fields: [
      {
        kind: "markdown",
        name: "profile",
        label: "Profile",
        rows: 28,
        help: "Employers, dates, skills, education, projects. The assistant treats this as the source of truth about you, so keep it current. Phone numbers are never shared with visitors.",
      },
      {
        kind: "list",
        name: "faqs",
        label: "Keyword answers (offline fallback)",
        help: "Used only when the AI model is unavailable: if a visitor's message contains one of the keywords, this answer is sent.",
        itemTitle: (f) => (f.keywords?.length ? f.keywords.slice(0, 3).join(", ") : "New answer"),
        blank: () => ({ keywords: [], answer: "" }),
        fields: [
          { kind: "tags", name: "keywords", label: "Keywords", placeholder: "Type and press Enter" },
          { kind: "textarea", name: "answer", label: "Answer", rows: 4 },
        ],
      },
    ],
  },
};

export const SECTION_ORDER = ["projects", "skills", "services", "about", "contact", "info"] as const;
