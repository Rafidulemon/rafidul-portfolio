import React from "react";
import ProjectsCard from "../cards/ProjectsCard";

function WebProject() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row items-center justify-center gap-10">
        <ProjectsCard
          src="/images/projects/portfolio-web.png"
          project_title="Portfolio Website"
          project_details="Details about the project will be added here."
        />
        <ProjectsCard
          src="/images/projects/ecom-website.png"
          project_title="E-Commerce Website"
          project_details="Details about the project will be added here."
        />
      </div>
    </div>
  );
}

export default WebProject;
