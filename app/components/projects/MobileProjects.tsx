import React from "react";
import ProjectsCard from "../cards/ProjectsCard";

function MobileProjects() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row items-center justify-center gap-10">
      <ProjectsCard
          src="/images/projects/food-delivery-web.png"
          project_title="Food Delivery App"
          project_details="Details about the project will be added here." github_link={""} live_link={""}        />
        <ProjectsCard
          src="/images/projects/fitness.png"
          project_title="Fitness App"
          project_details="Details about the project will be added here." github_link={""} live_link={""}        />
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <ProjectsCard
          src="/images/projects/hr-mgt.jpg"
          project_title="HR Management App"
          project_details="Details about the project will be added here." github_link={""} live_link={""}        />
        <ProjectsCard
          src="/images/projects/medicine-app.png"
          project_title="Medicine Delivery App"
          project_details="Details about the project will be added here." github_link={""} live_link={""}        />
      </div>
    </div>
  );
}

export default MobileProjects;
