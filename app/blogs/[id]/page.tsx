"use client";
import BangladeshTechBusinessDescription from "@/app/components/blogs/BangladeshTechBusinessDescription";
import ChatGptPremiumBlogDescription from "@/app/components/blogs/ChatGptPremiumBlogDescription";
import ClaudeAiBlogDescription from "@/app/components/blogs/ClaudeAiBlogDescription";
import CryptoFutureDescription from "@/app/components/blogs/CryptoFutureDescription";
import DeepSeekBlogDescription from "@/app/components/blogs/DeepSeekBlogDescription";
import DigitalMarketingAIDescription from "@/app/components/blogs/DigitalMarketingAIDescription";
import FutureAiBlogDescription from "@/app/components/blogs/FutureAiBlogDescription";
import MetaverseBlogDescription from "@/app/components/blogs/MetaverseBlogDescription";
import NextAppRouterThemeChangeDescription from "@/app/components/blogs/NextAppRouterThemeChangeDescription";
import NextJsBlogDescription from "@/app/components/blogs/NextJsBlogDescription";
import NextJsIntlDescription from "@/app/components/blogs/NextJsIntlDescription";
import SoftwareEntrepreneurshipDescription from "@/app/components/blogs/SoftwareEntrepreneurshipDescription";
import TrpcBlogDescription from "@/app/components/blogs/TrpcBlogDescription";
import UIUXPrinciplesDescription from "@/app/components/blogs/UIUXPrinciplesDescription";
import JS_DOM_Blog from "@/app/components/blogs/JSDom";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import MCP_Blog from "@/app/components/blogs/MCP_Blog";
import OpenAiCodex from "@/app/components/blogs/OpenAiCodex";
import SocialShare from "@/app/components/share/SocialShare";
import blogsJson from "../../data/blogs.json";

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


export default function BlogPage({ params }: { params: { id: string } }) {
  
  const blogData = blogsJson;
  const blog = blogData.find((b:any) => b.id === params.id);

  if (!blog) notFound();

  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Fix: Set the full URL client-side after the component mounts
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          {componentsMap[blog.description]}
        </div>

        <div className="mt-6 flex items-center text-[16] md:text-[20px]">
          Share this blog:
        </div>
        <SocialShare title={blog.title} />
      </div>
    </div>
  );
}
