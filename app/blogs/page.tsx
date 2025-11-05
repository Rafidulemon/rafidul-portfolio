"use client";
import { useState } from "react";
import BlogCard from "../components/cards/BlogCard";
import Button from "../components/display/Button";
import PageTitle from "../components/typography/PageTitle";
import blogsJson from "../data/blogs.json";

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
