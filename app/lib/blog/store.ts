import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { dbEnabled, ensureSchema, sql } from "../db";
import legacyBlogs from "../../data/blogs.json";
import { getContent, getContentForAdmin } from "../content/store";
import { blogPostInput } from "../content/schemas";
import type { BlogPost } from "@/types/content";

export type PublicBlog = {
  id: string; // legacy: "1".."20"; admin-written: the slug
  kind: "legacy" | "db";
  title: string;
  date: string; // display, e.g. "25 January, 2025"
  dateISO: string;
  description_summary: string;
  image: string;
  author: string;
  tags: string[];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const displayDate = (d: Date) =>
  `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}, ${d.getUTCFullYear()}`;

const rowToPost = (r: Record<string, unknown>): BlogPost => ({
  id: Number(r.id),
  slug: String(r.slug),
  title: String(r.title),
  summary: String(r.summary ?? ""),
  content: String(r.content ?? ""),
  cover: String(r.cover ?? ""),
  tags: (r.tags as string[]) ?? [],
  author: String(r.author ?? ""),
  status: r.status === "published" ? "published" : "draft",
  published_at: r.published_at ? new Date(r.published_at as string).toISOString() : null,
  created_at: new Date(r.created_at as string).toISOString(),
  updated_at: new Date(r.updated_at as string).toISOString(),
});

const legacyToPublic = (b: (typeof legacyBlogs)[number]): PublicBlog => ({
  id: String(b.id),
  kind: "legacy",
  title: b.title,
  date: b.date,
  dateISO: new Date(b.date).toISOString(),
  description_summary: b.description_summary,
  image: b.image,
  author: b.author,
  tags: [],
});

const postToPublic = (p: BlogPost): PublicBlog => {
  const d = new Date(p.published_at ?? p.created_at);
  return {
    id: p.slug,
    kind: "db",
    title: p.title,
    date: displayDate(d),
    dateISO: d.toISOString(),
    description_summary: p.summary,
    image: p.cover,
    author: p.author,
    tags: p.tags,
  };
};

export const isLegacyId = (id: string) => /^\d+$/.test(id);

async function buildPublicBlogs(fresh = false): Promise<PublicBlog[]> {
  const meta = fresh ? (await getContentForAdmin("blog_meta")).data : await getContent("blog_meta");
  const hidden = new Set(meta.hidden);
  const legacy = legacyBlogs.filter((b) => !hidden.has(String(b.id))).map(legacyToPublic);

  let dbPosts: PublicBlog[] = [];
  if (dbEnabled) {
    try {
      await ensureSchema();
      const rows = await sql`select * from blog_posts where status = 'published' order by published_at desc nulls last`;
      dbPosts = rows.map((r) => postToPublic(rowToPost(r)));
    } catch (error) {
      console.error("[blog] reading posts failed, showing legacy posts only:", error);
    }
  }
  return [...legacy, ...dbPosts].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

/** Public list (cached; refreshed when the admin changes a post). */
export const getPublicBlogs = unstable_cache(() => buildPublicBlogs(false), ["public-blogs"], {
  tags: ["blogs", "content:blog_meta"],
  revalidate: 300,
});

/** Uncached variant, for jobs that must see a save made moments ago. */
export const getPublicBlogsFresh = () => buildPublicBlogs(true);

/** A published post by slug, for the public site. */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  if (!dbEnabled || isLegacyId(slug)) return null;
  return unstable_cache(
    async () => {
      try {
        await ensureSchema();
        const rows = await sql`select * from blog_posts where slug = ${slug} and status = 'published'`;
        return rows.length ? rowToPost(rows[0]) : null;
      } catch (error) {
        console.error("[blog] reading post failed:", error);
        return null;
      }
    },
    ["blog-post", slug],
    { tags: ["blogs", `blog:${slug}`], revalidate: 300 }
  )();
}

export function revalidateBlogs(slug?: string) {
  revalidateTag("blogs");
  if (slug) revalidateTag(`blog:${slug}`);
  revalidatePath("/", "layout");
}

// ---------- admin ----------

export async function listPosts(): Promise<Omit<BlogPost, "content">[]> {
  await ensureSchema();
  const rows = await sql`select id, slug, title, summary, '' as content, cover, tags, author, status,
                                published_at, created_at, updated_at
                         from blog_posts order by updated_at desc`;
  return rows.map((r) => {
    const { content: _content, ...rest } = rowToPost(r);
    void _content;
    return rest;
  });
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  await ensureSchema();
  const rows = await sql`select * from blog_posts where id = ${id}`;
  return rows.length ? rowToPost(rows[0]) : null;
}

type SaveResult =
  | { ok: true; post: BlogPost }
  | { ok: false; status: number; error: string; issues?: unknown };

export async function savePost(id: number | null, input: unknown): Promise<SaveResult> {
  const parsed = blogPostInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: "Validation failed", issues: parsed.error.issues };
  }
  const p = parsed.data;
  await ensureSchema();

  const taken = await sql`select id from blog_posts where slug = ${p.slug} and id <> ${id ?? -1}`;
  if (taken.length) return { ok: false, status: 409, error: "That slug is already used by another post" };

  let row;
  if (id === null) {
    const publishedAt = p.status === "published" ? new Date().toISOString() : null;
    const rows = await sql`insert into blog_posts (slug, title, summary, content, cover, tags, author, status, published_at)
      values (${p.slug}, ${p.title}, ${p.summary}, ${p.content}, ${p.cover}, ${p.tags}, ${p.author}, ${p.status}, ${publishedAt})
      returning *`;
    row = rows[0];
  } else {
    const existing = await getPostById(id);
    if (!existing) return { ok: false, status: 404, error: "Post not found" };
    // Keep the original publish date; stamp it the first time a post goes live.
    const publishedAt =
      p.status === "published" ? existing.published_at ?? new Date().toISOString() : existing.published_at;
    const rows = await sql`update blog_posts set slug = ${p.slug}, title = ${p.title}, summary = ${p.summary},
      content = ${p.content}, cover = ${p.cover}, tags = ${p.tags}, author = ${p.author}, status = ${p.status},
      published_at = ${publishedAt}, updated_at = now() where id = ${id} returning *`;
    row = rows[0];
    if (existing.slug !== p.slug) revalidateBlogs(existing.slug);
  }
  const post = rowToPost(row);
  revalidateBlogs(post.slug);
  return { ok: true, post };
}

export async function deletePost(id: number): Promise<boolean> {
  await ensureSchema();
  const rows = await sql`delete from blog_posts where id = ${id} returning slug`;
  if (!rows.length) return false;
  revalidateBlogs(String(rows[0].slug));
  return true;
}

export const legacyBlogList = () => legacyBlogs.map(legacyToPublic);
