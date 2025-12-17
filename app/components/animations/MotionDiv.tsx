"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      className={className}
    >
      <div
        className={`relative flex items-center justify-center rounded-full ${
          isCircularBorder ? "border border-[6px] border-cyan-600" : ""
        }`}
        style={{
          width: height_width,
          maxWidth: "100%",
          aspectRatio: "1 / 1",
          background: isTransparentBG ? "transparent" : background,
        }}
      >
        <Image
          src={src}
          alt="hero image"
          width={height_width}
          height={height_width}
          className={`${
            isRoundedImage ? "h-full w-full object-cover  rounded-full" : ""
          }`}
        />
      </div>
    </motion.div>
  );
};

export default MotionDiv;
