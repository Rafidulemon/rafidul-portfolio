"use client";

import { useState } from "react";
import ChatbotModal from "./ChatbotModal";

export default function ChatIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-b from-cyan-800 to-cyan-400 text-white text-sm font-semibold shadow-lg p-1 md:p-2 cursor-pointer rounded-l-lg"
        onClick={toggleModal}
      >
        <div className="flex flex-col items-center space-y-1">
          <span>A</span>
          <span>S</span>
          <span>K</span>
          <span>M</span>
          <span>E</span>
        </div>
      </div>
      <ChatbotModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}
