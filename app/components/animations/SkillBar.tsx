"use client";

import { useEffect, useState, useRef } from "react";

interface SkillBarProps {
  label: string;
  level: number;
}

const SkillBar = ({ label, level }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const bgColorRef = useRef<string>("");

  useEffect(() => {
    const animationTime = 1000; // Animation duration in milliseconds
    const maxWidth = level;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const increment = (progress / animationTime) * maxWidth;

      if (increment < maxWidth) {
        setWidth(increment);
        requestAnimationFrame(animate);
      } else {
        setWidth(maxWidth);
      }
    };

    requestAnimationFrame(animate);

    // Determine background color based on the level
    let bgColor = "";
    if (level < 60) {
      bgColor = "bg-gradient-to-br from-red-400 to-red-800";
    } else if (level < 70) {
      bgColor = "bg-gradient-to-br from-yellow-400 to-yellow-800";
    } else if (level < 80) {
      bgColor = "bg-gradient-to-br from-blue-400 to-blue-800";
    } else {
      bgColor = "bg-gradient-to-br from-cyan-400 to-cyan-800";
    }
    bgColorRef.current = bgColor;
  }, [level]);

  return (
    <div className="mb-6">
      {/* Label and Percentage */}
      <div className="flex justify-between items-center mb-2">
        <p className="dark:text-black text-white text-[14px] md:text-[16px]">{label}</p>
        <span className="dark:text-black text-white text-[14px] md:text-[16px]">
          {Math.round(width)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="dark:bg-gray-300 bg-white h-2 md:h-3 lg:h-4 w-full rounded-full">
        <div
          className={`h-2 md:h-3 lg:h-4 rounded-full ${bgColorRef.current}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
