"use client";
import { useState } from "react";
import BlogCard from "../components/cards/BlogCard";
import Button from "../components/display/Button";
import PageTitle from "../components/typography/PageTitle";

const blogData = [
  {
    id: "1",
    title: "Next.js App Router and Translation with next-intl",
    date: "2025-01-25",
    description:
    "<div>Welcome to my comprehensive guide on setting up Next.js App Router for dynamic routing and implementing internationalization with the powerful next-intl library. This blog dives deep into the steps required to enable localization in your Next.js application, allowing you to easily cater to a global audience by providing seamless multi-language support.</div>" +
    "<br/>"+
    "<h3>What You'll Learn:</h3>" +
    "<p>In this blog post, we will walk you through the process of integrating dynamic routing with the Next.js App Router, a crucial tool that allows you to handle routing dynamically based on the content of your application. By leveraging Next.js’s file-system-based routing and powerful App Router capabilities, you can set up complex routes with minimal effort.</p>" +
    "<p>You’ll also learn how to integrate next-intl — a library designed to make internationalization easy in Next.js applications. With next-intl, you can manage translations for different languages and locales seamlessly, enabling users to experience your app in their preferred language without the need for complex configurations.</p>" +
    "<h3>Key Topics Covered:</h3>" +
    "<ul>" +
    "<li>Understanding Next.js App Router: Learn how the App Router works in Next.js, and how to structure your application with dynamic routes that adapt to the content and context of the user.</li>" +
    "<li>Integrating next-intl: Discover how to set up the next-intl library in your Next.js app to handle translations. We’ll guide you through setting up locales, fetching translations, and ensuring the app displays content in the correct language.</li>" +
    "<li>Handling Locales Dynamically: We’ll explain how to implement dynamic locale switching in Next.js with the App Router, allowing users to toggle between different languages effortlessly. With next-intl, you can store language preferences and ensure the app adapts instantly based on the user’s locale.</li>" +
    "<li>Practical Code Examples: You’ll find code snippets that demonstrate how to implement dynamic routing and translation management in real-world scenarios, using the power of Next.js and next-intl. These examples will help you understand how to structure routes, manage language switching, and load translations based on user preferences.</li>" +
    "</ul>" +
    "<h3>Why This is Important:</h3>" +
    "<p>As businesses expand globally, providing localized content has become a critical factor in reaching diverse audiences. By utilizing Next.js and next-intl, you can easily implement dynamic routing and translation functionality, ensuring that your app delivers a personalized and localized experience for every user, regardless of their geographical location.</p>" +
    "<p>Not only does this improve the user experience, but it also boosts the accessibility and reach of your application, enhancing your app’s potential for success in international markets.</p>" +
    "<h3>Who is This Guide For?</h3>" +
    "<p>This blog is intended for developers who are building Next.js applications and want to integrate internationalization and dynamic routing. Whether you're building a multilingual website, a global e-commerce platform, or any app that needs to serve content in multiple languages, this guide will equip you with the knowledge to implement these features effectively.</p>" +
    "<h3>How It Works:</h3>" +
    "<p>By the end of this guide, you will have set up a fully functional Next.js app with the App Router and next-intl integration. Your app will be able to dynamically adjust routes based on language and automatically serve the correct translations based on the user's locale. Whether you’re dealing with content localization, SEO considerations for multiple languages, or building international user interfaces, this guide has you covered.</p>" +
    "<p>Get ready to enhance your Next.js project with the power of dynamic routing and internationalization, and take your app to a global audience effortlessly.</p>",
  description_summary:
    "Learn how to set up Next.js App Router with next-intl for seamless translation and internationalization.",
  image: "/images/blogs/next-intl.jpg",
  author: "John Doe",
  },
  {
    id: "2",
    title: "Next.js App Router Theme Change",
    date: "2025-01-23",
    description:
      "A complete guide to handling dynamic theme changes in your Next.js application using the App Router and Context API. This blog will walk you through how to implement dark mode and light mode themes with persistence.",
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

const BlogsPage = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 5);
  };

  return (
    <div className="w-full">
      <PageTitle name="BLOGS" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 md:mt-16 md:mb-4">
        {blogData.slice(0, visibleBlogs).map((blog) => (
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
      {visibleBlogs < blogData.length && (
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
