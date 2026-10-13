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
        data bytea,
        created_at timestamptz not null default now()
      )`;
      // Uploads now live in R2; only the object key is kept here. `data` is only set on legacy rows.
      await sql`alter table media add column if not exists key text`;
      await sql`alter table media alter column data drop not null`;
      await sql`create table if not exists messages (
        id uuid primary key default gen_random_uuid(),
        name text not null,
        email text not null,
        subject text not null,
        body text not null,
        status text not null default 'new',
        intent text not null default 'other',
        urgency text not null default 'normal',
        summary text not null default '',
        draft text not null default '',
        created_at timestamptz not null default now(),
        read_at timestamptz
      )`;
      await sql`create index if not exists messages_created_idx on messages (created_at desc)`;
      await sql`create table if not exists message_replies (
        id uuid primary key default gen_random_uuid(),
        message_id uuid not null references messages(id) on delete cascade,
        to_email text not null,
        subject text not null,
        body text not null,
        created_at timestamptz not null default now()
      )`;
      await sql`create index if not exists message_replies_msg_idx on message_replies (message_id, created_at)`;
      await sql`create table if not exists page_views (
        id bigserial primary key,
        visitor_id text not null,
        session_id text not null,
        path text not null,
        referrer text not null default '',
        referrer_host text not null default '',
        source text not null default 'internal',
        utm_source text not null default '',
        utm_medium text not null default '',
        utm_campaign text not null default '',
        country text not null default '',
        region text not null default '',
        city text not null default '',
        device text not null default '',
        browser text not null default '',
        os text not null default '',
        language text not null default '',
        screen text not null default '',
        ip_hash text not null default '',
        created_at timestamptz not null default now()
      )`;
      await sql`create index if not exists page_views_created_idx on page_views (created_at desc)`;
      await sql`create index if not exists page_views_visitor_idx on page_views (visitor_id)`;
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
