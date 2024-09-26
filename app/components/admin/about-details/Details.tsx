"use client";

import React, { useState, useEffect } from "react";
import Button from "../../display/Button";
import { Text } from "../../typography/Text";
import { FaCircle } from "react-icons/fa6";
import PersonalDetails from "./Personal-details";
import ProfessionalDetails from "./Professional-details";
import EducationalDetails from "./Educational-details";
import Personal from "../edit/profile/Personal";
import Educational from "../edit/profile/Educational";
import Professional from "../edit/profile/Professional";

type Props = {
  userId?: string;
};

function Details(props: Props) {
  const { userId = "1" } = props;
  const [currentTab, setCurrentTab] = useState<string>("personal");
  const [isPersonalProfileEdit, setPersonalProfileEdit] =
    useState<boolean>(false);
  const [isEducationalProfileEdit, setEducationalProfileEdit] =
    useState<boolean>(false);
  const [isProfessionalProfileEdit, setProfessionalProfileEdit] =
    useState<boolean>(false);

  const [educationalDetails, setEducationalDetails] = useState<any>(null);

  useEffect(() => {
    const fetchEducationalDetails = async () => {
      const data = null;
      setEducationalDetails(data);
    };

    fetchEducationalDetails();
  }, [userId]);

  return (
    <>
      {isPersonalProfileEdit && <Personal userId={userId} />}
      {isEducationalProfileEdit && <Educational userId={userId} />}
      {isProfessionalProfileEdit && <Professional />}

      {!isPersonalProfileEdit &&
        !isEducationalProfileEdit &&
        !isProfessionalProfileEdit && (
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
              <FaCircle
                color={currentTab === "personal" ? "#00BCD4" : "#FFFFFF"}
              />
              <FaCircle
                color={currentTab === "education" ? "#00BCD4" : "#FFFFFF"}
              />
              <FaCircle
                color={currentTab === "professional" ? "#00BCD4" : "#FFFFFF"}
              />
            </div>

            {/* Tab Content */}
            {currentTab === "personal" && <PersonalDetails />}
            {currentTab === "education" && <EducationalDetails />}
            {currentTab === "professional" && <ProfessionalDetails />}

            <div className="my-6">
              {/* Conditional Rendering of Edit Buttons */}
              {currentTab === "personal" && (
                <Button onClick={() => setPersonalProfileEdit(true)}>
                  <Text text="Edit Personal Details" className="text-white" />
                </Button>
              )}
              {currentTab === "education" && ( // Check if educational details exist
                <Button onClick={() => setEducationalProfileEdit(true)}>
                  <Text
                    text="Edit Educational Details"
                    className="text-white"
                  />
                </Button>
              )}
              {currentTab === "professional" && (
                <Button onClick={() => setProfessionalProfileEdit(true)}>
                  <Text
                    text="Edit Professional Details"
                    className="text-white"
                  />
                </Button>
              )}
            </div>
          </div>
        )}
    </>
  );
}

export default Details;
