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
  proficiency: string;
  icon: string;
  category: string;
  details: string;
  years_of_experience: number;
  percentage: number;
};

export type ServiceInfo = {
  id: number;
  iconKey: "web" | "mobile" | "design";
  service_title: string;
  service_details: string;
};
