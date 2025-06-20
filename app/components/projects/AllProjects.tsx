"use client";

import React from "react";
import ProjectsCard from "../cards/ProjectsCard";
import projectData from "../../data/projects.json";

type AllProjectsProps = {
  type?: "ai" | "web" | "mobile"; // optional filter
};

function AllProjects({ type }: AllProjectsProps) {
  const filteredProjects = type ? projectData.filter(p => p.type === type) : projectData;

  return (
    <div className="w-full flex flex-wrap justify-center gap-10">
      {filteredProjects.map((project) => (
        <ProjectsCard
          key={project.id}
          src={project.src}
          project_title={project.project_title}
          project_details={project.project_details}
          github_link={project.github_link}
          live_link={project.live_link}
        />
      ))}
    </div>
  );
}

export default AllProjects;
