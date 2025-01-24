"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
import { Text } from "../typography/Text";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const NAV_ITEMS = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/projects", name: "Projects" },
  { path: "/services", name: "Services" },
  { path: "/blogs", name: "Blogs" },
  { path: "/contact", name: "Contact" },
];

const Header = () => {
  const path = usePathname();
  const { resolvedTheme, theme, setTheme } = useTheme();

  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <nav className="w-full dark:bg-white bg-[#111111] border-b border-gray-200 dark:border-primary">
        <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-10">
          {/* Logo Section */}
          <div>
            <div className="flex items-center justify-between py-3 md:block">
              <Link
                href={"/"}
                className="flex flex-row gap-2 md:gap-4 items-center"
              >
                <div className="w-12 h-12 md:w-[70px] md:h-[70px] bg-black dark:bg-white rounded-full shadow-md shadow-primary dark:shadow-gray-500">
                  <Image
                    src="/images/hero-image.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Text
                  text="RAFID"
                  className="text-cyan-600 text-[24px] font-[600]  hidden md:flex"
                  isPoppins
                />
              </Link>
              {/* Hamburger Menu */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-md outline-none"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <IoCloseCircleSharp size={30} color="#00BCD4" />
                  ) : (
                    <IoMenu size={30} color="#00BCD4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`fixed top-0 right-0 h-full z-20 bg-[#111111] dark:bg-white transition-transform duration-500 ease-in-out ${
              navbar ? "translate-x-0" : "translate-x-full"
            } w-[60%] md:w-auto md:static md:translate-x-0`}
          >
            <div className="md:hidden flex flex-row p-4 w-full justify-between items-center">
              <Link
                href={"/"}
                className="flex flex-row gap-2 md:gap-4 items-center"
              >
                <Text
                  text="RAFID"
                  className="text-cyan-600 text-[16px] font-[600]"
                  isPoppins
                />
              </Link>
              <div
                className="flex flex-col items-center justify-center cursor-pointer text-primary dark:text-black text-3xl"
                onClick={() => setNavbar(false)}
              >
                <IoCloseCircleSharp />
              </div>
            </div>
            <ul className="h-full md:h-auto items-center justify-start md:justify-center flex flex-col md:flex-row md:gap-8 lg:gap-12 xl:gap-16">
              {NAV_ITEMS.map(({ path: itemPath, name }) => (
                <li
                  key={itemPath}
                  className={`py-4 md:py-0 md:text-xl text-center transition-colors duration-300 ${
                    path === itemPath
                      ? "text-cyan-500"
                      : "text-white dark:text-black"
                  } hover:text-cyan-600 md:hover:text-cyan-600 border-cyan-900 dark:border-primary`}
                >
                  <Link href={itemPath} onClick={() => setNavbar(false)}>
                    <Text text={name} />
                  </Link>
                </li>
              ))}

              {/* Theme Toggle */}
              <li
                className="hidden md:block cursor-pointer py-4 md:py-0 md:text-[30px] text-center border-b-2 md:border-b-0 text-yellow-500"
                onClick={() => {
                  setTheme(resolvedTheme === "light" ? "dark" : "light");
                }}
              >
                {resolvedTheme === "dark" ? <MdDarkMode /> : <MdLightMode />}
              </li>
              <li
                className="mt-10 md:hidden flex flex-row items-center justify-center gap-6 cursor-pointer py-4 text-center"
                onClick={() => {
                  setTheme(resolvedTheme === "light" ? "dark" : "light");
                }}
              >
                <div
                  className={`flex flex-row gap-1 h-full items-center justify-center ${
                    theme === "dark" ? "text-black" : "text-yellow-500"
                  }`}
                >
                  <MdDarkMode />
                  <Text text="Dark" />
                </div>

                <div
                  className={`flex flex-row gap-1 h-full items-center justify-center ${
                    theme === "light" ? "text-white" : "text-yellow-500"
                  }`}
                >
                  <MdLightMode />
                  <Text text="Light" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
