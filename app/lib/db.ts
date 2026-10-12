import { neon, neonConfig } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

export const dbEnabled = Boolean(url);

// Neon's HTTP driver is built on fetch(). Next.js 14 patches the global fetch to add its
// Data Cache, and a patched "no-store" fetch makes static pages bail out as "dynamic"
// (silently baking in fallback data). Freshness is already handled by unstable_cache tags
// and revalidation, so the driver uses Next's original, unpatched fetch instead.
neonConfig.fetchFunction = (input: RequestInfo | URL, init?: RequestInit) => {
  const original = (globalThis.fetch as typeof fetch & { _nextOriginalFetch?: typeof fetch })
    ._nextOriginalFetch;
  return (original ?? globalThis.fetch)(input, { ...init, cache: "no-store" });
};

export const sql = neon(url ?? "postgresql://unset:unset@localhost/unset");

let schemaPromise: Promise<void> | null = null;

/** Creates tables on first use. Safe to call repeatedly (memoized per instance). */
export function ensureSchema(): Promise<void> {
  if (!dbEnabled) return Promise.reject(new Error("DATABASE_URL is not set"));
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`create table if not exists site_content (
        key text primary key,
        data jsonb not null,
        updated_at timestamptz not null default now()
      )`;
      await sql`create table if not exists blog_posts (
        id serial primary key,
        slug text unique not null,
        title text not null,
        summary text not null default '',
        content text not null default '',
        cover text not null default '',
        tags text[] not null default '{}',
        author text not null default '',
        status text not null default 'draft',
        published_at timestamptz,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )`;
      await sql`create table if not exists media (
        id uuid primary key default gen_random_uuid(),
        mime text not null,
        size int not null,
        name text not null default '',
        data bytea not null,
        created_at timestamptz not null default now()
      )`;
      await sql`create table if not exists doc_embeddings (
        uid text primary key,
        hash text not null,
        vec jsonb not null
      )`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}
