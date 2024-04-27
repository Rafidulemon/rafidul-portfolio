"use client";

import React from "react";
import Link from "next/link";
import { Text } from "../typography/Text";
import { Flex } from "../layout/Flex";
import { usePathname } from 'next/navigation'

const navs = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
function NavLink() {
  const path = usePathname()
  return (
    <div className="w-full flex justify-end md:gap-4 lg:gap-8 xl:gap-12">
      {navs.map((pathlink, index) => (
        <div key={index}>
          <Link href={`${pathlink.href}`}>
            <Flex
              direction="row"
              className={path === pathlink.href ? "text-cyan-500 font-bold underline" : "hover:text-cyan-500 hover:font-bold hover:underline"}
            >
              <Text text={pathlink.title} />
            </Flex>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NavLink;
