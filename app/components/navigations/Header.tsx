"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
import { Text } from "../typography/Text";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full fixed bg-black top-0 left-0 right-0 z-10">
        <div className="justify-between px-6 mx-auto md:items-center md:flex md:px-10">
          <div>
            <div className="flex items-center justify-between py-3 md:block">
              {/* LOGO */}
              <Link href={"/"}>
                <Text
                  text="Rafid"
                  className="tracking-widest text-cyan-500 text-[24px] md:text-[30px] lg:text-[35px] xl:text-[40px] animate-pulse"
                  isNosifer
                  isBold
                />
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
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
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex md:gap-8 lg:gap-12 xl:gap-16 md:pt-5">
                <li
                  className={`pb-6 text-xl 
                ${
                  path === "/" ? "text-cyan-500" : "text-white"
                }  text-center border-b-2 md:border-b-0 hover:bg-cyan-600 border-cyan-900 md:hover:text-cyan-600 md:hover:bg-transparent`}
                >
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    <Text text ="Home" />
                  </Link>
                </li>
                <li
                  className={`pb-6 text-xl 
                ${
                  path === "/about" ? "text-cyan-500" : "text-white"
                }  text-center border-b-2 md:border-b-0 hover:bg-cyan-600 border-cyan-900 md:hover:text-cyan-600 md:hover:bg-transparent`}
                >
                  <Link href="/about" onClick={() => setNavbar(!navbar)}>
                    <Text text="About" />
                  </Link>
                </li>
                <li
                  className={`pb-6 text-xl 
                ${
                  path === "/services" ? "text-cyan-500" : "text-white"
                }  text-center border-b-2 md:border-b-0 hover:bg-cyan-600 border-cyan-900 md:hover:text-cyan-600 md:hover:bg-transparent`}
                >
                  <Link href="/services" onClick={() => setNavbar(!navbar)}>
                    <Text text="Services"/>
                  </Link>
                </li>
                <li
                  className={`pb-6 text-xl 
                ${
                  path === "/blogs" ? "text-cyan-500" : "text-white"
                }  text-center border-b-2 md:border-b-0 hover:bg-cyan-600 border-cyan-900 md:hover:text-cyan-600 md:hover:bg-transparent`}
                >
                  <Link href="/blogs" onClick={() => setNavbar(!navbar)}>
                    <Text text="Blogs" />
                  </Link>
                </li>
                <li
                  className={`pb-6 text-xl 
                ${
                  path === "/contact" ? "text-cyan-500" : "text-white"
                }  text-center border-b-2 md:border-b-0 hover:bg-cyan-600 border-cyan-900 md:hover:text-cyan-600 md:hover:bg-transparent`}
                >
                  <Link href="/contact" onClick={() => setNavbar(!navbar)}>
                    <Text text="Contact" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
