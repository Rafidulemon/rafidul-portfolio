"use client";

import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSend } from "react-icons/io";

const ChatbotModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasStartedChatting, setHasStartedChatting] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const faq = [
    { question: "What is AI?", answer: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence." },
    { question: "How to create a website?", answer: "To create a website, you'll need a domain, hosting, and a development platform like Next.js or WordPress." },
    { question: "How can I promote my company?", answer: "You can promote your company using social media marketing, SEO, and targeted ads." },
    { question: "What are the best tools for productivity?", answer: "Popular tools include Notion, Slack, Trello, and Google Workspace." },
    { question: "How to start a career in web development?", answer: "Start by learning HTML, CSS, and JavaScript, then move to frameworks like React or Next.js." },
  ];

  useEffect(() => {
    // Load saved messages from localStorage when the modal opens
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever the messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    // Save messages to localStorage whenever they change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { sender: "user" as "user", text: inputValue.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue(""); // Clear input field
      setHasStartedChatting(true); // Hide common questions
  
      // Show bot typing indicator
      setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);
  
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage.text }),
        });
  
        const data = await response.json();
  
        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove "Typing..."
          { sender: "bot", text: data.reply || "Sorry, no response received." },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove "Typing..."
          { sender: "bot", text: "Failed to get a response. Please try again." },
        ]);
      }
    }
  };
  

  const handleFaqClick = (answer: string) => {
    const botResponse = { sender: "bot" as "bot", text: answer };
    setMessages((prev) => [...prev, botResponse]);
    setHasStartedChatting(true); // Hide common questions
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[30%] dark:bg-[#111111] bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-1000 z-50`}
    >
      <div
        className={`relative h-full p-6 transform transition-opacity duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-800 dark:text-white hover:text-gray-200"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href={"/"} className="flex flex-row gap-2 md:gap-4 items-center">
              <div className="w-12 h-12 md:w-[70px] md:h-[70px] dark:bg-black bg-white rounded-full shadow-md dark:shadow-primary shadow-gray-500">
                <Image
                  src="/images/hero-image.png"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
            <div className="ml-4">
              <h3 className="font-semibold text-xl text-primary_dark dark:text-white">
                Ask Me
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                How can I assist you today?
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className={`flex flex-col overflow-y-auto my-6 h-[80%] space-y scrollbar-hidden`}
        >
          {/* Show Common Questions if chat hasn't started */}
          {!hasStartedChatting && (
            <div className="space-y-4 mb-4">
              <div className="text-sm text-gray-800 dark:text-gray-200">
                Common questions are:
              </div>
              <div className="space-y-2">
                {faq.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer w-full bg-gradient-to-l dark:from-gray-900 dark:to-black from-cyan-900 to-primary_dark px-4 py-1 md:py-2 rounded-lg text-white shadow-md"
                    onClick={() => handleFaqClick(item.answer)}
                  >
                    {item.question}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Chat Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex items-center mr-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
                    <Image
                      src="/images/hero-image.png"
                      alt="Logo"
                      width={30}
                      height={30}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              )}
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-primary_dark text-white"
                    : "dark:bg-gray-800 dark:text-white bg-gray-100 text-black"
                } p-3 my-1 md:my-2 rounded-lg max-w-[75%] break-words whitespace-pre-wrap`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="absolute bottom-4 left-0 right-0 px-4 md:px-6">
          <div className="flex items-center w-full px-2 md:px-3 rounded-md md:rounded-lg text-black dark:text-white bg-white dark:bg-black border border-primary">
            <input
              type="text"
              className="w-full focus:outline-none bg-white dark:bg-black"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              className="my-2 w-fit text-primary hover:text-primary_dark"
              onClick={handleSendMessage}
            >
              <IoMdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
