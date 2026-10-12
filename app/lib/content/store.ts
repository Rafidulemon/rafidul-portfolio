import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { dbEnabled, ensureSchema, sql } from "../db";
import { CONTENT_KEYS, DEFAULTS, type ContentKey, type ContentMap } from "./defaults";
import { SCHEMAS } from "./schemas";

export const isContentKey = (k: string): k is ContentKey =>
  (CONTENT_KEYS as string[]).includes(k);

async function readRow<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  if (!dbEnabled) return DEFAULTS[key];
  try {
    await ensureSchema();
    const rows = await sql`select data from site_content where key = ${key}`;
    if (rows.length === 0) return DEFAULTS[key];
    const parsed = SCHEMAS[key].safeParse(rows[0].data);
    if (!parsed.success) {
      console.error(
        `[content] stored "${key}" failed validation, using defaults`,
        parsed.error.issues[0]
      );
      return DEFAULTS[key];
    }
    return parsed.data as ContentMap[K];
  } catch (error) {
    // The public site must never go down because the database did.
    console.error(`[content] read "${key}" failed, using defaults:`, error);
    return DEFAULTS[key];
  }
}

/** Public read: cached, revalidated when the admin saves. */
export function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  return unstable_cache(() => readRow(key), ["content", key], {
    tags: [`content:${key}`, "content"],
    revalidate: 300,
  })();
}

/** Admin read: always fresh, and says whether the section has been customised. */
export async function getContentForAdmin<K extends ContentKey>(
  key: K
): Promise<{ data: ContentMap[K]; customized: boolean; updatedAt: string | null }> {
  await ensureSchema();
  const rows = await sql`select data, updated_at from site_content where key = ${key}`;
  if (rows.length === 0) return { data: DEFAULTS[key], customized: false, updatedAt: null };
  const parsed = SCHEMAS[key].safeParse(rows[0].data);
  return {
    data: (parsed.success ? parsed.data : DEFAULTS[key]) as ContentMap[K],
    customized: parsed.success,
    updatedAt: new Date(rows[0].updated_at).toISOString(),
  };
}

export async function saveContent<K extends ContentKey>(key: K, data: unknown) {
  const parsed = SCHEMAS[key].safeParse(data);
  if (!parsed.success) return { ok: false as const, issues: parsed.error.issues };
  await ensureSchema();
  const json = JSON.stringify(parsed.data);
  await sql`insert into site_content (key, data, updated_at) values (${key}, ${json}::jsonb, now())
            on conflict (key) do update set data = excluded.data, updated_at = now()`;
  revalidateContent(key);
  return { ok: true as const, data: parsed.data as ContentMap[K] };
}

export async function resetContent(key: ContentKey) {
  await ensureSchema();
  await sql`delete from site_content where key = ${key}`;
  revalidateContent(key);
}

export function revalidateContent(key?: ContentKey) {
  if (key) revalidateTag(`content:${key}`);
  revalidateTag("content");
  revalidatePath("/", "layout");
}

export async function contentStatus() {
  if (!dbEnabled) return {} as Record<string, string>;
  await ensureSchema();
  const rows = await sql`select key, updated_at from site_content`;
  return Object.fromEntries(
    rows.map((r) => [r.key as string, new Date(r.updated_at).toISOString()])
  );
}
