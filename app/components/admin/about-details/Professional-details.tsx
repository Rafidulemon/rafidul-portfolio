import React, { useEffect, useState } from "react";
import { Grid } from "../../layout/Grid";
import { Text } from "../../typography/Text";
import Link from "next/link";
import Button from "../../display/Button";
import AddExperiencePopup from "./AddExperiencePopup";

interface ProfessionalDetail {
  prof_id: string;
  user_id: string;
  company_name: string;
  designation: string;
  company_website: string;
  work_from: string;
  work_till: string;
}

function ProfessionalDetails() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [professionalData, setProfessionalData] = useState<
    ProfessionalDetail[]
  >([]);
  const userId = "1";

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/professional`);
        console.log("Response: ", response);
        if (!response.ok) {
          throw new Error("Failed to fetch professional details");
        }
        const data = await response.json();
        setProfessionalData(data.professionalDetails);
      } catch (error) {
        console.error("Error fetching professional data:", error);
      }
    };

    fetchProfessionalData();
  }, [userId]);

  const handleSaveExperience = (Data: {
    designation: string;
    company_name: string;
    company_website: string;
    work_from: string;
    work_till: string;
  }) => {
    const formattedData = {
      ...Data,
      work_from: new Date(Data.work_from).toISOString().split("T")[0],
      work_till: new Date(Data.work_till).toISOString().split("T")[0],
    };

    setProfessionalData((prevData) => [
      ...prevData,
      { ...formattedData, prof_id: Date.now().toString(), user_id: userId },
    ]);
  };

  return (
    <div className="flex flex-col p-4 md:p-10 rounded shadow-lg shadow-teal-700 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      {professionalData.length === 0 ? (
        <Text text="No Professional Details Found" className="text-white" />
      ) : (
        professionalData.map((job) => (
          <Grid
            colCount={2}
            key={job.prof_id}
            className="flex flex-row gap-2 md:gap-3 lg:gap-4"
          >
            <Text
              text={job.designation}
              isBold
              className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500"
            />
            <div className="flex flex-col gap-4">
              <Link href={job.company_website}>
                <Text
                  text={job.company_name}
                  className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
                  isBold
                />
              </Link>
              <Text
                text={`From ${new Date(
                  job.work_from
                ).toLocaleDateString()} to ${
                  job.work_till
                    ? new Date(job.work_till).toLocaleDateString()
                    : "Present"
                }`}
                className="text-white text-[10px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
              />
            </div>
          </Grid>
        ))
      )}
      <div className="flex justify-center mt-6">
        <Button theme="secondary" onClick={() => setIsPopupOpen(true)}>
          Add Experience
        </Button>
      </div>
      {isPopupOpen && (
        <AddExperiencePopup
          onClose={() => setIsPopupOpen(false)}
          userId={userId}
          onSave={handleSaveExperience}
        />
      )}
    </div>
  );
}

export default ProfessionalDetails;
