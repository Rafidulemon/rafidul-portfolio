"use client";
import NextJsIntlDescription from "@/app/components/blogs/NextJsThemeChange";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const blogData = [
    {
      id: "1",
      title: "Next.js App Router and Translation with next-intl",
      date: "25 January, 2025",
      description: <NextJsIntlDescription/>,
      description_summary:
      "Learn how to set up Next.js App Router with next-intl for seamless translation and internationalization.",
    image: "/images/blogs/next-intl.jpg",
    author: "Md. Rafidul Islam",
    },
    {
      id: "2",
      title: "Next.js App Router Theme Change",
      date: "2025-01-23",
      description:
        <NextJsIntlDescription/>,
      description_summary:
        "This guide explains how to implement theme switching in a Next.js app with persistence.",
      image: "/images/blogs/next_theme.jpg",
      author: "Jane Smith",
    },
    {
      id: "3",
      title: "Why Choose Next.js for Your Web Projects?",
      date: "2025-01-20",
      description:
        "In this article, we explore the reasons why Next.js is the best choice for modern web applications. From server-side rendering (SSR) to static site generation (SSG), discover why Next.js is a go-to framework for developers.",
      description_summary:
        "Next.js offers SSR, SSG, and more to build fast, scalable applications. Here's why it’s the best choice.",
      image: "/images/blogs/next.jpg",
      author: "Alex Brown",
    },
    {
      id: "4",
      title: "Understanding tRPC and Its Advantages",
      date: "2025-01-18",
      description:
        "tRPC allows you to build fully type-safe APIs without needing to write REST or GraphQL schemas. In this blog, we break down tRPC’s benefits, how to set it up, and how it enhances development workflows.",
      description_summary:
        "Discover the advantages of tRPC and how it improves API development by providing type-safety.",
      image: "/images/blogs/trpc.jpg",
      author: "Chris Williams",
    },
    {
      id: "5",
      title: "The Future of AI: Trends and Predictions",
      date: "2025-01-15",
      description:
        "AI continues to advance at an exponential rate. In this blog, we explore the future of AI, from machine learning and natural language processing to automation and its impact on various industries.",
      description_summary:
        "Explore the trends and predictions shaping the future of Artificial Intelligence.",
      image: "/images/blogs/future_of_ai.jpg",
      author: "Emily Davis",
    },
    {
      id: "6",
      title: "The Rise of Claude: A New Era in AI Assistants",
      date: "2025-01-10",
      description:
        "Claude is an advanced AI assistant designed to revolutionize human-computer interaction. This blog dives into Claude's capabilities, how it's different from existing AI assistants, and its potential impact on the future.",
      description_summary:
        "Claude represents the next level of AI assistants, pushing the boundaries of human-computer interaction.",
      image: "/images/blogs/claude_ai.jpg",
      author: "Michael Jordan",
    },
    {
      id: "7",
      title: "The Importance of ChatGPT Premium: Features and Benefits",
      date: "2025-01-05",
      description:
        "With the premium version of ChatGPT, users get access to enhanced features like faster responses, exclusive tools, and more. This blog will break down the benefits of ChatGPT Premium and why it is a valuable investment for heavy users.",
      description_summary:
        "Explore the exclusive features and advantages of upgrading to ChatGPT Premium.",
      image: "/images/blogs/chatgpt_premium.jpg",
      author: "Sarah Lee",
    },
    {
      id: "8",
      title: "Exploring the Metaverse: What the Future Holds",
      date: "2025-01-01",
      description:
        "The Metaverse is transforming how we interact with digital environments. This blog explores the concept of the Metaverse, its current state, and its potential to redefine entertainment, business, and social interactions in the future.",
      description_summary:
        "The Metaverse is revolutionizing digital interaction. Here's what the future holds.",
      image: "/images/blogs/metaverse.jpg",
      author: "David Miller",
    },
    {
      id: "9",
      title: "The Future of Cryptocurrency: Opportunities and Risks",
      date: "2024-12-28",
      description:
        "Cryptocurrency is reshaping the financial landscape, but what does the future hold? This blog examines the potential opportunities, challenges, and risks associated with the future of digital currencies like Bitcoin, Ethereum, and beyond.",
      description_summary:
        "Cryptocurrency is rapidly changing the finance industry. Explore its future potential and risks.",
      image: "/images/blogs/crypto_future.jpg",
      author: "Jessica Williams",
    },
    {
      id: "10",
      title: "Future of Digital Marketing: The AI Revolution",
      date: "2024-12-25",
      description:
        "Digital marketing is evolving with AI-driven tools and technologies. From personalized ads to predictive analytics, learn how AI is revolutionizing digital marketing and what marketers need to know to stay ahead of the curve.",
      description_summary:
        "AI is changing digital marketing forever. Learn how marketers can stay ahead in the age of automation.",
      image: "/images/blogs/digital_marketing_ai.jpg",
      author: "Rachel Green",
    },
    {
      id: "11",
      title: "UI/UX Principles Every Designer Should Know",
      date: "2024-12-22",
      description:
        "UI/UX design is crucial for creating intuitive, engaging web experiences. This blog outlines key principles of UI/UX design that every designer should know, including usability, accessibility, and responsive design.",
      description_summary:
        "Master the core principles of UI/UX design for creating seamless and engaging web experiences.",
      image: "/images/blogs/ui_ux.jpg",
      author: "Olivia Brown",
    },
    {
      id: "12",
      title: "Entrepreneurship in the Software Field: A Guide",
      date: "2024-12-18",
      description:
        "The software industry offers vast opportunities for entrepreneurs. This blog provides insights on how to start a software business, the challenges you may face, and how to navigate the competitive landscape to succeed.",
      description_summary:
        "Software entrepreneurship offers huge potential. Learn how to succeed in this competitive field.",
      image: "/images/blogs/software_entrepreneurship.jpg",
      author: "James Roberts",
    },
    {
      id: "13",
      title: "New Business Ideas in Bangladesh: Opportunities in Tech",
      date: "2024-12-15",
      description:
        "Bangladesh is emerging as a tech hub in South Asia. This blog highlights innovative business ideas and opportunities in the tech sector in Bangladesh, focusing on areas like AI, fintech, and SaaS.",
      description_summary:
        "Bangladesh is a hotbed for tech startups. Discover new business opportunities in the growing tech market.",
      image: "/images/blogs/bangladesh_tech.jpg",
      author: "Sophia Anderson",
    },
  ];
  
  interface Blog {
    id: string;
    title: string;
    description: ReactNode;
    description_summary: string;
    date: string;
    image: string;
    author: string;
  }
  
  export default function BlogPage({ params }: { params: { id: string } }) {
    const blog = blogData.find((b) => b.id === params.id);
  
    if (!blog) {
      notFound();
    }
  
    return (
      <div className="w-full py-6 md:px-10">
        <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto">
          <h1 className="text-white dark:text-primary_dark text-3xl font-bold mb-4 md:mb-6">{blog.title}</h1>
          <p className="text-gray-200 dark:text-gray-700 mb-1 md:mb-2">{blog.date}</p>
          <p className="text-gray-400 dark:text-gray-500">{blog.author}</p>
          <div className="my-8">
            <img src={blog.image} alt={blog.title} className="w-full h-auto" />
          </div>
          <div className="text-gray-300 dark:text-gray-800 mt-4 text-justify">{blog.description}</div></div>
      </div>
    );
  }