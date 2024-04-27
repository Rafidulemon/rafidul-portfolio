"use client";

import React from "react";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import { FaCircle } from "react-icons/fa6";
import PersonalDetails from "./Personal-details";
import ProfessionalDetails from "./Professional-details";
import EducationalDetails from "./Educational-details";
import Link from "next/link";
import { useState } from "react";

function Details() {
  const [currentTab, setCurrentTab] = useState<string>("personal");
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-row justify-between gap-6">
        <Button
          theme={currentTab === "personal" ? "primary" : "secondary"}
          className="w-[250px]"
          onClick={() => setCurrentTab("personal")}
        >
          <Text text="Personal Details" className="mx-4" />
        </Button>
        <Button
          theme={currentTab === "education" ? "primary" : "secondary"}
          className="w-[250px]"
          onClick={() => setCurrentTab("education")}
        >
          <Text text="Educational Details" className="mx-4" />
        </Button>
        <Button
          theme={currentTab === "professional" ? "primary" : "secondary"}
          className="w-[250px]"
          onClick={() => setCurrentTab("professional")}
        >
          <Text text="Professional Detail" className="mx-4" />
        </Button>
      </div>
      <div className="flex flex-row justify-between mt-10 gap-4">
        <FaCircle size={16} color={currentTab === "personal" ? "#00BCD4" : ""} />
        <FaCircle size={16} color={currentTab === "education" ? "#00BCD4" : ""}/>
        <FaCircle size={16} color={currentTab === "professional" ? "#00BCD4" : ""}/>
      </div>

      {currentTab == "personal" && (
        <div className="my-10">
          <PersonalDetails />
        </div>
      )}

      {currentTab == "education" && (
        <div className="my-10">
          <EducationalDetails />
        </div>
      )}

      {currentTab == "professional" && (
        <div className="my-10">
          <ProfessionalDetails />
        </div>
      )}

      <Link href="/" className="my-10">
        <Button theme="secondary">
          <Text text="Download CV" />
        </Button>
      </Link>
    </div>
  );
}

export default Details;
