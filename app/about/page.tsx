import type { Metadata } from "next";
import Link from "next/link";
import MotionDiv from "../components/animations/MotionDiv";
import SkillBar from "../components/animations/SkillBar";
import SocialIcons from "../components/display/SocialIcons";
import ProjectsSection from "../components/projects/ProjectsSection";
import AboutDetails, { ContactChips } from "../components/about-details/AboutDetails";
import { getContent } from "../lib/content/store";

export const metadata: Metadata = {
  title: "About | Md. Rafidul Islam",
  description:
    "About Md. Rafidul Islam: software engineer building web, mobile and AI products. Experience, education and skills.",
};

const AboutPage = async () => {
  const [about, contact, projects] = await Promise.all([
    getContent("about"),
    getContent("contact"),
    getContent("projects"),
  ]);

  return (
    <div className="w-full">
      <section className="mx-auto mt-6 grid w-full max-w-6xl items-center gap-10 md:mt-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
            About me
          </span>
          <h1 className="mt-4 font-poppins text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {about.name}
          </h1>
          <p className="mt-1 text-lg text-cyan-700 dark:text-cyan-300">{about.personal.occupation}</p>
          <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">{about.summary}</p>
          <ContactChips about={about} contact={contact} />
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl"
            >
              Get in touch
            </Link>
            <SocialIcons socials={contact.socials} size={24} />
          </div>
        </div>
        <div className="flex justify-center md:col-span-2">
          <MotionDiv
            src="/images/ai-image-1.png"
            isCircularBorder
            isTransparentBG
            isRoundedImage
            className="w-[180px] md:w-[220px] lg:w-[260px]"
          />
        </div>
      </section>

      <section className="mx-auto mt-16 grid w-full max-w-6xl gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white">
            My professional skills
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">{about.skills_summary}</p>
        </div>
        <div className="flex flex-col justify-center">
          {about.skill_bars.map((bar) => (
            <SkillBar key={bar.label} label={bar.label} level={bar.level} />
          ))}
        </div>
      </section>

      <ProjectsSection projects={projects} compact />

      <section className="my-16 w-full">
        <AboutDetails about={about} contact={contact} />
      </section>
    </div>
  );
};

export default AboutPage;
