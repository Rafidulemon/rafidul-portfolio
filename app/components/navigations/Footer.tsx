import React from "react";
import { Text } from "../typography/Text";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Line } from "../display/Line";

function Footer() {
  return (
    <div className="flex w-full flex-col items-center justify-center pb-6 bg-[#111111]">
      <Line className="border-white mb-4" />
      <Text text="Get in Touch" className="w-full text-white text-center text-[16px] md:text-[24px]" isBold/>
      <div className="flex w-full flex-row items-center justify-center mt-6 gap-x-8 mb-10">
        <a href="https://www.facebook.com/" target="_blank">
          <FaFacebook size={30} color="#1877F2" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <FaInstagram size={30} color="#E1306C" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <FaGithub size={30} color="#FFFFFF"/>
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <FaTwitter size={30} color="#1DA1F2" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <FaLinkedin size={30} color="#0077B5" />
        </a>
      </div>
      <Text
        text="Copyright © 2024 My Portfolio. All rights reserved."
        className="text-center text-[12px] text-gray-400"
      />
    </div>
  );
}

export default Footer;
