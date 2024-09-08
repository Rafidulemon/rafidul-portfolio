"use client";

import React from "react";
import MotionDiv from "../animations/MotionDiv";
import { Text } from "../typography/Text";
import { CgProfile } from "react-icons/cg";
import { SiHyperskill } from "react-icons/si";
import { MdMiscellaneousServices, MdDashboard } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { LiaBlogSolid } from "react-icons/lia";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftMenu() {
  const path = usePathname();

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#212F3C] w-full items-center md:gap-2 xl:gap-4 px-10">
      <div className="flex flex-row items-center justify-center mt-2">
        <MotionDiv
          src="/images/hero-image.png"
          isTransparentBG
          isRoundedImage
          className="xl:w-[200px] lg:w-[160px] md:w-[120px]"
        />
      </div>
      <Text
        text="Rafid"
        className="text-white md:text-[20px] lg:text-[24px] xl:text-[30px]"
        isNosifer
        isBold
      />
      <div className="w-full flex flex-row items-center md:mb-6 lg:mb-8 xl:mb-10 md:text-[16px] lg:text-[18px] xl:text-[20px]">
        <div className="mt-4 xl:mt-6 w-full flex flex-col items-start md:gap-2 lg:gap-4 xl:gap-6 text-bold">
          <Link
            href={"/admin"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <MdDashboard size={28} />
            <Text text="Dashboard" />
          </Link>

          <Link
            href={"/admin/profile"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin/profile"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <CgProfile size={28} />
            <Text text="Profile" />
          </Link>

          <Link
            href={"/admin/skills"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin/skills"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <SiHyperskill size={28} />
            <Text text="Skills" />
          </Link>

          <Link
            href={"/admin/services"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin/services"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <MdMiscellaneousServices size={28} />
            <Text text="Services" />
          </Link>

          <Link
            href={"/admin/projects"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin/projects"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <GrProjects size={28} />
            <Text text="Projects" />
          </Link>

          <Link
            href={"/admin/blogs"}
            className={`flex flex-row w-full p-2 gap-4  ${
              path === "/admin/blogs"
                ? "bg-gradient-to-br from-cyan-500 to-teal-700"
                : "hover:text-cyan-500"
            }`}
          >
            <LiaBlogSolid size={28} />
            <Text text="Blogs" />
          </Link>
        </div>
      </div>
      <Link
        href={"/auth/login"}
        className="w-full bg-gradient-to-br from-cyan-500 to-teal-700 p-2 flex flex-row items-center mb-4"
      >
        <div className="flex flex-row items-center w-full justify-center gap-4">
          <TbLogout size={28} />
          <Text text="Logout" />
        </div>
      </Link>
    </div>
  );
}

export default LeftMenu;
