"use client";

import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
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
import Markdown from "../chat/Markdown";
import ChatCards, { parseReply } from "../chat/ChatCards";

type SpeechRecognitionWindow = Window &
  typeof globalThis & {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  };

type ChatMessage = { sender: "user" | "bot"; text: string };

const STORAGE_KEY = "chatMessages";
const MAX_INPUT_CHARS = 500;

const faq = [
  {
    question: "What services do you offer?",
    answer:
      "I build full-stack products with Next.js, TypeScript, tRPC, Prisma, and Tailwind CSS—covering everything from UI/UX to production deployment.",
  },
  {
    question: "Can I hire you for contract work?",
    answer:
      "Yes! I take on freelance and contract engagements. Share your timeline and scope via the contact page or here in chat.\n\n[[contact]]",
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

const ChatbotModal = ({
  isOpen,
  onClose,
  initialPrompt,
  onPromptConsumed,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const handleSendMessageRef = useRef<(overrideText?: string) => void>();
  const shouldSpeakNextReplyRef = useRef(false);

  messagesRef.current = messages;

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  };

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

  const speakReply = (rawText: string) => {
    const text = parseReply(rawText)
      .text.replace(/[*`#]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    if (
      !text.trim() ||
      !speechSynthesisSupported ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const preferredVoice = pickMaleVoice(window.speechSynthesis.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Restore saved chat once. (Previously the save effect ran first and wiped it.)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
    setStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(t);
    }
    setIsVisible(false);
  }, [isOpen]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    if (storageLoaded && !isStreaming) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      } catch {
        // storage full or blocked
      }
    }
  }, [messages, storageLoaded, isStreaming]);

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
      abortRef.current?.abort();
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

  const setBotText = (index: number, text: string) =>
    setMessages((prev) => {
      if (!prev[index]) return prev;
      const updated = [...prev];
      updated[index] = { sender: "bot", text };
      return updated;
    });

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? inputValue).trim().slice(0, MAX_INPUT_CHARS);
    if (!textToSend || isStreaming) return;

    stopSpeaking();

    const shouldSpeakResponse =
      isVoiceEnabled || shouldSpeakNextReplyRef.current;
    shouldSpeakNextReplyRef.current = false;

    const base = messagesRef.current;
    const botIndex = base.length + 1;
    // Send the last few turns so follow-ups like "tell me more" work.
    const history = [...base, { sender: "user", text: textToSend } as ChatMessage]
      .filter((m) => m.text.trim())
      .slice(-9)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: parseReply(m.text).text || m.text,
      }));

    setMessages([
      ...base,
      { sender: "user", text: textToSend },
      { sender: "bot", text: "" },
    ]);
    setInputValue("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        const data = await response.json().catch(() => ({}));
        setBotText(botIndex, data.error || "You're sending messages too fast. Please wait a moment.");
        return;
      }

      let finalText = "";

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const evt = JSON.parse(line);
              if (typeof evt.d === "string") {
                finalText += evt.d;
                setBotText(botIndex, finalText);
              }
            } catch {
              // ignore a malformed line
            }
          }
        }
      } else {
        // AI unavailable: fall back to the keyword matcher so the chat still answers.
        const fallback = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
          signal: controller.signal,
        });
        const data = fallback.ok ? await fallback.json() : null;
        finalText = data?.reply || "Sorry, I couldn't get a response. Please try again.";
        setBotText(botIndex, finalText);
      }

      if (!finalText.trim()) {
        setBotText(botIndex, "Sorry, I couldn't get a response. Please try again.");
      } else if (shouldSpeakResponse) {
        speakReply(finalText);
      }
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return;
      console.error("Error fetching AI response:", error);
      setBotText(botIndex, "Failed to get a response. Please try again.");
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  // Prompts sent from elsewhere on the site ("Ask AI about this project", hero chips).
  useEffect(() => {
    if (!isOpen || !initialPrompt) return;
    const t = setTimeout(() => {
      handleSendMessageRef.current?.(initialPrompt);
      onPromptConsumed?.();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  const handleClear = () => {
    abortRef.current?.abort();
    stopSpeaking();
    setMessages([]);
    setIsStreaming(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

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

  const handleFaqClick = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: answer },
    ]);
  };

  const hasStartedChatting = messages.length > 0;

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
        <div className="absolute top-3 right-3 flex items-center gap-4">
          {hasStartedChatting && (
            <button
              onClick={handleClear}
              aria-label="Clear chat"
              title="Clear chat"
              className="text-gray-600 hover:text-red-500 dark:text-gray-300"
            >
              <FaRegTrashAlt size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-gray-800 dark:text-white hover:text-gray-500"
          >
            <FaTimes size={24} />
          </button>
        </div>

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
                Rafid&apos;s AI assistant
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex flex-col overflow-y-auto my-6 h-[74%] scrollbar-hidden"
        >
          {!hasStartedChatting && (
            <div className="space-y-4 mb-4">
              <div className="text-sm text-gray-800 dark:text-gray-200">
                Common questions are:
              </div>
              <div className="space-y-2">
                {faq.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className="block text-left cursor-pointer w-full bg-gradient-to-l dark:from-gray-900 dark:to-black from-cyan-900 to-primary_dark px-4 py-1 md:py-2 rounded-lg text-white shadow-md"
                    onClick={() => handleFaqClick(item.question, item.answer)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => {
            const isBot = message.sender === "bot";
            const parsed = isBot ? parseReply(message.text) : null;
            const isLastBot = isBot && index === messages.length - 1;
            return (
              <div
                key={index}
                className={`flex ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="flex items-start mr-2 mt-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
                      <Image
                        src="/images/chat.png"
                        alt="Assistant"
                        width={30}
                        height={30}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`${
                    isBot
                      ? "dark:bg-gray-800 dark:text-white bg-gray-100 text-black"
                      : "bg-primary_dark text-white whitespace-pre-wrap"
                  } p-3 my-1 md:my-2 rounded-lg max-w-[80%] break-words text-sm md:text-base`}
                >
                  {isBot && parsed ? (
                    <>
                      {parsed.text ? (
                        <Markdown text={parsed.text} />
                      ) : isLastBot && isStreaming ? (
                        <span className="animate-pulse" aria-label="Typing">
                          ● ● ●
                        </span>
                      ) : null}
                      <ChatCards cards={parsed.cards} />
                    </>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="absolute bottom-3 left-0 right-0 px-4 md:px-6">
          <div className="flex items-center w-full px-2 md:px-3 rounded-md md:rounded-lg text-black dark:text-white bg-white dark:bg-black border border-primary">
            <input
              type="text"
              className="w-full focus:outline-none bg-white dark:bg-black"
              placeholder="Type your message..."
              aria-label="Message"
              maxLength={MAX_INPUT_CHARS}
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
                aria-label={isVoiceEnabled ? "Mute spoken replies" : "Enable spoken replies"}
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
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
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
                aria-label="Send message"
                disabled={isStreaming}
                className="my-2 w-fit text-primary hover:text-primary_dark disabled:opacity-40"
                onClick={() => handleSendMessage()}
              >
                <IoMdSend size={24} />
              </button>
            </div>
          </div>
          <p className="mt-1 text-center text-[11px] text-gray-500 dark:text-gray-400">
            AI assistant answering from my portfolio. It can make mistakes, so
            please verify important details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
