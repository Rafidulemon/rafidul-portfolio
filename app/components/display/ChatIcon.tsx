"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import ChatbotModal from "./ChatbotModal";

export default function ChatIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const pulseVariants: Variants = {
    initial: { scale: 1, y: 0 },
    attention: {
      scale: [1, 1.08, 1],
      y: [0, -6, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open AI chat"
        onClick={toggleModal}
        variants={pulseVariants}
        initial="initial"
        animate="attention"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-1 md:gap-2 rounded-full border border-white/10 bg-gradient-to-tr from-primary_dark to-cyan-600 pr-2 text-white shadow-xl shadow-cyan-500/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/60"
      >
        <Image
          src="/images/chat.png"
          alt="Chat icon"
          width={40}
          height={40}
        />
        <span className="text-sm font-normal uppercase tracking-wide pr-2">
          Meet my AI
        </span>
      </motion.button>
      <ChatbotModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}
