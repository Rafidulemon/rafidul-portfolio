"use client";

import React from "react";
import { Text } from "../typography/Text";
import { Line } from "../display/Line";
import SocialIcons from "../display/SocialIcons";
import type { SocialLink } from "@/types/content";

function Footer({ socials, ownerName }: { socials: SocialLink[]; ownerName: string }) {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center pb-6 bg-white dark:bg-[#111111]">
        <Line className="border-b dark:border-gray-200 border-primary mb-4" />
        <Text
          text="Get in Touch"
          className="w-full text-primary dark:text-white text-center text-[16px] md:text-[24px]"
          isBold
        />
        <SocialIcons socials={socials} size={30} className="mt-6 mb-10 gap-x-8" />
        <Text
          text={`Copyright © ${new Date().getFullYear()} ${ownerName}. All rights reserved.`}
          className="text-center text-[12px] text-gray-400"
        />
      </div>
    </div>
  );
}

export default Footer;
