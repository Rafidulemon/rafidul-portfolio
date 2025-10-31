import { useState, useEffect } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaCopy } from "react-icons/fa";

const SocialShare = ({ title }: { title: string }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Set full URL client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render only after currentUrl is set
  if (!currentUrl) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center space-x-3">
      <span className="mr-2 font-medium text-gray-700 dark:text-gray-300">
        Share this blog:
      </span>
      <FacebookShareButton url={currentUrl} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={currentUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <button
        onClick={handleCopy}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white transition duration-200 hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        <FaCopy size={20} className="dark:text-black text-black" />
      </button>
      {copied && <span className="text-green-500 text-sm ml-2">Link Copied!</span>}
    </div>
  );
};

export default SocialShare;
