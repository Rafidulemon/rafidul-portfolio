import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  description_summary: string;
}

const BlogCard = ({
  id,
  image,
  title,
  date,
  description_summary,
}: BlogCardProps) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111111] shadow-md shadow-cyan-900 flex flex-col h-full">
      <div className="w-full md:h-auto rounded-t-xl mb-2">
        <Image
          src={image}
          alt={title}
          width={500}
          height={350}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      {/* Title Section */}
      <h2 className="px-2 md:px-4 text-2xl text-center font-semibold mb-2 text-primary_dark dark:text-cyan-500">
        {title}
      </h2>

      {/* Description Section */}
      <p className="px-2 md:px-4 text-gray-600 text-gray-700 dark:text-white text-justify flex-grow">
        {description_summary}
      </p>

      {/* Bottom Section with Date and Read More */}
      <div className="px-2 md:px-4 pb-2 mt-2 md:pb-4 flex justify-between items-center">
        <span className="text-sm text-gray-400">{date}</span>
        <Link href={`/blogs/${id}`}>
          <button className="dark:text-primary text-primary_dark hover:underline">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
