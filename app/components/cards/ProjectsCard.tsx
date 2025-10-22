import React from "react";
import Image from "next/image";
import { Text } from "../typography/Text";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectsCardProps {
  src: string;
  project_title: string;
  project_details: string;
  github_link?: string;
  live_link?: string;
  stack?: string[];
}

function ProjectsCard(props: ProjectsCardProps) {
  const { src = "", project_title = "", project_details = "", github_link = "#", live_link = "#", stack = [] } = props;

  return (
    <div className="relative bg-white dark:bg-[#111111] rounded-2xl shadow-md shadow-cyan-900 flex flex-col overflow-hidden">
      {/* Image Section */}
      <div className="relative md:w-[450px] h-[200px] md:h-[250px]">
        <Image
          src={src}
          alt={project_title}
          width={450}
          height={200}
          className="w-full h-full rounded-t-2xl"
        />
      </div>

      {/* Title Section */}
      <div className="flex flex-col w-full p-4">
        <Text
          text={project_title}
          isBold
          className="text-primary_dark dark:text-white text-[16px] md:text-[20px]"
        />

        {/* Details and Links (Always visible on mobile) */}
        <div className="md:hidden flex-col items-center justify-center gap-4 mt-4">
          <Text
            text={project_details}
            className="text-black dark:text-[#ADB7BE] text-center text-[14px] md:text-[16px]"
          />
          {stack.length > 0 && (
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-2">
              {stack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[12px] md:text-[14px] px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="w-full flex flex-row items-center justify-center gap-6 mt-4">
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary_dark dark:text-cyan-500 text-[20px] hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary_dark dark:text-cyan-500 text-[20px] hover:text-white transition"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for Larger Screens */}
      <div className="absolute inset-0 bg-primary_light dark:bg-black bg-opacity-90 opacity-0 hover:opacity-100 md:flex md:opacity-0 hidden flex-col items-center justify-center gap-4 p-4">
        <Text
          text={project_details}
          className="text-black dark:text-[#ADB7BE] text-center text-[14px] md:text-[16px]"
        />
        {stack.length > 0 && (
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-2">
              {stack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[12px] md:text-[14px] px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        <div className="flex gap-6">
          <a
            href={github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary_dark dark:text-cyan-500 text-[20px] hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href={live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary_dark dark:text-cyan-500 text-[20px] hover:text-white transition"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectsCard;
