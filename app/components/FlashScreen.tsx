import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FlashScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.9 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-black backdrop-blur-md px-4 md:px-8 rounded-2xl shadow-lg shadow-primary text-white text-center max-w-4xl w-full"
      >
        <div className="grid grid-cols-2 items-center gap-6 md:gap-10">
          {/* Left Side - Text & Loader */}
          <div className="flex flex-col h-full items-center justify-between md:justify-center gap-6">
            {/* Title */}
            {showText && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-4xl font-bold tracking-wide"
              >
                Welcome to My Portfolio!
              </motion.h1>
            )}

            {/* Description */}
            {showText && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="text-base md:text-lg text-gray-300"
              >
                Exploring my works and expertise.
              </motion.p>
            )}

            {/* Animated Loader */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-white animate-ping"></div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}

            className="flex justify-center md:justify-end"
          >
            <div className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <Image
                src="/images/hero-image.png"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlashScreen;
