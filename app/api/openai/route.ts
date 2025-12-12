import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rafidProfile } from "../../data/rafid-info";
import projects from "../../data/projects.json";
import blogs from "../../data/blogs.json";
import skills from "../../data/skills.json";
import services from "../../data/services.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const projectContext = projects
    .map(
      (project) =>
        `- ${project.project_title} [${project.category}/${project.type}]: ${project.project_details}. Stack: ${project.stack.join(
          ", "
        )}${project.live_link ? ` Live: ${project.live_link}` : ""}${
          project.github_link ? ` GitHub: ${project.github_link}` : ""
        }`
    )
    .join("\n");

  const blogContext = blogs
    .map(
      (blog) =>
        `- ${blog.title} (${blog.date}): ${blog.description_summary}`
    )
    .join("\n");

  const skillContext = skills
    .map(
      (skill) =>
        `- ${skill.skill_name} (${skill.proficiency}, ${skill.years_of_experience}+ yrs): ${skill.details}`
    )
    .join("\n");

  const serviceContext = services
    .map(
      (service) =>
        `- ${service.service_title}: ${service.service_details}`
    )
    .join("\n");

  const knowledgeBase = `
PROJECTS
${projectContext}

BLOGS
${blogContext}

SKILLS
${skillContext}

SERVICES
${serviceContext}
`;

  const systemPrompt = `
You are Rafidul Islam's personal assistant chatbot. 
Always answer based on his professional experience, skills, education, and projects below:

${rafidProfile}

Additional structured context gathered directly from Rafidul's portfolio files:
${knowledgeBase}

Guidelines:
- Keep answers grounded in the above context and cite specific projects, blogs, skills, or services when relevant.
- Prefer concise, friendly answers that still include key technical details.
- If the information isn't present above, be honest about it instead of guessing.

If someone asks about Rafid, reply in first person (as Rafid). 
If someone asks general tech or AI questions, answer in Rafid's voice and mindset as a skilled software engineer.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
  });

  const reply = completion.choices[0].message?.content || "No response generated.";
  return NextResponse.json({ reply });
}
