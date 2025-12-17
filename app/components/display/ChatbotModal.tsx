"use client";

import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSend } from "react-icons/io";
import {
  BsMicFill,
  BsMicMuteFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
} from "react-icons/bs";

type SpeechRecognitionWindow = Window &
  typeof globalThis & {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  };

const ChatbotModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  type ChatMessage = { sender: "user" | "bot"; text: string };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasStartedChatting, setHasStartedChatting] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const handleSendMessageRef = useRef<(overrideText?: string) => void>();
  const botMessageIndexRef = useRef<number | null>(null);
  const shouldSpeakNextReplyRef = useRef(false);
  const personaResponseText =
    "I am Md Rafidul Islam, a full-stack developer sharing my work through this chat.";
  const personaReplyPatterns = [
    /\bwho\s+are\s+you\b/i,
    /\bwho\s+is\s+this\b/i,
    /\bwho'?s\s+this\b/i,
    /\bwhat\s+is\s+your\s+name\b/i,
    /\bwhat'?s\s+your\s+name\b/i,
    /\bintroduce\s+yourself\b/i,
    /\btell\s+me\s+about\s+yourself\b/i,
    /\bwho\s+am\s+i\s+talking\s+to\b/i,
  ];
  const sendMessageToEndpoint = async (endpoint: string, text: string) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
      throw new Error(
        `Request to ${endpoint} failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data.reply || "Sorry, no response received.";
  };

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  };

  const getPersonaReply = (text: string) =>
    personaReplyPatterns.some((pattern) => pattern.test(text))
      ? personaResponseText
      : null;

  const pickMaleVoice = (voices: SpeechSynthesisVoice[]) => {
    const hints = [
      "male",
      "daniel",
      "david",
      "mark",
      "mike",
      "fred",
      "alex",
      "james",
      "george",
    ];
    const isEnglish = (voice: SpeechSynthesisVoice) =>
      voice.lang?.toLowerCase().startsWith("en");
    const hasMaleHint = (voice: SpeechSynthesisVoice) =>
      hints.some((hint) => voice.name?.toLowerCase().includes(hint));

    return (
      voices.find((voice) => isEnglish(voice) && hasMaleHint(voice)) ??
      voices.find(hasMaleHint) ??
      voices.find(isEnglish)
    );
  };

  const speakReply = (text: string) => {
    if (
      !text.trim() ||
      !speechSynthesisSupported ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const availableVoices = window.speechSynthesis.getVoices();
    const preferredVoice = pickMaleVoice(availableVoices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const faq = [
    {
      question: "What services do you offer?",
      answer:
        "I build full-stack products with Next.js, TypeScript, tRPC, Prisma, and Tailwind CSS—covering everything from UI/UX to production deployment.",
    },
    {
      question: "Can I hire you for contract work?",
      answer:
        "Yes! I take on freelance and contract engagements. Share your timeline and scope via the contact page or here in chat.",
    },
    {
      question: "Which recent projects are you proud of?",
      answer:
        "I recently shipped MoeGuide, Suirikyou, and Raggie—SaaS products that mix AI assistants, subscription billing, and complex dashboards.",
    },
    {
      question: "Do you have experience with AI integrations?",
      answer:
        "Absolutely. I have hands-on experience with OpenAI, LangChain, Pinecone, and custom RAG pipelines for production apps.",
    },
    {
      question: "How quickly can you start?",
      answer:
        "I can usually kick off within two weeks. Let me know the deliverables and we can align on a schedule.",
    },
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognitionClass =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event: any) => {
        const transcript =
          event?.results?.[0]?.[0]?.transcript?.toString().trim() || "";
        if (transcript) {
          shouldSpeakNextReplyRef.current = true;
          setInputValue(transcript);
          handleSendMessageRef.current?.(transcript);
        }
      };
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onstart = () => {
        setIsVoiceEnabled((prev) => (prev ? prev : true));
        setIsListening(true);
      };
      recognitionRef.current = recognition;
    }

    setSpeechRecognitionSupported(!!SpeechRecognitionClass);
    setSpeechSynthesisSupported(
      typeof speechWindow.speechSynthesis !== "undefined"
    );

    return () => {
      recognitionRef.current?.stop?.();
      speechWindow.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    } else {
      recognitionRef.current?.stop?.();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsListening(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isVoiceEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isVoiceEnabled]);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? inputValue).trim();
    if (!textToSend) return;

    stopSpeaking();

    const shouldSpeakResponse =
      isVoiceEnabled || shouldSpeakNextReplyRef.current;
    shouldSpeakNextReplyRef.current = false;

    const userMessage: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setHasStartedChatting(true);

    const personaReply = getPersonaReply(textToSend);
    if (personaReply) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: personaReply } as ChatMessage,
      ]);
      if (shouldSpeakResponse) {
        speakReply(personaReply);
      }
      return;
    }

    // Add placeholder for bot typing
    setMessages((prev) => {
      const updated: ChatMessage[] = [
        ...prev,
        { sender: "bot", text: "" } as ChatMessage,
      ];
      botMessageIndexRef.current = updated.length - 1;
      return updated;
    });

    try {
      let botReply = "";
      try {
        botReply = await sendMessageToEndpoint("/api/openai", textToSend);
      } catch (primaryError) {
        console.error(
          "OpenAI endpoint failed, falling back to /api/chat:",
          primaryError
        );
        botReply = await sendMessageToEndpoint("/api/chat", textToSend);
      }

      if (shouldSpeakResponse) {
        speakReply(botReply);
      }

      // Typing effect logic
      let currentText = "";
      for (let i = 0; i < botReply.length; i++) {
        currentText += botReply[i];
        const targetIndex = botMessageIndexRef.current;
        if (targetIndex === null) break;
        setMessages((prev) => {
          if (!prev[targetIndex]) return prev;
          const updated = [...prev];
          updated[targetIndex] = {
            ...updated[targetIndex],
            text: currentText,
          };
          return updated;
        });
        await new Promise((resolve) => setTimeout(resolve, 20)); // 20ms per character
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const fallbackMessage = "Failed to get a response. Please try again.";
      setMessages((prev) => {
        const targetIndex = botMessageIndexRef.current;
        if (targetIndex === null || !prev[targetIndex]) {
          return [
            ...prev,
            { sender: "bot", text: fallbackMessage } as ChatMessage,
          ];
        }
        const updated = [...prev];
        updated[targetIndex] = {
          sender: "bot",
          text: fallbackMessage,
        } as ChatMessage;
        return updated;
      });
    } finally {
      botMessageIndexRef.current = null;
    }
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  const handleMicrophoneToggle = () => {
    if (!speechRecognitionSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      setIsVoiceEnabled(true);
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Unable to start voice recognition:", error);
      setIsListening(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!speechSynthesisSupported) return;

    setIsVoiceEnabled((prev) => {
      const next = !prev;
      if (!next && typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const handleFaqClick = (answer: string) => {
    const botResponse: ChatMessage = { sender: "bot", text: answer };
    setMessages((prev) => [...prev, botResponse]);
    setHasStartedChatting(true); // Hide common questions
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio chat assistant"
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
            <Link
              href={"/"}
              className="flex flex-row gap-2 md:gap-4 items-center"
            >
              <div className="w-12 h-12 md:w-[70px] md:h-[70px] dark:bg-black bg-white rounded-full shadow-md dark:shadow-primary shadow-gray-500">
                <Image
                  src="/images/chat.png"
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
                      src="/images/chat.png"
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
            <div className="flex items-center gap-1 md:gap-2 ml-2">
              <button
                type="button"
                onClick={handleVoiceToggle}
                disabled={!speechSynthesisSupported}
                title={
                  speechSynthesisSupported
                    ? isVoiceEnabled
                      ? "Mute spoken replies"
                      : "Enable spoken replies"
                    : "Voice playback not supported in this browser"
                }
                className={`p-2 rounded-full transition-colors ${
                  isVoiceEnabled ? "text-primary" : "text-gray-500"
                } ${
                  speechSynthesisSupported
                    ? "hover:text-primary_dark"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                {isVoiceEnabled ? (
                  <BsVolumeUpFill size={18} />
                ) : (
                  <BsVolumeMuteFill size={18} />
                )}
              </button>
              <button
                type="button"
                onClick={handleMicrophoneToggle}
                disabled={!speechRecognitionSupported}
                title={
                  speechRecognitionSupported
                    ? isListening
                      ? "Stop voice input"
                      : "Speak to Rafid"
                    : "Voice input not supported in this browser"
                }
                className={`p-2 rounded-full transition-colors ${
                  isListening ? "bg-red-600 text-white" : "text-primary"
                } ${
                  speechRecognitionSupported
                    ? "hover:text-primary_dark"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                {isListening ? (
                  <BsMicMuteFill size={18} />
                ) : (
                  <BsMicFill size={18} />
                )}
              </button>
              <button
                type="button"
                className="my-2 w-fit text-primary hover:text-primary_dark"
                onClick={() => handleSendMessage()}
              >
                <IoMdSend size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
