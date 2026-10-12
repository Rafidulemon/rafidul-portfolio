import type { Metadata } from "next";
import AboutHero from "../components/about/AboutHero";
import AboutFacts from "../components/about/AboutFacts";
import AboutSkills from "../components/about/AboutSkills";
import AboutTimeline from "../components/about/AboutTimeline";
import AboutAskAI from "../components/about/AboutAskAI";
import ProjectsSection from "../components/projects/ProjectsSection";
import { getContent } from "../lib/content/store";
import { givenName } from "../lib/name";

export const metadata: Metadata = {
  title: "About | Md. Rafidul Islam",
  description:
    "About Md. Rafidul Islam: software engineer building web, mobile and AI products. Experience, education and skills.",
};

const AboutPage = async () => {
  const [about, contact, projects, skills] = await Promise.all([
    getContent("about"),
    getContent("contact"),
    getContent("projects"),
    getContent("skills"),
  ]);

  // Live numbers derived from the content you manage in the admin panel.
  const years = Math.max(0, ...skills.map((s) => s.years_of_experience));
  const stats = [
    { label: "Years building", value: `${years}+` },
    { label: "Projects shipped", value: String(projects.length) },
    { label: "Technologies", value: String(skills.length) },
  ];

  return (
    <div className="w-full">
      <AboutHero about={about} contact={contact} stats={stats} />
      <AboutFacts about={about} contact={contact} />
      <AboutSkills about={about} skills={skills} />
      <AboutTimeline about={about} />
      <ProjectsSection projects={projects} compact />
      <AboutAskAI firstName={givenName(about.name)} />
    </div>
  );
};

export default AboutPage;
