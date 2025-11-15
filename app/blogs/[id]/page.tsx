import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SocialShare from "@/app/components/share/SocialShare";
import blogsJson from "../../data/blogs.json";
import { componentsMap } from "@/app/utils/blogsComponentMap";

type Blog = (typeof blogsJson)[number];

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rafidul-portfolio.vercel.app";

const findBlogById = (id: string): Blog | undefined =>
  (blogsJson as Blog[]).find((blog) => blog.id === id);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blog = findBlogById(params.id);

  if (!blog) {
    return {
      title: "Blog Not Found | Md. Rafidul Islam",
      description: "The requested blog post could not be found.",
    };
  }

  const canonicalUrl = `${BASE_URL}/blogs/${params.id}`;
  const imageUrl = blog.image.startsWith("http")
    ? blog.image
    : `${BASE_URL}${blog.image}`;
  const description = blog.description_summary || blog.title;

  return {
    title: `${blog.title} | Md. Rafidul Islam`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: blog.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function BlogPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = findBlogById(params.id);

  if (!blog) {
    notFound();
  }

  const blogContent = componentsMap[blog.description];

  return (
    <div className="w-full py-6 md:px-10">
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto">
        <h1 className="dark:text-white text-primary_dark text-3xl font-bold mb-4 md:mb-6">
          {blog.title}
        </h1>
        <p className="dark:text-gray-200 text-gray-700 mb-1 md:mb-2">
          {blog.date}
        </p>
        <p className="dark:text-gray-400 text-gray-500">{blog.author}</p>
        <div className="my-8">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1472}
            height={832}
            className="w-full h-auto"
          />
        </div>
        <div className="dark:text-gray-300 text-gray-800 mt-4 text-justify text-[14px] md:text-[16px]">
          {blogContent ?? (
            <p>
              This article is being updated. Please check back shortly for the
              full content.
            </p>
          )}
        </div>
        <div className="mt-8">
          <SocialShare title={blog.title} />
        </div>
      </div>
    </div>
  );
}
