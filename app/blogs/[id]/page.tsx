import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmartImage from "@/app/components/display/SmartImage";
import SocialShare from "@/app/components/share/SocialShare";
import blogsJson from "../../data/blogs.json";
import { componentsMap } from "@/app/utils/blogsComponentMap";
import BlogTldr from "@/app/components/ai/BlogTldr";
import MarkdownContent from "@/app/components/blogs/MarkdownContent";
import { getContent } from "@/app/lib/content/store";
import { displayDate, getPublishedPost, isLegacyId } from "@/app/lib/blog/store";

type Legacy = (typeof blogsJson)[number];

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rafidul-portfolio.vercel.app";

const absolute = (src: string) => (src.startsWith("http") ? src : `${BASE_URL}${src}`);

/** A post normalised for rendering, whether it is a legacy component or a Markdown post. */
async function loadPost(id: string) {
  if (isLegacyId(id)) {
    const blog = (blogsJson as Legacy[]).find((b) => b.id === id);
    if (!blog) return null;
    const meta = await getContent("blog_meta");
    if (meta.hidden.includes(id)) return null; // hidden from the admin panel
    return {
      kind: "legacy" as const,
      id,
      title: blog.title,
      date: blog.date,
      author: blog.author,
      image: blog.image,
      summary: blog.description_summary,
      tags: [] as string[],
      legacyComponent: blog.description,
      markdown: "",
    };
  }
  const post = await getPublishedPost(id);
  if (!post) return null;
  return {
    kind: "db" as const,
    id,
    title: post.title,
    date: displayDate(new Date(post.published_at ?? post.created_at)),
    author: post.author,
    image: post.cover,
    summary: post.summary,
    tags: post.tags,
    legacyComponent: "",
    markdown: post.content,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await loadPost(params.id);

  if (!post) {
    return {
      title: "Blog Not Found | Md. Rafidul Islam",
      description: "The requested blog post could not be found.",
    };
  }

  const canonicalUrl = `${BASE_URL}/blogs/${params.id}`;
  const description = post.summary || post.title;
  const images = post.image ? [{ url: absolute(post.image), width: 1200, height: 630, alt: post.title }] : [];

  return {
    title: `${post.title} | Md. Rafidul Islam`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image ? [absolute(post.image)] : [],
    },
  };
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const post = await loadPost(params.id);
  if (!post) notFound();

  const legacyContent = post.kind === "legacy" ? componentsMap[post.legacyComponent] : null;

  return (
    <div className="w-full py-6 md:px-10">
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto">
        <h1 className="dark:text-white text-primary_dark text-3xl font-bold mb-4 md:mb-6">
          {post.title}
        </h1>
        <p className="dark:text-gray-200 text-gray-700 mb-1 md:mb-2">{post.date}</p>
        <p className="dark:text-gray-400 text-gray-500">{post.author}</p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs text-cyan-700 dark:text-cyan-300">
                {t}
              </span>
            ))}
          </div>
        )}
        {post.image && (
          <div className="my-8">
            <SmartImage
              src={post.image}
              alt={post.title}
              width={1472}
              height={832}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
        <BlogTldr blogId={post.id} contentId="blog-content" />
        <div
          id="blog-content"
          className={`dark:text-gray-300 text-gray-800 mt-4 text-[14px] md:text-[16px] ${
            post.kind === "legacy" ? "text-justify" : ""
          }`}
        >
          {post.kind === "db" ? (
            <MarkdownContent>{post.markdown}</MarkdownContent>
          ) : (
            legacyContent ?? (
              <p>
                This article is being updated. Please check back shortly for the
                full content.
              </p>
            )
          )}
        </div>
        <div className="mt-8">
          <SocialShare title={post.title} />
        </div>
      </div>
    </div>
  );
}
