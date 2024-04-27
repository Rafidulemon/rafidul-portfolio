"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type ReactNode } from "react";

type TitleProps = {
  src?: string;
  className?: string;
  height_width?: number;
  background?: string;
  isCircularBorder?: boolean;
  isTransparentBG?: boolean;
  isRoundedImage?: boolean;
};

const MotionDiv = (props: TitleProps) => {
  const {
    src = "",
    className,
    height_width = 550,
    background = "#181818",
    isCircularBorder = false,
    isTransparentBG = false,
    isRoundedImage = false,
  } = props;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${className}`}
    >
      <div
        className={`rounded-full ${isCircularBorder ? "border border-[6px] border-cyan-600" : ""} 
        ${isTransparentBG ? "" : `bg-[${background}]`}
        w-[${height_width}px] h-[${height_width}px] relative`}
      >
        <Image
          src={src}
          alt="hero image"
          width={height_width}
          height={height_width}
          className={`${isRoundedImage ? "rounded-full" : ""}`}
        />
      </div>
    </motion.div>
  );
};

export default MotionDiv;
