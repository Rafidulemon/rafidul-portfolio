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
import OpenAiCodex from "../components/blogs/OpenAiCodex";
import blogsJson from "../data/blogs.json";

const componentsMap: Record<string, JSX.Element> = {
  BangladeshTechBusinessDescription: <BangladeshTechBusinessDescription/>,
  ChatGptPremiumBlogDescription: <ChatGptPremiumBlogDescription/>,
  ClaudeAiBlogDescription: <ClaudeAiBlogDescription/>,
  CryptoFutureDescription: <CryptoFutureDescription/>,
  DeepSeekBlogDescription: <DeepSeekBlogDescription/>,
  DigitalMarketingAIDescription: <DigitalMarketingAIDescription/>,
  FutureAiBlogDescription: <FutureAiBlogDescription/>,
  MetaverseBlogDescription: <MetaverseBlogDescription/>,
  NextAppRouterThemeChangeDescription: <NextAppRouterThemeChangeDescription/>,
  NextJsBlogDescription: <NextJsBlogDescription/>,
  NextJsIntlDescription: <NextJsIntlDescription/>,
  SoftwareEntrepreneurshipDescription: <SoftwareEntrepreneurshipDescription/>,
  TrpcBlogDescription: <TrpcBlogDescription/>,
  UIUXPrinciplesDescription: <UIUXPrinciplesDescription/>,
  JS_DOM_Blog: <JS_DOM_Blog/>,
  MCP_Blog: <MCP_Blog/>,
  OpenAiCodex: <OpenAiCodex/>
};

const BlogsPage = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const blogData = blogsJson;

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
