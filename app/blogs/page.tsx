import type { Metadata } from "next";
import BlogsList from "../components/blogs/BlogsList";
import { getPublicBlogs } from "../lib/blog/store";

export const metadata: Metadata = {
  title: "Blogs | Md. Rafidul Islam",
  description:
    "Articles on Next.js, AI, web development and software engineering by Md. Rafidul Islam.",
};

const BlogsPage = async () => {
  const blogs = await getPublicBlogs();
  return <BlogsList blogs={blogs} />;
};

export default BlogsPage;
