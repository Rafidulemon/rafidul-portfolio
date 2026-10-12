export type ProjectInfo = {
  id: number;
  type: string;
  category: string;
  src: string;
  project_title: string;
  project_details: string;
  github_link?: string;
  live_link?: string;
  stack: string[];
  featured?: boolean;
};

export type BlogInfo = {
  id: string;
  title: string;
  date: string;
  description: string;
  description_summary: string;
  image: string;
  author: string;
};

export type SkillInfo = {
  id: number;
  skill_name: string;
  proficiency: "advanced" | "intermediate" | "beginner";
  icon: string;
  category: string;
  details: string;
  years_of_experience: number;
  percentage: number;
  group: "languages" | "frontend" | "backend" | "tools";
};

export type ServiceIconKey =
  | "web"
  | "mobile"
  | "design"
  | "ai"
  | "saas"
  | "api"
  | "ab"
  | "performance"
  | "consulting";

export type ServiceInfo = {
  id: number;
  iconKey: ServiceIconKey;
  featured: boolean;
  service_title: string;
  tagline: string;
  highlights: string[];
  tech: string[];
  service_details: string;
};

export type SocialLink = { platform: string; handle?: string; url: string };

export type ContactInfo = {
  full_name: string;
  title: string;
  location: string;
  time_zone: string;
  email: string;
  phone_primary: string;
  phone_secondary?: string;
  portfolio_url: string;
  availability: string;
  preferred_contact_methods: string[];
  response_time: string;
  office_hours: string;
  socials: SocialLink[];
  notes?: string;
};

export type AboutInfo = {
  name: string;
  summary: string;
  skills_summary: string;
  skill_bars: { label: string; level: number }[];
  personal: {
    occupation: string;
    date_of_birth: string;
    nationality: string;
    address: string;
  };
  education: { degree: string; institution: string; field: string; year: string }[];
  experience: { role: string; company: string; url?: string; period: string; note?: string }[];
};

export type SiteInfo = {
  /** Long profile text. This is the knowledge base the AI assistant answers from. */
  profile: string;
  /** Keyword -> answer pairs used by the offline keyword chat fallback. */
  faqs: { keywords: string[]; answer: string }[];
};

/** Blog posts written in the admin (stored in Postgres, Markdown body). */
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
