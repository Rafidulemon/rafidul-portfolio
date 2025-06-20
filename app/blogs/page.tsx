"use client";
import { useState } from "react";
import BlogCard from "../components/cards/BlogCard";
import Button from "../components/display/Button";
import PageTitle from "../components/typography/PageTitle";
import BangladeshTechBusinessDescription from "@/app/components/blogs/BangladeshTechBusinessDescription";
import ChatGptPremiumBlogDescription from "@/app/components/blogs/ChatGptPremiumBlogDescription";
import ClaudeAiBlogDescription from "@/app/components/blogs/ClaudeAiBlogDescription";
import CryptoFutureDescription from "@/app/components/blogs/CryptoFutureDescription";
import DigitalMarketingAIDescription from "@/app/components/blogs/DigitalMarketingAIDescription";
import FutureAiBlogDescription from "@/app/components/blogs/FutureAiBlogDescription";
import MetaverseBlogDescription from "@/app/components/blogs/MetaverseBlogDescription";
import NextAppRouterThemeChangeDescription from "@/app/components/blogs/NextAppRouterThemeChangeDescription";
import NextJsBlogDescription from "@/app/components/blogs/NextJsBlogDescription";
import NextJsIntlDescription from "@/app/components/blogs/NextJsIntlDescription";
import SoftwareEntrepreneurshipDescription from "@/app/components/blogs/SoftwareEntrepreneurshipDescription";
import TrpcBlogDescription from "@/app/components/blogs/TrpcBlogDescription";
import UIUXPrinciplesDescription from "@/app/components/blogs/UIUXPrinciplesDescription";
import DeepSeekBlogDescription from "../components/blogs/DeepSeekBlogDescription";
import JS_DOM_Blog from "../components/blogs/JSDom";
import MCP_Blog from "../components/blogs/MCP_Blog";

const blogData = [
  {
    id: "1",
    title: "Next.js App Router and Translation with next-intl",
    date: "25 January, 2025",
    description: <NextJsIntlDescription />,
    description_summary:
      "Learn how to set up Next.js App Router with next-intl for seamless translation and internationalization.",
    image: "/images/blogs/next-intl.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "2",
    title: "Next.js App Router Theme Change",
    date: "25 January, 2025",
    description: <NextAppRouterThemeChangeDescription />,
    description_summary:
      "This guide explains how to implement theme switching in a Next.js app with persistence.",
    image: "/images/blogs/next_theme.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "3",
    title: "Why Choose Next.js for Your Web Projects?",
    date: "25 January, 2025",
    description: <NextJsBlogDescription />,
    description_summary:
      "Next.js offers SSR, SSG, and more to build fast, scalable applications. Here's why it’s the best choice.",
    image: "/images/blogs/next.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "4",
    title: "Understanding tRPC and Its Advantages",
    date: "25 January, 2025",
    description: <TrpcBlogDescription />,
    description_summary:
      "Discover the advantages of tRPC and how it improves API development by providing type-safety.",
    image: "/images/blogs/trpc.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "5",
    title: "The Future of AI: Trends and Predictions",
    date: "25 January, 2025",
    description: <FutureAiBlogDescription />,
    description_summary:
      "Explore the trends and predictions shaping the future of Artificial Intelligence.",
    image: "/images/blogs/future_of_ai.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "6",
    title: "The Rise of Claude: A New Era in AI Assistants",
    date: "25 January, 2025",
    description: <ClaudeAiBlogDescription />,
    description_summary:
      "Claude represents the next level of AI assistants, pushing the boundaries of human-computer interaction.",
    image: "/images/blogs/claude_ai.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "7",
    title: "The Importance of ChatGPT Premium: Features and Benefits",
    date: "25 January, 2025",
    description: <ChatGptPremiumBlogDescription />,
    description_summary:
      "Explore the exclusive features and advantages of upgrading to ChatGPT Premium.",
    image: "/images/blogs/chatgpt_premium.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "8",
    title: "Exploring the Metaverse: What the Future Holds",
    date: "25 January, 2025",
    description: <MetaverseBlogDescription />,
    description_summary:
      "The Metaverse is revolutionizing digital interaction. Here's what the future holds.",
    image: "/images/blogs/metaverse.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "9",
    title: "The Future of Cryptocurrency: Opportunities and Risks",
    date: "25 January, 2025",
    description: <CryptoFutureDescription />,
    description_summary:
      "Cryptocurrency is rapidly changing the finance industry. Explore its future potential and risks.",
    image: "/images/blogs/crypto_future.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "10",
    title: "Future of Digital Marketing: The AI Revolution",
    date: "25 January, 2025",
    description: <DigitalMarketingAIDescription />,
    description_summary:
      "AI is changing digital marketing forever. Learn how marketers can stay ahead in the age of automation.",
    image: "/images/blogs/digital_marketing_ai.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "11",
    title: "UI/UX Principles Every Designer Should Know",
    date: "25 January, 2025",
    description: <UIUXPrinciplesDescription />,
    description_summary:
      "Master the core principles of UI/UX design for creating seamless and engaging web experiences.",
    image: "/images/blogs/ui_ux.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "12",
    title: "Entrepreneurship in the Software Field: A Guide",
    date: "25 January, 2025",
    description: <SoftwareEntrepreneurshipDescription />,
    description_summary:
      "Software entrepreneurship offers huge potential. Learn how to succeed in this competitive field.",
    image: "/images/blogs/software_entrepreneurship.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "13",
    title: "New Business Ideas in Bangladesh: Opportunities in Tech",
    date: "25 January, 2025",
    description: <BangladeshTechBusinessDescription />,
    description_summary:
      "Bangladesh is a hotbed for tech startups. Discover new business opportunities in the growing tech market.",
    image: "/images/blogs/bangladesh_tech.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "14",
    title: "DeepSeek AI: The New Rising LLM",
    date: "29 January, 2025",
    description: <DeepSeekBlogDescription />,
    description_summary:
      "DeepSeek AI is an emerging large language model that challenges ChatGPT. Explore its capabilities, differences, and limitations.",
    image: "/images/blogs/deepseek.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "15",
    title: "JavaScript DOM (Document Object Model)",
    date: "19 June, 2025",
    description: <JS_DOM_Blog />,
    description_summary:
      "An easy-to-understand guide explaining the JavaScript DOM, how to access and manipulate HTML elements, handle events, and build interactive web pages.",
    image: "/images/blogs/js_dom.jpg",
    author: "Md. Rafidul Islam",
  },
  {
    id: "16",
    title: "Model Context Protocol (MCP)",
    date: "20 June, 2025",
    description: <MCP_Blog />,
    description_summary:
      "An in-depth beginner-friendly guide to Model Context Protocol (MCP), the open standard that enables LLMs to interact with external tools, APIs, and context dynamically using a unified JSON-RPC format.",
    image: "/images/blogs/mcp_protocol.jpg",
    author: "Md. Rafidul Islam",
  },
];

const BlogsPage = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 5);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBlogs = blogData
    .filter((blog) => {
      const titleMatch = blog.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = blog.description_summary
        .toLowerCase()
        .includes(searchTerm);
      return titleMatch || descriptionMatch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)

  return (
    <div className="w-full">
      <PageTitle name="BLOGS" />
      <div className="my-4 w-full flex flex-row justify-end">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-[300px] dark:text-white text-black bg-white dark:bg-black border rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 border-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 md:mt-16 md:mb-4">
        {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description_summary={blog.description_summary}
            date={blog.date}
            image={blog.image}
          />
        ))}
      </div>
      {visibleBlogs < filteredBlogs.length && (
        <div className="w-full flex flex-row items-center justify-center">
          <Button theme="primary" className="mt-4" onClick={loadMoreBlogs}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
