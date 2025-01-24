"use client";

import React, { useState, useEffect } from "react";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import { FaCircle } from "react-icons/fa6";
import PersonalDetails from "./Personal-details";
import ProfessionalDetails from "./Professional-details";
import EducationalDetails from "./Educational-details";


function Details() {
  const [currentTab, setCurrentTab] = useState<string>("personal");

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-row justify-between gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          <Button
            theme={currentTab === "personal" ? "primary" : "secondary"}
            onClick={() => setCurrentTab("personal")}
          >
            <Text text="Personal Details" className="text-[14px] md:text-[16px]" />
          </Button>
          <Button
            theme={currentTab === "education" ? "primary" : "secondary"}
            onClick={() => setCurrentTab("education")}
          >
            <Text text="Educational Details" className="text-[14px] md:text-[16px]" />
          </Button>
          <Button
            theme={currentTab === "professional" ? "primary" : "secondary"}
            onClick={() => setCurrentTab("professional")}
          >
            <Text text="Professional Detail" className="text-[14px] md:text-[16px]" />
          </Button>
        </div>

        {/* Circles */}
        <div className="flex flex-row justify-between my-4 gap-4">
          <FaCircle color={currentTab === "personal" ? "#00BCD4" : "#d0d8d9"} />
          <FaCircle
            color={currentTab === "education" ? "#00BCD4" : "#d0d8d9"}
          />
          <FaCircle
            color={currentTab === "professional" ? "#00BCD4" : "#d0d8d9"}
          />
        </div>

        {/* Tab Content */}
        {currentTab === "personal" && <PersonalDetails />}
        {currentTab === "education" && <EducationalDetails />}
        {currentTab === "professional" && <ProfessionalDetails />}
      </div>
    </>
  );
}

export default Details;
