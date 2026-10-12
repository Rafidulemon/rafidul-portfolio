import type { Metadata } from "next";
import ProjectsSection from "../components/projects/ProjectsSection";
import { getContent } from "../lib/content/store";

export const metadata: Metadata = {
  title: "Projects | Md. Rafidul Islam",
  description:
    "Production SaaS platforms, AI products, web and mobile apps built by Md. Rafidul Islam with Next.js, TypeScript, tRPC, Prisma and OpenAI.",
};

const ProjectsPage = async () => {
  const projects = await getContent("projects");
  return <ProjectsSection projects={projects} titleAs="h1" showCta />;
};

export default ProjectsPage;
