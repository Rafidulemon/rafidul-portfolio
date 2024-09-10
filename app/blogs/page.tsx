import React from "react";
import PageTitle from "../components/typography/PageTitle";
import Button from "../components/display/Button";

interface Blog {
  title: string;
  description: string;
}

const blogData: Blog[] = [
  {
    title: "Introduction to Artificial Intelligence",
    description:
      "Artificial Intelligence (AI) is transforming industries by mimicking human intelligence. From self-driving cars to smart home systems, AI is advancing in ways we could only dream of. In this blog, we will explore the basics of AI, its various applications, and how it is shaping the future. The ethical implications of AI are also important to consider as we delve deeper into this topic. From automation to decision-making, AI is touching all aspects of modern life. Stay tuned as we unpack the AI revolution.",
  },
  {
    title: "Understanding Machine Learning",
    description:
      "Machine Learning (ML), a subset of AI, enables systems to learn from data without being explicitly programmed. From recommendation engines to fraud detection, ML is powering some of the most innovative solutions today. We will break down what ML is, how it works, and explore various algorithms that are foundational in this domain. By understanding the inner workings of ML, you can appreciate its role in everyday technology. We’ll also look at how businesses are leveraging ML for competitive advantage and future growth.",
  },
  {
    title: "Deep Learning: Neural Networks Unleashed",
    description:
      "Deep Learning is a subfield of machine learning, using neural networks with many layers. These networks are modeled after the human brain and are responsible for groundbreaking advancements in AI. This blog will dive into the complexities of deep learning, how it differs from traditional machine learning, and the industries benefiting from this technology. From natural language processing to image recognition, deep learning is pushing the boundaries of what is possible with AI. We’ll also look at real-world applications of deep learning in different sectors.",
  },
  {
    title: "Advances in Image Processing",
    description:
      "Image processing is a critical field within AI that involves manipulating and analyzing digital images. From medical imaging to facial recognition systems, the applications of image processing are vast. This blog will explore the key techniques used in image processing and how advancements in AI are taking these technologies to new heights. We will also look at the challenges and ethical considerations surrounding the use of image data. The future of image processing promises to bring even more innovation in healthcare, security, and entertainment.",
  },
  {
    title: "Digital Marketing in the Age of AI",
    description:
      "AI is revolutionizing digital marketing by allowing brands to create personalized customer experiences at scale. From predictive analytics to automated content creation, AI tools are changing how marketers approach their campaigns. In this blog, we will explore how AI is reshaping digital marketing strategies, the tools that are driving these changes, and the potential pitfalls marketers should watch out for. With AI, businesses can reach their target audience with more precision than ever before. The future of digital marketing lies at the intersection of data and AI-driven automation.",
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

function BlogsPage() {
  return (
    <div className="w-full pt-16 md:py-20 px-4 md:px-10">
      <PageTitle name="BLOGS" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-center">
      <Button theme="primary" className="mt-4">
        Load More
      </Button>
      </div>
    </div>
  );
}

export default BlogsPage;
