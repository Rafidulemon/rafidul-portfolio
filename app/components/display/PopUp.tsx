import React, { type ReactNode } from "react";
import { IoIosCloseCircle } from "react-icons/io";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  title: string;
  children?: ReactNode;
};

export const PopUp = (props: Props) => {
  const { open, className = "", children, title, setOpen } = props;

  if (!open) return null;

  return (
    <div className="z-[100] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white dark:bg-[#111111] rounded-2xl shadow-md shadow-cyan-900 flex flex-col justify-between ${className}`}
      >
        <div className="flex flex-row w-full justify-between">
          <span className="py-2 px-4 md:px-6 flex w-full flex-row justify-between font-bold text-[16px] md:text-[20px] text-primary_dark dark:text-white">
            {title}
          </span>

          <IoIosCloseCircle
            className="relative mx-2 mt-2 text-2xl text-gray-500 cursor-pointer hover:text-primary"
            onClick={() => setOpen(false)}
          />
        </div>
        <hr className="w-full border-black" />

        <div className="px-4 md:px-6 py-2 dark:text-white text-gray-800">{children}</div>
      </div>
    </div>
  );
};
