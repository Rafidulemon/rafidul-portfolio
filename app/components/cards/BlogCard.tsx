import Link from "next/link";
import SmartImage from "../display/SmartImage";

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  description_summary: string;
  tags?: string[];
}

const BlogCard = ({ id, image, title, date, description_summary, tags = [] }: BlogCardProps) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111111] shadow-md shadow-cyan-900 flex flex-col h-full">
      <div className="w-full md:h-auto rounded-t-xl mb-2 overflow-hidden">
        {image ? (
          <SmartImage
            src={image}
            alt={title}
            width={1472}
            height={832}
            className="w-full h-full object-cover rounded-t-xl"
          />
        ) : (
          // Posts written in the admin may have no cover image.
          <div className="flex aspect-[1472/832] w-full items-center justify-center rounded-t-xl bg-gradient-to-br from-cyan-600 to-teal-500 px-6 text-center font-poppins text-2xl font-semibold text-white">
            {title}
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 px-2 md:px-4">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] text-cyan-700 dark:text-cyan-300">
              {t}
            </span>
          ))}
        </div>
      )}

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
          <button className="dark:text-primary text-primary_dark hover:underline">Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
