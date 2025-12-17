import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rafidProfile } from "../../data/rafid-info";
import projects from "../../data/projects.json";
import blogs from "../../data/blogs.json";
import skills from "../../data/skills.json";
import services from "../../data/services.json";
import contactInfo from "../../data/contact.json";

type ContactSocial = {
  platform: string;
  handle?: string;
  url: string;
};

type ContactInfo = {
  full_name?: string;
  title?: string;
  location?: string;
  time_zone?: string;
  email?: string;
  phone_primary?: string;
  phone_secondary?: string;
  availability?: string;
  preferred_contact_methods?: string[];
  response_time?: string;
  office_hours?: string;
  portfolio_url?: string;
  socials?: ContactSocial[];
};

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
  const contactDetails = contactInfo as ContactInfo;

  const socialLinks =
    contactDetails.socials && contactDetails.socials.length > 0
      ? contactDetails.socials
          .map((social) => {
            const handlePart = social.handle ? ` (${social.handle})` : "";
            return `  - ${social.platform}${handlePart}: ${social.url}`;
          })
          .join("\n")
      : "  - No social profiles provided.";

  const preferredContacts =
    contactDetails.preferred_contact_methods?.join(", ") ?? "email";

  const contactContextLines = [
    `- Name: ${contactDetails.full_name ?? "Md. Rafidul Islam"}`,
    `- Role: ${contactDetails.title ?? "Software Engineer"}`,
    `- Location: ${contactDetails.location ?? "Dhaka, Bangladesh"}`,
    `- Time Zone: ${
      contactDetails.time_zone ?? "GMT+6 (Bangladesh Standard Time)"
    }`,
    `- Email: ${contactDetails.email ?? "rafidulemon@gmail.com"}`,
    `- Primary Phone: ${
      contactDetails.phone_primary ?? "+8801990497796"
    }`,
    contactDetails.phone_secondary
      ? `- Secondary Phone: ${contactDetails.phone_secondary}`
      : "",
    `- Availability: ${
      contactDetails.availability ?? "Open to new opportunities."
    }`,
    `- Preferred Contact Methods: ${preferredContacts}`,
    `- Typical Response Time: ${
      contactDetails.response_time ?? "Replies within 24 hours."
    }`,
    `- Office Hours: ${
      contactDetails.office_hours ?? "Weekdays 09:00–18:00 BST."
    }`,
    `- Portfolio: ${
      contactDetails.portfolio_url ??
      "https://rafidul-portfolio.vercel.app"
    }`,
    "- Social Profiles:",
    socialLinks,
  ];

  const contactContext = contactContextLines
    .filter((line): line is string => Boolean(line))
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

CONTACT
${contactContext}
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
