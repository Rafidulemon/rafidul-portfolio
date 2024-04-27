"use client";

import React, { useState } from "react";
import PageTitle from "../typography/PageTitle";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import AiProjects from "./AiProjects";
import WebProject from "./WebProject";
import MobileProjects from "./MobileProjects";
import AllProjects from "./AllProjects";


function Projects() {
  const [currentTab, setCurrentTab] = useState<string>("all");
  return (
    <div>
      <div className="flex flex-row justify-center gap-6 my-6">
        <Button
          theme={currentTab === "all" ? "primary" : "secondary"}
          className="w-[150px]"
          onClick={() => setCurrentTab("all")}
        >
          <Text text="All" className="mx-4" />
        </Button>
        <Button
          theme={currentTab === "ai" ? "primary" : "secondary"}
          className="w-[150px]"
          onClick={() => setCurrentTab("ai")}
        >
          <Text text="Ai" className="mx-4" />
        </Button>
        <Button
          theme={currentTab === "web" ? "primary" : "secondary"}
          className="w-[150px]"
          onClick={() => setCurrentTab("web")}
        >
          <Text text="Web" className="mx-4" />
        </Button>
        <Button
          theme={currentTab === "mobile" ? "primary" : "secondary"}
          className="w-[150px]"
          onClick={() => setCurrentTab("mobile")}
        >
          <Text text="Mobile" className="mx-4" />
        </Button>
      </div>
      {currentTab == "all" && (
        <div className="my-10">
          <AllProjects />
        </div>
      )}
      {currentTab == "ai" && (
        <div className="my-10">
          <AiProjects />
        </div>
      )}
      {currentTab == "web" && (
        <div className="my-10">
          <WebProject />
        </div>
      )}
      {currentTab == "mobile" && (
        <div className="my-10">
          <MobileProjects />
        </div>
      )}
    </div>
  );
}

export default Projects;
