"use client";
import * as React from "react";
import { type ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  theme?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isWidthFull?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button(props: Props) {
  const {
    children,
    className,
    theme = "primary",
    onClick,
    isWidthFull = false,
    type = "button", // Default type to "button"
  } = props;

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const lastClickTimestamp = React.useRef<number>(0);

  const debouncedOnClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const now = Date.now();
      if (now - lastClickTimestamp.current > 200) {
        if (onClick) {
          onClick(e);
        }
      }
      lastClickTimestamp.current = now;
    },
    [onClick]
  );

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => {
        setIsClicked(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isClicked]);

  return (
    <button
      type={type} // Set the button type here
      onClick={(e) => {
        setIsClicked(true);
        debouncedOnClick(e);
      }}
      className={`${isWidthFull ? "w-full" : "w-fit"} ${className ?? ""}`}
    >
      {theme === "secondary" && (
        <div
          className={`rounded-xl md:rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 hover:bg-slate-800 text-primary dark:text-white ${
            isWidthFull ? "flex w-full" : "inline-flex"
          } items-center justify-center px-[2px] py-[2px] md:px-1 md:py-1`}
        >
          <span
            className={`bg-white dark:bg-black dark:hover:bg-black rounded-xl md:rounded-full px-5 py-1 md:py-2 flex flex-col justify-center text-center ${
              isWidthFull ? "w-full" : ""
            }`}
          >
            {children}
          </span>
        </div>
      )}

      {theme === "primary" && (
        <div
          className={`rounded-xl md:rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 hover:bg-slate-200 text-white ${
            isWidthFull ? "flex w-full" : "inline-flex"
          } items-center justify-center px-6 py-2 md:py-3`}
        >
          <span className="flex flex-col items-center justify-center text-center">
            {children}
          </span>
        </div>
      )}
    </button>
  );
}

export default Button;
