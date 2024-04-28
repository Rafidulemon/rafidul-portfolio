import React from "react";
import Image from "next/image";
import { Text } from "../typography/Text";

interface ProjectsCardProps {
    src: string;
    project_title: string;
    project_details: string;
  }

function ProjectsCard(props:  ProjectsCardProps) {
    const { src = "", project_title = "", project_details =""} = props;
  return (
    <div className="bg-[#111111] rounded-2xl flex shadow-md shadow-cyan-900 flex flex-col gap-0">
      <div className="rounded-2xl">
        <Image
          src={src}
          alt="Portfolio Web"
          width={450}
          height={250}
          className="rounded-t-2xl my-0"
        />
      </div>
      <div className="flex flex-col w-full m-4">
        <Text text={project_title} isBold/>
        <Text text={project_details} className="text-[#ADB7BE]"/>
      </div>
    </div>
  );
}

export default ProjectsCard;
