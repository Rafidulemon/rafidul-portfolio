import { unstable_cache } from "next/cache";
import { embedTexts } from "./llm";
import embeddingsFile from "../../data/embeddings.json";
import { dbEnabled, ensureSchema, sql } from "../db";
import { getContent, getContentForAdmin } from "../content/store";
import { getPublicBlogs, getPublicBlogsFresh, type PublicBlog } from "../blog/store";
import type { ContactInfo, ProjectInfo, ServiceInfo, SiteInfo, SkillInfo } from "@/types/content";

export type DocKind = "project" | "blog" | "skill" | "service" | "profile";

export type Doc = {
  uid: string;
  id: string;
  kind: DocKind;
  title: string;
  text: string;
  href: string;
  /** Short human-readable description for UI (search results). */
  summary?: string;
  /** Small secondary label for UI (stack, date, level). */
  meta?: string;
};

export type Scored = Doc & { score: number };

export type Sources = {
  projects: ProjectInfo[];
  skills: SkillInfo[];
  services: ServiceInfo[];
  contact: ContactInfo;
  info: SiteInfo;
  blogs: PublicBlog[];
};

export type Knowledge = {
  docs: Doc[];
  /** Always-on facts. Phone numbers are intentionally left out of LLM prompts. */
  core: string;
  /** Compact list of every project/blog id so the model can always cite a card. */
  catalog: string;
  /** Everything, for tasks like job matching that need the full picture. */
  full: string;
  projectIds: number[];
  blogIds: string[];
};

const stripPhones = (s: string) => s.replace(/\+?\d[\d\s-]{8,}\d/g, "[phone on contact page]");

const profileChunks = (profile: string): Doc[] => {
  const blocks = profile
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const merged: string[] = [];
  blocks.forEach((block) => {
    const last = merged[merged.length - 1];
    if (last && last.length < 350) merged[merged.length - 1] = `${last}\n${block}`;
    else merged.push(block);
  });
  return merged.map((text, i) => ({
    uid: `profile:${i}`,
    id: String(i),
    kind: "profile" as const,
    title: "About Rafid",
    text: stripPhones(text),
    href: "/about",
  }));
};

/** Pure: turns site content into searchable documents + prompt context. */
export function buildKnowledge(src: Sources): Knowledge {
  const { projects, skills, services, contact, info, blogs } = src;

  const docs: Doc[] = [
    ...projects.map((p) => ({
      uid: `project:${p.id}`,
      id: String(p.id),
      kind: "project" as const,
      title: p.project_title,
      text: `${p.project_title} [${p.category}/${p.type}]: ${p.project_details} Stack: ${(p.stack ?? []).join(", ")}.`,
      href: p.live_link || p.github_link || "/projects",
      summary: p.project_details,
      meta: (p.stack ?? []).slice(0, 4).join(" · "),
    })),
    ...blogs.map((b) => ({
      uid: `blog:${b.id}`,
      id: b.id,
      kind: "blog" as const,
      title: b.title,
      text: `${b.title} (${b.date}): ${b.description_summary}`,
      href: `/blogs/${b.id}`,
      summary: b.description_summary,
      meta: b.date,
    })),
    ...skills.map((s) => ({
      uid: `skill:${s.id}`,
      id: String(s.id),
      kind: "skill" as const,
      title: s.skill_name,
      text: `${s.skill_name} (${s.proficiency}, ${s.years_of_experience}+ yrs, ${s.category}): ${s.details}`,
      href: "/about",
      summary: s.details,
      meta: `${s.proficiency} · ${s.years_of_experience}+ yrs`,
    })),
    ...services.map((s) => ({
      uid: `service:${s.id}`,
      id: String(s.id),
      kind: "service" as const,
      title: s.service_title,
      text: `${s.service_title}: ${s.service_details}`,
      href: "/services",
      summary: s.tagline,
      meta: s.tech.slice(0, 3).join(" · "),
    })),
    ...profileChunks(info.profile),
  ];

  const socials = contact.socials.map((s) => `${s.platform}: ${s.url}`).join("; ");
  const core = [
    `Name: ${contact.full_name}`,
    `Role: ${contact.title}`,
    `Location: ${contact.location} (${contact.time_zone})`,
    `Email: ${contact.email}`,
    `Availability: ${contact.availability}`,
    `Response time: ${contact.response_time}`,
    `Contact form: /contact on this site (phone is listed there, never share phone numbers in chat)`,
    `Socials: ${socials}`,
  ].join("\n");

  const catalog = [
    "PROJECT IDS: " + projects.map((p) => `[project:${p.id}] ${p.project_title}`).join("; "),
    "BLOG IDS: " + blogs.map((b) => `[blog:${b.id}] ${b.title}`).join("; "),
  ].join("\n");

  const full = [
    core,
    "PROFILE:\n" + stripPhones(info.profile),
    "PROJECTS:\n" +
      projects
        .map(
          (p) =>
            `- [project:${p.id}] ${p.project_title} (${p.category}): ${p.project_details} Stack: ${(p.stack ?? []).join(", ")}`
        )
        .join("\n"),
    "SKILLS:\n" +
      skills
        .map((s) => `- ${s.skill_name} (${s.proficiency}, ${s.years_of_experience}+ yrs)`)
        .join("\n"),
  ].join("\n\n");

  return {
    docs,
    core,
    catalog,
    full,
    projectIds: projects.map((p) => p.id),
    blogIds: blogs.map((b) => b.id),
  };
}

async function loadSources(): Promise<Sources> {
  const [projects, skills, services, contact, info, blogs] = await Promise.all([
    getContent("projects"),
    getContent("skills"),
    getContent("services"),
    getContent("contact"),
    getContent("info"),
    getPublicBlogs(),
  ]);
  return { projects, skills, services, contact, info, blogs };
}

/** Same as loadSources but bypasses the cache, so it sees an admin save made moments ago. */
async function loadSourcesFresh(): Promise<Sources> {
  const [projects, skills, services, contact, info, blogs] = await Promise.all([
    getContentForAdmin("projects"),
    getContentForAdmin("skills"),
    getContentForAdmin("services"),
    getContentForAdmin("contact"),
    getContentForAdmin("info"),
    getPublicBlogsFresh(),
  ]);
  return {
    projects: projects.data,
    skills: skills.data,
    services: services.data,
    contact: contact.data,
    info: info.data,
    blogs,
  };
}

/** Live knowledge from the database (cached; refreshed when the admin saves). */
export const getKnowledge = unstable_cache(
  async () => buildKnowledge(await loadSources()),
  ["knowledge"],
  { tags: ["content", "blogs"], revalidate: 300 }
);

// ---------- retrieval ----------

const STOP = new Set(
  "the and you your about what how can with for are any give tell show list some that this who does from when why much more need have help his her him did was were has had not but all out".split(
    " "
  )
);
const tokenize = (t: string) =>
  (t.toLowerCase().match(/[a-z0-9+#.]+/g) ?? []).filter((w) => w.length >= 2 && !STOP.has(w));

const keywordScore = (query: string, doc: Doc) => {
  const q = tokenize(query);
  if (!q.length) return 0;
  const hay = `${doc.title} ${doc.text}`.toLowerCase();
  const title = doc.title.toLowerCase();
  let score = 0;
  q.forEach((w) => {
    if (title.includes(w)) score += 2;
    if (hay.includes(w)) score += 1;
  });
  return score / (q.length * 3);
};

const cosine = (a: number[], b: number[]) => {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
};

type VectorMap = Record<string, { h: string; v: number[] }>;

// FNV-1a: tiny stable hash used to detect stale stored embeddings.
export const docHash = (text: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
};

// Two layers of precomputed embeddings, so only the visitor's query is embedded at runtime:
//  1. embeddings.json: baseline for the shipped content (`npm run embed`)
//  2. doc_embeddings table: new/edited content, filled automatically when the admin saves
const baseline = (embeddingsFile as { items: VectorMap }).items;
let dbVectors: { at: number; map: VectorMap } | null = null;

async function loadDbVectors(): Promise<VectorMap> {
  if (!dbEnabled) return {};
  if (dbVectors && Date.now() - dbVectors.at < 5 * 60_000) return dbVectors.map;
  try {
    await ensureSchema();
    const rows = await sql`select uid, hash, vec from doc_embeddings`;
    const map: VectorMap = {};
    rows.forEach((r) => (map[r.uid as string] = { h: r.hash as string, v: r.vec as number[] }));
    dbVectors = { at: Date.now(), map };
    return map;
  } catch (error) {
    console.error("[ai] loading stored embeddings failed:", error);
    return dbVectors?.map ?? {};
  }
}

const vectorFor = (doc: Doc, overlay: VectorMap): number[] | null => {
  const h = docHash(doc.text);
  const fromDb = overlay[doc.uid];
  if (fromDb && fromDb.h === h) return fromDb.v;
  const base = baseline[doc.uid];
  return base && base.h === h ? base.v : null;
};

/** Embeds any documents that have no up-to-date vector yet. Called after admin saves. */
export async function syncEmbeddings(): Promise<{ embedded: number; skipped: number }> {
  if (!dbEnabled || !process.env.GEMINI_API_KEY) return { embedded: 0, skipped: 0 };
  dbVectors = null;
  const [{ docs }, overlay] = await Promise.all([
    buildKnowledge(await loadSourcesFresh()),
    loadDbVectors(),
  ]);
  const missing = docs.filter((d) => !vectorFor(d, overlay));
  if (missing.length === 0) return { embedded: 0, skipped: 0 };

  // Cap per sync to stay inside the free embedding quota; the rest follow on the next save.
  const batch = missing.slice(0, 40);
  const vectors = await embedTexts(batch.map((d) => d.text), { timeout: 25000 });
  if (!vectors) return { embedded: 0, skipped: missing.length };
  await ensureSchema();
  for (let i = 0; i < batch.length; i++) {
    const vec = JSON.stringify(vectors[i].map((n) => Math.round(n * 1e4) / 1e4));
    await sql`insert into doc_embeddings (uid, hash, vec) values (${batch[i].uid}, ${docHash(batch[i].text)}, ${vec}::jsonb)
              on conflict (uid) do update set hash = excluded.hash, vec = excluded.vec`;
  }
  dbVectors = null;
  return { embedded: batch.length, skipped: missing.length - batch.length };
}

export async function retrieve(
  query: string,
  k = 6,
  kinds?: DocKind[],
  opts: { semantic?: boolean; cutoff?: boolean } = {}
): Promise<Scored[]> {
  const knowledge = await getKnowledge();
  const pool = knowledge.docs.filter((doc) => !kinds || kinds.includes(doc.kind));

  let queryVector: number[] | null = null;
  let overlay: VectorMap = {};
  // Semantic mode costs one embedding round trip (~1.5s), so latency-sensitive
  // callers (chat) can opt out and use instant keyword retrieval instead.
  if (opts.semantic !== false) {
    overlay = await loadDbVectors();
    try {
      queryVector = (await embedTexts([query], { timeout: 2500 }))?.[0] ?? null;
    } catch (error) {
      console.error("[ai] embedding query failed, using keyword search:", error);
    }
  }

  const scored = pool.map((doc) => {
    const keyword = keywordScore(query, doc);
    const vector = queryVector ? vectorFor(doc, overlay) : null;
    // Blend so exact keyword hits ("tRPC") still win when embeddings are fuzzy.
    const score =
      vector && queryVector ? cosine(queryVector, vector) + keyword * 0.25 : keyword * 0.5;
    return { ...doc, score };
  });

  const ranked = scored.sort((a, b) => b.score - a.score);
  if (!opts.cutoff) return ranked.slice(0, k);

  // Drop noise for UI search. Embedding scores for gibberish sit around 0.45-0.51
  // and real matches start near 0.53, so require a floor plus a window below the top hit.
  const top = ranked[0]?.score ?? 0;
  if (queryVector) {
    if (top < 0.53) return [];
    return ranked.filter((r) => r.score >= 0.5 && r.score >= top - 0.25).slice(0, k);
  }
  return ranked.filter((r) => r.score > 0).slice(0, k);
}
