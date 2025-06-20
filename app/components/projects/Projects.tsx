"use client";

import React, { useState } from "react";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import AllProjects from "./AllProjects";

function Projects() {
  const [currentTab, setCurrentTab] = useState<string>("all");

  return (
    <div>
      <div className="flex flex-row justify-center gap-6 my-6 flex-wrap">
        {["all", "ai", "web", "mobile"].map((tab) => (
          <Button
            key={tab}
            theme={currentTab === tab ? "primary" : "secondary"}
            className="w-[150px]"
            onClick={() => setCurrentTab(tab)}
          >
            <Text text={tab.charAt(0).toUpperCase() + tab.slice(1)} className="mx-4" />
          </Button>
        ))}
      </div>

      <div className="my-10">
        {currentTab === "all" && <AllProjects />}
        {currentTab === "ai" && <AllProjects type="ai" />}
        {currentTab === "web" && <AllProjects type="web" />}
        {currentTab === "mobile" && <AllProjects type="mobile" />}
      </div>
    </div>
  );
}

export default Projects;
