import React from "react";
import CodeBlock from "../CodeBlock";

const GenerativeAI: React.FC = () => {
  // --- Reusable code blocks to keep JSX clean ---
  const installOpenAI = `npm install openai`;
  const envExample = `# .env.local
OPENAI_API_KEY=your_api_key_here`;

  const minimalNodeExample = `import OpenAI from "openai";

// Set OPENAI_API_KEY in your environment (e.g., .env.local)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful writing assistant." },
      { role: "user", content: "Write a 120-word intro about Generative AI." }
    ],
  });

  console.log(completion.choices[0].message.content);
}

main().catch(console.error);`;

  const nextApiRoute = `// app/api/generate/route.ts (Next.js 13+ App Router)
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    const text = completion.choices[0].message.content;
    return NextResponse.json({ ok: true, text });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}`;

  const clientFetchExample = `// Example client call from a React component
async function generate(topic: string) {
  const res = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({ prompt: \`Write a 150-word blog section about "\${topic}"\` }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data.text as string;
}`;

  const promptPatterns = `# Prompt Patterns (copy → adapt → iterate)

/*
1) Role + Task + Constraints
*/
"You are a senior technical writer. Write a concise, non-repetitive 200-word
summary of Generative AI for beginners. Use short paragraphs and avoid jargon."

/*
2) Few-shot (give examples)
*/
"Rewrite the paragraph in a friendly tone. Example:
Input: 'Generative AI is complex.'
Output: 'Generative AI helps computers create new things.'

Now rewrite:
<your text here>"

/*
3) Chain-of-Thought Hints (no private reasoning leakage in production)
*/
"List the key points you will cover (bullets), then write a 2-paragraph explanation."

/*
4) Output Formatting
*/
"Return JSON with keys: title (string), bullets (string[]), summary (string, ~120 words)."
`;

  const ragSketch = `// RAG (Retrieval-Augmented Generation) sketch (Node/TypeScript)
// 1) Embed documents → store vectors
// 2) On user query → embed query → similarity search → provide top-k snippets to the model

import OpenAI from "openai";
// For demo purposes, let's simulate an in-memory vector store
// In production, use Pinecone, Weaviate, pgvector, or Supabase Vector.

type Doc = { id: string; text: string; embedding: number[] };
const docs: Doc[] = [];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedText(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

function cosineSim(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function addDocument(id: string, text: string) {
  const embedding = await embedText(text);
  docs.push({ id, text, embedding });
}

async function ragAnswer(question: string) {
  const qEmbed = await embedText(question);
  const ranked = docs
    .map(d => ({ d, score: cosineSim(qEmbed, d.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // top-k

  const context = ranked.map(r => \`[Doc \${r.d.id}] \${r.d.text}\`).join("\\n\\n");

  const prompt = \`Use ONLY the following context to answer. If unsure, say "I don't know".\\n\\nContext:\\n\${context}\\n\\nQuestion: \${question}\`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return completion.choices[0].message.content;
}

// Usage (one-time indexing then query):
// await addDocument("policy-001", "New employees receive 12 days of vacation.");
// console.log(await ragAnswer("How many vacation days do new employees get?"));
`;

  const samplingControls = `// Generation controls (OpenAI Chat Completions)
const result = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Write 3 alternative taglines for a GenAI blog." }],
  temperature: 0.9,      // higher = more diverse/creative
  top_p: 1,               // nucleus sampling (keep top cumulative probability)
  frequency_penalty: 0.2, // discourage repeating words
  presence_penalty: 0.3,  // encourage introducing new topics
});`;

  const safetyChecklist = `# Safety & Quality Checklist (copy this into your README)
- [ ] Add system prompts that set tone, audience, and boundaries.
- [ ] Validate model outputs (length, format, JSON schemas).
- [ ] Add "use only provided context" instruction for RAG answers.
- [ ] Log prompts + responses (with redaction) for QA.
- [ ] Add rate limits and request timeouts.
- [ ] Handle null/empty responses and upstream errors.
- [ ] Provide a feedback button for users to flag issues.
- [ ] Disclose AI usage and obtain consent where required.`;

  return (
    <article className="flex flex-col gap-2 md:gap-4">
      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          🧭 What Is Generative AI?
        </h2>
        <p>
          <strong>Generative AI</strong> is a branch of artificial intelligence
          that <em>creates new content</em> — text, images, code, music, and
          more. Unlike traditional AI that labels or classifies, generative
          models learn patterns from data and then produce original outputs that
          feel human-made.
        </p>
        <div className="flex flex-col gap-1 md:gap2">
          <p>
            <strong>Generative AI</strong> = AI that creates new content, not
            just analyzes existing data.
          </p>
          <p>
            Traditional AI decides <i>what something is</i> → classification.
          </p>
          <p>
            Generative AI decides <i>what to make next</i> → creation.
          </p>
        </div>
        <div>
          <p className="mb-1 md:mb-2">
            <strong>Example:</strong>
          </p>
          <ul>
            <p>Traditional AI → “This is a cat.”</p>
            <p>Generative AI → “Draw a cat in space wearing a spacesuit.”</p>
          </ul>
        </div>
        <div className="bg-gray-50 border rounded-xl p-2 md:p-4 text-gray-800 whitespace-normal">
          <p>
            🔍 <strong>Think of it as a super-smart autocomplete:</strong> it
            predicts the next most likely word, pixel, or note, step by step,
            until a complete piece emerges.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          🧠 How It Works (Plain-English Mechanics)
        </h2>
        <ol className="list-decimal pl-6 flex flex-col gap-1 md:gap2">
          <li>
            <div className="flex flex-col gap-1">
              <span className="font-[600]">Tokens → Numbers</span>
              <span>
                Text is split into small units called tokens (words or
                sub-words) and then converted into vectors (numbers).
              </span>
              <span>
                Example: “AI is powerful” → 12 , 45 , 78 , 93 12,45,78,93.
              </span>
            </div>
          </li>
          <li>
            <div className="flex flex-col gap-1">
              <span className="font-[600]">Embeddings → Meaning</span>
              <span>
                Each vector captures meaning — so similar words live close
                together in vector space.
              </span>
              <span>(“cat” ≈ “dog”, but far from “keyboard”.) </span>
            </div>
          </li>

          <li>
            <div className="flex flex-col gap-1">
              <span className="font-[600]">
                Transformer → Context Understanding
              </span>
              <span>
                The Transformer architecture (used in GPT, Claude, Gemini) lets
                the model see all previous tokens at once through
                “self-attention.”
              </span>
              <span>
                It decides which words matter most to predict the next one.
              </span>
              <span>
                Example: In “The cat sat on the mat because it was tired,” the
                model knows “it” refers to “cat.”
              </span>
            </div>
          </li>

          <li>
            <div className="flex flex-col gap-1">
              <span className="font-[600]">
                Autoregressive Prediction → Generation
              </span>
              <span>
                The model predicts one token at a time based on probability and
                adds it to the sequence to form a sentence or paragraph.
              </span>
            </div>
          </li>
        </ol>
        <p>
          That’s why it’s called <strong>“next-token prediction”</strong> — the
          simple rule that builds whole books, code, and conversations.
        </p>
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          ⚙️ The Training Mindset
        </h2>
        <p>
          Generative models are trained with self-supervised learning on massive
          datasets (text, images, code). They learn patterns like:
        </p>
        <div className="bg-gray-900 p-1 md:p-2 text-gray-100 rounded-lg border border-gray-800 whitespace-normal">
          <p>
            “After ‘I love to drink’, words like ‘coffee’, ‘tea’, ‘water’ often
            follow.”
          </p>
        </div>
        <p>When you give a prompt, the model uses that probability knowledge to predict what comes next.</p>
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          🧱 The Building Blocks of Generative AI
        </h2>
        <table>
            <tr className="border border-[1px] border-gray-500 bg-gray-900 text-white">
                <td className="border-r border-[1px] border-gray-500 px-2">Layer</td>
                <td className="border-r border-[1px] border-gray-500 px-2">Role</td>
                <td className="px-2">Example</td>
            </tr>
            <tr className="border border-[1px] border-gray-500">
                <td className="border-r border-[1px] border-gray-500 px-2">Foundation Model</td>
                <td className="border-r border-[1px] border-gray-500 px-2">Core reasoning engine</td>
                <td className="px-2">GPT-4, Claude, Gemini</td>
            </tr>
            <tr className="border border-[1px] border-gray-500">
                <td className="border-r border-[1px] border-gray-500 px-2">Interface Layer</td>
                <td className="border-r border-[1px] border-gray-500 px-2">Prompt engineering, API</td>
                <td className="px-2">ChatGPT UI, SDKs</td>
            </tr>
            <tr className="border border-[1px] border-gray-500">
                <td className="border-r border-[1px] border-gray-500 px-2">Retrieval Layer (RAG)</td>
                <td className="border-r border-[1px] border-gray-500 px-2">Add your data</td>
                <td className="px-2">Company docs, DB</td>
            </tr>
            <tr className="border border-[1px] border-gray-500">
                <td className="border-r border-[1px] border-gray-500 px-2">Application Layer</td>
                <td className="border-r border-[1px] border-gray-500 px-2">Final product</td>
                <td className="px-2">Chatbot, Copilot, Writer tool</td>
            </tr>
        </table>
    </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Where We Use Generative AI
        </h2>
        <ul>
          <li>
            <strong>Writing & Education:</strong> blog posts, summaries,
            tutoring
          </li>
          <li>
            <strong>Design & Media:</strong> images, brand drafts, storyboards
          </li>
          <li>
            <strong>Software:</strong> code completion, refactors, test
            generation
          </li>
          <li>
            <strong>Customer Support:</strong> smart replies, FAQ assistants
          </li>
          <li>
            <strong>Research & Ops:</strong> drafting reports, data explanations
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">Install the OpenAI SDK</h2>
        <p>Use the official Node SDK in your Next.js project:</p>
        <CodeBlock code={installOpenAI} language="bash" fileName="Terminal" />
        <p>
          Add your API key to <code>.env.local</code>:
        </p>
        <CodeBlock code={envExample} language="bash" fileName="Terminal" />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Minimal Node Example (Text Generation)
        </h2>
        <p>This script prints a short Generative AI intro to your console:</p>
        <CodeBlock
          code={minimalNodeExample}
          language="bash"
          fileName="Terminal"
        />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Next.js API Route + Client Fetch
        </h2>
        <p>
          Create a clean server boundary for generation and call it from your
          UI.
        </p>

        <h3 className="mt-4">API Route</h3>
        <CodeBlock code={nextApiRoute} language="bash" fileName="Terminal" />

        <h3 className="mt-4">Client Helper</h3>
        <CodeBlock
          code={clientFetchExample}
          language="bash"
          fileName="Terminal"
        />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Prompt Engineering — Patterns That Work
        </h2>
        <p>Clear, structured prompts drastically improve output quality.</p>
        <CodeBlock code={promptPatterns} language="bash" fileName="Terminal" />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          RAG (Retrieval-Augmented Generation) — Make Answers Factual
        </h2>
        <p>
          RAG combines generation with search over your own documents. The model
          uses retrieved context to ground its response, reducing
          hallucinations.
        </p>
        <CodeBlock code={ragSketch} language="bash" fileName="Terminal" />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Controlling Style & Creativity
        </h2>
        <p>
          Use sampling controls to tune outputs for precision vs. creativity.
        </p>
        <CodeBlock
          code={samplingControls}
          language="bash"
          fileName="Terminal"
        />
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Limitations (and How to Mitigate)
        </h2>
        <ul>
          <li>
            <strong>Hallucinations:</strong> Ground with RAG; add instructions
            like “use only provided context”.
          </li>
          <li>
            <strong>Inconsistent format:</strong> Ask for strict JSON and
            validate on the server.
          </li>
          <li>
            <strong>Latency & cost:</strong> Cache frequent prompts; stream
            tokens; pick smaller models when possible.
          </li>
          <li>
            <strong>Privacy:</strong> Don’t send secrets; redact logs; follow
            your data policy.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-l md:text-xl font-[600]">
          Safety & Quality Checklist
        </h2>
        <CodeBlock code={safetyChecklist} language="bash" fileName="Terminal" />
      </section>
    </article>
  );
};

export default GenerativeAI;
