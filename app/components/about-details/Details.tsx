"use client"

import React, { useState, useEffect } from "react";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import { FaCircle } from "react-icons/fa6";
import PersonalDetails from "./Personal-details";
import ProfessionalDetails from "./Professional-details";
import EducationalDetails from "./Educational-details";
import Link from "next/link";
import Personal from "../admin/edit/profile/Personal";
import Educational from "../admin/edit/profile/Educational";
import Professional from "../admin/edit/profile/Professional";

type Props = {
  isAdmin?: boolean;
  userId?: string; // Accept userId prop
};

function Details(props: Props) {
  const { isAdmin = false, userId = "1" } = props; // Default userId to "1"
  const [currentTab, setCurrentTab] = useState<string>("personal");
  const [isPersonalProfileEdit, setPersonalProfileEdit] = useState<boolean>(false);
  const [isEducationalProfileEdit, setEducationalProfileEdit] = useState<boolean>(false);
  const [isProfessionalProfileEdit, setProfessionalProfileEdit] = useState<boolean>(false);

  // Simulating fetching educational details for the user
  const [educationalDetails, setEducationalDetails] = useState<any>(null);

  useEffect(() => {
    // Replace with actual API call to fetch educational details
    const fetchEducationalDetails = async () => {
      // Example: const response = await fetch(`/api/educationalDetails/${userId}`);
      // const data = await response.json();
      const data = null; // Simulate no details found
      setEducationalDetails(data);
    };

    fetchEducationalDetails();
  }, [userId]);

  return (
    <>
      {isPersonalProfileEdit && <Personal />}
      {isEducationalProfileEdit && <Educational userId={userId} />}
      {isProfessionalProfileEdit && <Professional />}

      {!isPersonalProfileEdit && !isEducationalProfileEdit && !isProfessionalProfileEdit && (
        <div className="w-full flex flex-col items-center justify-center">
          {/* Tab Buttons */}
          <div className="flex flex-row justify-between gap-2 md:gap-3 lg:gap-4 xl:gap-6">
            <Button
              theme={currentTab === "personal" ? "primary" : "secondary"}
              onClick={() => setCurrentTab("personal")}
            >
              <Text text="Personal Details" className="text-white" />
            </Button>
            <Button
              theme={currentTab === "education" ? "primary" : "secondary"}
              onClick={() => setCurrentTab("education")}
            >
              <Text text="Educational Details" className="text-white" />
            </Button>
            <Button
              theme={currentTab === "professional" ? "primary" : "secondary"}
              onClick={() => setCurrentTab("professional")}
            >
              <Text text="Professional Detail" className="text-white" />
            </Button>
          </div>
          
          {/* Circles */}
          <div className="flex flex-row justify-between mt-4 gap-4">
            <FaCircle color={currentTab === "personal" ? "#00BCD4" : "#FFFFFF"} />
            <FaCircle color={currentTab === "education" ? "#00BCD4" : "#FFFFFF"} />
            <FaCircle color={currentTab === "professional" ? "#00BCD4" : "#FFFFFF"} />
          </div>

          {/* Tab Content */}
          {currentTab === "personal" && <PersonalDetails />}
          {currentTab === "education" && <EducationalDetails />}
          {currentTab === "professional" && <ProfessionalDetails />}
          
          {/* Conditional Rendering of Edit Buttons */}
          {isAdmin && currentTab === "personal" && (
            <Button onClick={() => setPersonalProfileEdit(true)}>
              <Text text="Edit Personal Details" className="text-white" />
            </Button>
          )}
          {isAdmin && currentTab === "education" && ( // Check if educational details exist
            <Button onClick={() => setEducationalProfileEdit(true)}>
              <Text text="Edit Educational Details" className="text-white" />
            </Button>
          )}
          {isAdmin && currentTab === "professional" && (
            <Button onClick={() => setProfessionalProfileEdit(true)}>
              <Text text="Edit Professional Details" className="text-white" />
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default Details;
