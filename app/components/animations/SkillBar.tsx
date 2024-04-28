"use client";
import { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  label: string;
  level: number;
}

const SkillBar = ({ label, level }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const bgColorRef = useRef<string>('');

  useEffect(() => {
    const animationTime = 1000;
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
    let bgColor = '';
    if (level < 50) {
      bgColor = 'bg-cyan-200';
    } else if (level < 70) {
      bgColor = 'bg-cyan-500';
    } else if (level < 80) {
      bgColor = 'bg-cyan-700';
    } else {
      bgColor = 'bg-cyan-800';
    }
    bgColorRef.current = bgColor;
  }, [level]);

  return (
    <div className="mb-4">
      <p className="mb-2 text-white">{label}</p>
      <div className={`bg-cyan-100 h-4 w-full rounded-full`}>
        <div
          className={`h-4 rounded-full ${bgColorRef.current}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;

