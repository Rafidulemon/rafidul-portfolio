import React from "react";
import { Text } from "../components/typography/Text";
import Link from "next/link";

function adminPage() {
  return (
    <div className="w-full flex flex-col items-center justify-start mt-6">
      <Text
        text="Welcome to portfolio dashboard"
        className="animate-pulse text-white md:text-[24px] lg:text-[30px] xl:text-[40px]"
      />
      <div className="p-20 w-full grid grid-cols-3 gap-[24px]">
        <Link href={"/admin/profile"} className="col-span-1 bg-[#512e5f] rounded shadow-lg shadow-[#9b59b6] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Text text="Profile" className="text-white text-[24px]"/>
        </Link>

        <Link href={"/admin/skills"} className="col-span-1 bg-[#1b2631] rounded shadow-lg shadow-[#5d6d7e] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Text text="Skills" className="text-white text-[24px]"/>
        </Link>

        <Link href={"/admin/services"} className="col-span-1 bg-[#0e6251] rounded shadow-lg shadow-[#16a085] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Text text="Services" className="text-white text-[24px]"/>
        </Link>

        <Link href={"/admin/projects"} className="col-span-1 bg-[#154360] rounded shadow-lg shadow-[#7fb3d5] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Text text="Projects" className="text-white text-[24px]"/>
        </Link>

        <Link href={"/admin/blogs"} className="col-span-1 bg-[#641e16] rounded shadow-lg shadow-[#c0392b] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Text text="Blogs" className="text-white text-[24px]"/>
        </Link>
      </div>
    </div>
  );
}

export default adminPage;
