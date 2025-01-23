import React from "react";
import ProjectsCard from "../cards/ProjectsCard";

function AiProjects() {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      <ProjectsCard
        src="/images/projects/alizaAi.jpg"
        project_title="Virtual Assistant"
        project_details="Details about the project will be added here." github_link={""} live_link={""}      />
    </div>
  );
}

export default AiProjects;
