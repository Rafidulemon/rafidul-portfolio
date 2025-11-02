import { NextResponse } from "next/server";
import faqs from "../../data/faqs.json"

export async function POST(req: Request) {
  const { message } = await req.json();
  const userMessage = message.toLowerCase();

  // Find the best match
  const match = faqs.find((faq) =>
    faq.keywords.some((kw) => userMessage.includes(kw))
  );

  const reply =
    match?.answer ||
    "I'm Rafidul Islam, a Software Engineer. I might not fully understand that question — please ask about my skills, projects, or experience.";

  return NextResponse.json({ reply });
}
