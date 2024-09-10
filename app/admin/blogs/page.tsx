"use client";
import Button from "@/app/components/display/Button";
import PageTitle from "@/app/components/typography/PageTitle";
import { useState } from "react";

interface Blog {
  title: string;
  description: string;
}

const initialBlogData: Blog[] = [
  {
    title: "Introduction to Artificial Intelligence",
    description:
      "Artificial Intelligence (AI) is transforming industries by mimicking human intelligence. From self-driving cars to smart home systems, AI is advancing in ways we could only dream of. In this blog, we will explore the basics of AI, its various applications, and how it is shaping the future.",
  },
  {
    title: "Understanding Machine Learning",
    description:
      "Machine Learning (ML), a subset of AI, enables systems to learn from data without being explicitly programmed. From recommendation engines to fraud detection, ML is powering some of the most innovative solutions today.",
  },
  {
    title: "Deep Learning: Neural Networks Unleashed",
    description:
      "Deep Learning is a subfield of machine learning, using neural networks with many layers. These networks are modeled after the human brain and are responsible for groundbreaking advancements in AI.",
  },
];

function BlogCard({ title, description }: Blog) {
  return (
    <div className="p-6 rounded-2xl bg-[#111111] shadow-md shadow-cyan-900">
      <h2 className="text-2xl text-center font-semibold mb-4 text-cyan-500">{title}</h2>
      <p className="text-gray-600 text-white text-justify">{description}</p>
    </div>
  );
}

const BlogsEdit = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [newBlog, setNewBlog] = useState<Blog>({
    title: "",
    description: "",
  });

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    setNewBlog(blogs[index]);
  };

  const handleSaveClick = () => {
    if (currentEditIndex !== null) {
      const updatedBlogs = [...blogs];
      updatedBlogs[currentEditIndex] = newBlog;
      setBlogs(updatedBlogs);
    } else {
      setBlogs([...blogs, newBlog]);
    }
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const handleAddNewBlog = () => {
    setNewBlog({
      title: "",
      description: "",
    });
    setIsEditing(true);
    setCurrentEditIndex(null);
  };

  return (
    <div className="w-full pt-16 md:py-20 px-4 md:px-10 min-h-screen flex flex-col items-center">
      <PageTitle name="Blogs" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {blogs.map((blog, index) => (
          <div key={index} className="flex flex-col items-center">
            <BlogCard title={blog.title} description={blog.description} />
            <Button
              onClick={() => handleEditClick(index)}
              theme="secondary"
              className="w-[100px] mt-2"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleAddNewBlog} theme="primary" className="mt-4">
        Add New Blog
      </Button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-2xl shadow-md shadow-cyan-900 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {currentEditIndex !== null ? "Edit Blog" : "Add New Blog"}
            </h2>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Blog Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-200 mb-2">Blog Description</label>
              <textarea
                value={newBlog.description}
                onChange={(e) =>
                  setNewBlog({
                    ...newBlog,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-black"
                rows={4}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleCancelClick}
                theme="secondary"
                className="w-[100px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveClick}
                theme="primary"
                className="w-[100px]"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsEdit;
