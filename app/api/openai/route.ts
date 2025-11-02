import { NextResponse } from "next/server";
import OpenAI from "openai";
import { rafidProfile } from "../../data/rafid-info";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const systemPrompt = `
You are Rafidul Islam's personal assistant chatbot. 
Always answer based on his professional experience, skills, education, and projects below:

${rafidProfile}

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
