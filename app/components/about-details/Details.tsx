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
      <div className="flex flex-row justify-between gap-2 md:gap-3 lg:gap-4 xl:gap-6">
        <Button
          theme={currentTab === "personal" ? "primary" : "secondary"}
          className="w-[100px] md:w-[170px] lg:w-[200px] xl:w-[250px]"
          onClick={() => setCurrentTab("personal")}
        >
          <Text text="Personal Details" className="text-center md:mx-1 lg:mx-2 xl:mx-4 text-white text-[11px] md:0 lg:text-[14px] xl:text-[16px]" />
        </Button>
        <Button
          theme={currentTab === "education" ? "primary" : "secondary"}
          className="w-[100px] md:w-[170px] lg:w-[200px] xl:w-[250px]"
          onClick={() => setCurrentTab("education")}
        >
          <Text text="Educational Details" className="text-center md:mx-1 lg:mx-2 xl:mx-4 text-white text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]" />
        </Button>
        <Button
          theme={currentTab === "professional" ? "primary" : "secondary"}
          className="w-[100px] md:w-[170px] lg:w-[200px] xl:w-[250px]"
          onClick={() => setCurrentTab("professional")}
        >
          <Text text="Professional Detail" className="text-center md:mx-1 lg:mx-2 xl:mx-4 text-white text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]" />
        </Button>
      </div>
      <div className="flex flex-row justify-between mt-4 md:mt-6 lg:mt-8 xl:mt-10 gap-4">
        <FaCircle className="text-[12px] lg:text-[14px] xl:text-[16px]" color={currentTab === "personal" ? "#00BCD4" : "#FFFFFF"} />
        <FaCircle className="text-[12px] lg:text-[14px] xl:text-[16px]" color={currentTab === "education" ? "#00BCD4" : "#FFFFFF"}/>
        <FaCircle className="text-[12px] lg:text-[14px] xl:text-[16px]" color={currentTab === "professional" ? "#00BCD4" : "#FFFFFF"}/>
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
          <Text text="Download CV" className="text-white text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]"/>
        </Button>
      </Link>
    </div>
  );
}

export default Details;
