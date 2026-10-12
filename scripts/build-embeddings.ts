// Precomputes the baseline embeddings (app/data/embeddings.json) for the content the
// site ships with. Content edited later in the admin panel is embedded automatically on
// save, so this only needs re-running if you change the files in app/data by hand:
//   npm run embed
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { buildKnowledge, docHash } from "../app/lib/ai/knowledge";
import { embedTexts, EMBEDDING_MODEL } from "../app/lib/ai/llm";
import { DEFAULTS } from "../app/lib/content/defaults";
import blogs from "../app/data/blogs.json";

async function main() {
  const { docs } = buildKnowledge({
    projects: DEFAULTS.projects,
    skills: DEFAULTS.skills,
    services: DEFAULTS.services,
    contact: DEFAULTS.contact,
    info: DEFAULTS.info,
    blogs: blogs.map((b) => ({
      id: String(b.id),
      kind: "legacy" as const,
      title: b.title,
      date: b.date,
      dateISO: new Date(b.date).toISOString(),
      description_summary: b.description_summary,
      image: b.image,
      author: b.author,
      tags: [],
    })),
  });

  const vectors = await embedTexts(docs.map((d) => d.text));
  if (!vectors) throw new Error("GEMINI_API_KEY is missing; cannot build embeddings.");
  const items: Record<string, { h: string; v: number[] }> = {};
  docs.forEach((doc, i) => {
    items[doc.uid] = {
      h: docHash(doc.text),
      v: vectors[i].map((n) => Math.round(n * 1e4) / 1e4),
    };
  });
  writeFileSync("app/data/embeddings.json", JSON.stringify({ model: EMBEDDING_MODEL, items }));
  console.log(`Embedded ${docs.length} documents.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
