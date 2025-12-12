import { NextResponse } from "next/server";
import faqs from "../../data/faqs.json";
import projects from "../../data/projects.json";
import blogs from "../../data/blogs.json";
import skills from "../../data/skills.json";
import services from "../../data/services.json";

export async function POST(req: Request) {
  const { message } = await req.json();
  const userMessage: string = message.toLowerCase();
  const tokenize = (text: string) =>
    text
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.map((token) => token.trim())
      .filter((token) => token.length >= 3) ?? [];

  const stopWords = new Set([
    "the",
    "and",
    "you",
    "your",
    "about",
    "what",
    "how",
    "can",
    "with",
    "for",
    "are",
    "any",
    "give",
    "tell",
    "show",
    "list",
    "some",
    "that",
    "this",
    "who",
    "does",
    "from",
    "when",
    "why",
    "much",
    "more",
    "need",
    "have",
    "help"
  ]);

  const meaningfulTokens = tokenize(message).filter(
    (token) => !stopWords.has(token)
  );

  const containsKeyword = (keywords: string[]) =>
    keywords.some((keyword) => userMessage.includes(keyword));

  const matchByTokens = <T,>(
    items: T[],
    fields: (item: T) => (string | undefined)[]
  ) => {
    if (!meaningfulTokens.length) return [];
    return items.filter((item) => {
      const joinedFields = fields(item)
        .filter(Boolean)
        .map((field) => field!.toLowerCase());
      return joinedFields.some((field) =>
        meaningfulTokens.some((token) => field.includes(token))
      );
    });
  };

  const projectMatches = matchByTokens(
    projects,
    (project) =>
      [
        project.project_title,
        project.project_details,
        project.category,
        project.type,
        project.stack?.join(" "),
      ] as string[]
  );
  const blogMatches = matchByTokens(
    blogs,
    (blog) => [blog.title, blog.description_summary, blog.description]
  );
  const skillMatches = matchByTokens(
    skills,
    (skill) => [skill.skill_name, skill.details, skill.category]
  );
  const serviceMatches = matchByTokens(
    services,
    (service) => [service.service_title, service.service_details]
  );

  const wantsProjects =
    containsKeyword([
      "project",
      "projects",
      "build",
      "portfolio",
      "app",
      "application",
      "work",
    ]) || projectMatches.length > 0;
  const wantsBlogs =
    containsKeyword(["blog", "blogs", "article", "write", "writing", "post"]) ||
    blogMatches.length > 0;
  const wantsSkills =
    containsKeyword([
      "skill",
      "skills",
      "stack",
      "tech stack",
      "technology",
      "experience",
      "expertise",
      "tools",
    ]) || skillMatches.length > 0;
  const wantsServices =
    containsKeyword([
      "service",
      "services",
      "offer",
      "offerings",
      "hire",
      "help me",
      "provide",
      "consult",
    ]) || serviceMatches.length > 0;

  const sections: string[] = [];

  if (wantsProjects) {
    const preferredCategory = userMessage.includes("professional")
      ? "professional"
      : userMessage.includes("personal")
      ? "personal"
      : undefined;
    const filteredProjects = preferredCategory
      ? projects.filter((project) => project.category === preferredCategory)
      : projects;
    const selectedProjects = (projectMatches.length
      ? projectMatches
      : filteredProjects
    ).slice(0, 3);
    if (selectedProjects.length) {
      const formattedProjects = selectedProjects
        .map((project) => {
          const links = [
            project.live_link ? `Live: ${project.live_link}` : "",
            project.github_link ? `GitHub: ${project.github_link}` : "",
          ]
            .filter(Boolean)
            .join(" | ");
          return `• ${project.project_title}: ${project.project_details}${
            links ? ` (${links})` : ""
          }`;
        })
        .join("\n");
      sections.push(`Projects:\n${formattedProjects}`);
    }
  }

  if (wantsBlogs) {
    const selectedBlogs = (blogMatches.length ? blogMatches : blogs).slice(
      0,
      3
    );
    if (selectedBlogs.length) {
      const formattedBlogs = selectedBlogs
        .map(
          (blog) =>
            `• ${blog.title} (${blog.date}): ${blog.description_summary}`
        )
        .join("\n");
      sections.push(`Blogs:\n${formattedBlogs}`);
    }
  }

  if (wantsSkills) {
    const sortedSkills = [...skills].sort(
      (a, b) => b.percentage - a.percentage
    );
    const selectedSkills = (skillMatches.length
      ? skillMatches
      : sortedSkills
    ).slice(0, 5);
    if (selectedSkills.length) {
      const formattedSkills = selectedSkills
        .map(
          (skill) =>
            `• ${skill.skill_name} (${skill.proficiency}, ${skill.years_of_experience}+ yrs): ${skill.details}`
        )
        .join("\n");
      sections.push(`Skills:\n${formattedSkills}`);
    }
  }

  if (wantsServices) {
    const selectedServices = serviceMatches.length ? serviceMatches : services;
    const formattedServices = selectedServices
      .map(
        (service) =>
          `• ${service.service_title}: ${service.service_details}`
      )
      .join("\n");
    sections.push(`Services:\n${formattedServices}`);
  }

  if (sections.length === 0) {
    const match = faqs.find((faq) =>
      faq.keywords.some((kw) => userMessage.includes(kw))
    );
    const reply =
      match?.answer ||
      "I'm Rafidul Islam. Ask me about my projects, blogs, skills, or the services I offer and I'll share more details.";
    return NextResponse.json({ reply });
  }

  const reply = sections.join("\n\n");
  return NextResponse.json({ reply });
}
