"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageLoader } from "@/app/components/display/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MarkdownContent from "@/app/components/blogs/MarkdownContent";
import { ImageField, MediaLibrary, uploadImage } from "./fields";
import { mediaUrl } from "@/app/lib/media";
import { Button, Card, Label, TagsInput, api, cx, inputCls, useToasts, useUnsavedWarning } from "./ui";

type Form = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
};

const BLANK: Form = {
  slug: "",
  title: "",
  summary: "",
  content: "",
  cover: "",
  tags: [],
  author: "Md. Rafidul Islam",
  status: "draft",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

const TOOLS: { label: string; title: string; before: string; after?: string; placeholder: string; line?: boolean }[] = [
  { label: "B", title: "Bold", before: "**", after: "**", placeholder: "bold text" },
  { label: "I", title: "Italic", before: "*", after: "*", placeholder: "italic text" },
  { label: "H2", title: "Heading", before: "## ", placeholder: "Heading", line: true },
  { label: "H3", title: "Subheading", before: "### ", placeholder: "Subheading", line: true },
  { label: "“ ”", title: "Quote", before: "> ", placeholder: "Quote", line: true },
  { label: "• List", title: "Bulleted list", before: "- ", placeholder: "List item", line: true },
  { label: "1. List", title: "Numbered list", before: "1. ", placeholder: "List item", line: true },
  { label: "</>", title: "Inline code", before: "`", after: "`", placeholder: "code" },
  { label: "{ }", title: "Code block", before: "\n```ts\n", after: "\n```\n", placeholder: "code" },
  { label: "Link", title: "Link", before: "[", after: "](https://)", placeholder: "link text" },
];

export default function BlogEditor({ postId }: { postId?: number }) {
  const router = useRouter();
  const { push, view: toasts } = useToasts();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Form>(BLANK);
  const [initial, setInitial] = useState(JSON.stringify(BLANK));
  const [loading, setLoading] = useState(Boolean(postId));
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(postId));
  const [view, setView] = useState<"write" | "split" | "preview">("split");
  const [errors, setErrors] = useState<string[]>([]);
  const [library, setLibrary] = useState(false);
  const [published, setPublished] = useState<{ at: string | null } | null>(null);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const res = await api<{ post: Form & { published_at: string | null } }>(`/api/admin/blogs/${postId}`);
      if (res.ok) {
        const p = res.data.post;
        const f: Form = {
          slug: p.slug, title: p.title, summary: p.summary, content: p.content,
          cover: p.cover, tags: p.tags, author: p.author, status: p.status,
        };
        setForm(f);
        setInitial(JSON.stringify(f));
        setPublished({ at: p.published_at });
      } else setLoadError(res.status === 404 ? "This post no longer exists." : res.data.error || "Could not load the post");
      setLoading(false);
    })();
  }, [postId]);

  const dirty = JSON.stringify(form) !== initial;
  useUnsavedWarning(dirty);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const onTitle = (title: string) =>
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));

  const save = useCallback(
    async (status?: Form["status"]) => {
      const body = { ...form, status: status ?? form.status };
      setSaving(true);
      setErrors([]);
      const res = postId
        ? await api<{ post: { id: number; published_at: string | null } }>(`/api/admin/blogs/${postId}`, { method: "PUT", body: JSON.stringify(body) })
        : await api<{ post: { id: number; published_at: string | null } }>("/api/admin/blogs", { method: "POST", body: JSON.stringify(body) });
      setSaving(false);
      if (res.ok) {
        setForm(body);
        setInitial(JSON.stringify(body));
        setPublished({ at: res.data.post.published_at });
        push("success", body.status === "published" ? "Saved and published. It's live on the site." : "Draft saved.");
        if (!postId) router.replace(`/admin/blogs/${res.data.post.id}`);
      } else if (res.data.issues) {
        setErrors(res.data.issues.map((i) => `${i.path.join(" › ")}: ${i.message}`));
        push("error", "Please fix the highlighted problems.");
      } else push("error", res.data.error || "Save failed");
    },
    [form, postId, push, router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saving) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, saving]);

  // ---- editor helpers ----
  const replaceSelection = (build: (selected: string) => { text: string; select?: [number, number] }) => {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const out = build(value.slice(s, e));
    const next = value.slice(0, s) + out.text + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      const [a, b] = out.select ?? [s + out.text.length, s + out.text.length];
      el.setSelectionRange(s + a, s + b);
    });
  };

  const apply = (tool: (typeof TOOLS)[number]) =>
    replaceSelection((sel) => {
      const body = sel || tool.placeholder;
      if (tool.line) {
        const text = body.split("\n").map((l) => tool.before + l).join("\n");
        return { text, select: [0, text.length] };
      }
      const text = tool.before + body + (tool.after ?? "");
      return { text, select: [tool.before.length, tool.before.length + body.length] };
    });

  const insertImage = (url: string, alt = "image") =>
    replaceSelection((sel) => {
      const text = `![${sel || alt}](${url})`;
      return { text };
    });

  const onImageFile = async (file?: File) => {
    if (!file) return;
    try {
      insertImage(await uploadImage(file), file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      push("error", (e as Error).message);
    } finally {
      if (imgRef.current) imgRef.current.value = "";
    }
  };

  const words = useMemo(() => (form.content.trim() ? form.content.trim().split(/\s+/).length : 0), [form.content]);

  const remove = async () => {
    if (!postId || !confirm("Delete this post permanently?")) return;
    const res = await api(`/api/admin/blogs/${postId}`, { method: "DELETE" });
    if (res.ok) {
      setInitial(JSON.stringify(form)); // avoid the unsaved-changes prompt
      router.push("/admin/blogs");
    } else push("error", res.data.error || "Could not delete");
  };

  if (loading) return <PageLoader label="Loading post…" />;
  if (loadError) {
    return (
      <Card>
        <p className="text-red-500">{loadError}</p>
        <Link href="/admin/blogs" className="mt-2 inline-block text-sm text-cyan-700 hover:underline">
          ← Back to posts
        </Link>
      </Card>
    );
  }

  const isPublished = form.status === "published";
  const hasEditor = view !== "preview";
  const hasPreview = view !== "write";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Top bar */}
      <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-slate-200 bg-slate-50/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/blogs" className="text-sm text-slate-600 hover:text-cyan-700 dark:text-slate-400">
            ← Posts
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-lg font-bold text-slate-900 dark:text-white">
            {postId ? "Edit post" : "New post"}
          </h1>
          <span
            className={cx(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              isPublished ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
            )}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
          {dirty && <span className="text-xs text-amber-600 dark:text-amber-300">Unsaved changes</span>}
          {postId && isPublished && (
            <a href={`/blogs/${form.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-700 hover:underline dark:text-cyan-300">
              View ↗
            </a>
          )}
          {postId && (
            <Button size="sm" variant="ghost" className="text-red-500" onClick={remove}>
              Delete
            </Button>
          )}
          {isPublished ? (
            <>
              <Button loading={saving} onClick={() => save("draft")}>
                Unpublish
              </Button>
              <Button variant="primary" loading={saving} disabled={!dirty} onClick={() => save("published")}>
                {saving ? "Saving…" : "Update"}
              </Button>
            </>
          ) : (
            <>
              <Button loading={saving} onClick={() => save("draft")}>
                {saving ? "Saving…" : "Save draft"}
              </Button>
              <Button variant="primary" loading={saving} onClick={() => save("published")}>
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
          <p className="font-medium">Couldn&apos;t save:</p>
          <ul className="mt-1 list-disc pl-5">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 min-[1200px]:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="min-w-0 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => onTitle(e.target.value)}
              placeholder="A great title"
              className={cx(inputCls, "text-lg font-semibold")}
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div role="tablist" className="mr-2 flex rounded-lg border border-slate-300 p-0.5 dark:border-slate-700">
              {(["write", "split", "preview"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={cx(
                    "rounded-md px-3 py-1 text-xs font-medium capitalize",
                    v === "split" && "hidden min-[1024px]:block",
                    view === v ? "bg-cyan-600 text-white" : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            {hasEditor &&
              TOOLS.map((t) => (
                <button
                  key={t.title}
                  type="button"
                  title={t.title}
                  aria-label={t.title}
                  onClick={() => apply(t)}
                  className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {t.label}
                </button>
              ))}
            {hasEditor && (
              <>
                <button
                  type="button"
                  onClick={() => imgRef.current?.click()}
                  className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  🖼 Upload image
                </button>
                <button
                  type="button"
                  onClick={() => setLibrary(true)}
                  className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Library
                </button>
                <input
                  ref={imgRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp,image/avif"
                  className="hidden"
                  onChange={(e) => onImageFile(e.target.files?.[0])}
                />
              </>
            )}
            <span className="ml-auto text-xs text-slate-500">
              {words} words · ~{Math.max(1, Math.round(words / 220))} min read
            </span>
          </div>

          <div className={cx("grid gap-4", view === "split" && "min-[1024px]:grid-cols-2")}>
            {hasEditor && (
              <textarea
                ref={textRef}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                spellCheck
                aria-label="Post content (Markdown)"
                placeholder={"Write in Markdown…\n\n## A heading\n\nSome **bold** text, a [link](https://example.com), and:\n\n```ts\nconst hello = 'world';\n```"}
                className={cx(inputCls, "min-h-[560px] resize-y font-mono text-[13px] leading-relaxed")}
              />
            )}
            {hasPreview && (
              <div className="min-h-[560px] overflow-auto rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-2 font-poppins text-3xl font-bold text-primary_dark dark:text-white">
                  {form.title || "Untitled"}
                </h2>
                {form.cover && (
                  // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary URLs
                  <img src={mediaUrl(form.cover)} alt="" className="my-4 w-full rounded-lg" />
                )}
                <div className="text-[15px] text-slate-800 dark:text-slate-300">
                  {form.content.trim() ? (
                    <MarkdownContent>{form.content}</MarkdownContent>
                  ) : (
                    <p className="text-slate-400">Nothing to preview yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="slug" help="The web address of the post.">
                  Slug
                </Label>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>/blogs/</span>
                  <input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      set("slug", e.target.value.toLowerCase());
                    }}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="summary" help="Shown on the blog list, in search and when shared.">
                  Summary
                </Label>
                <textarea
                  id="summary"
                  rows={3}
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  className={cx(inputCls, "resize-y")}
                />
                <p className="mt-0.5 text-right text-[11px] text-slate-400">{form.summary.length}/400</p>
              </div>
              <div>
                <Label>Tags</Label>
                <TagsInput value={form.tags} onChange={(v) => set("tags", v)} placeholder="Add a tag and press Enter" />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <input id="author" value={form.author} onChange={(e) => set("author", e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label help="Shown on the blog list and at the top of the post.">Cover image</Label>
                <ImageField value={form.cover} onChange={(v) => set("cover", v)} />
              </div>
            </div>
          </Card>
          {published?.at && (
            <p className="px-1 text-xs text-slate-500">First published {new Date(published.at).toLocaleString()}</p>
          )}
          <Card className="text-xs text-slate-600 dark:text-slate-400">
            <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Markdown tips</h2>
            <p>
              <code>## Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>[text](url)</code>,{" "}
              <code>![alt](image-url)</code>, <code>- list</code>, and fenced code blocks with{" "}
              <code>```ts</code>. Raw HTML is not rendered, for safety. Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save.
            </p>
          </Card>
        </aside>
      </div>

      {library && (
        <MediaLibrary
          onClose={() => setLibrary(false)}
          onPick={(url) => {
            insertImage(url);
            setLibrary(false);
          }}
        />
      )}
      {toasts}
    </div>
  );
}
