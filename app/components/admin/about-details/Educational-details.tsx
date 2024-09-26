import React, { useEffect, useState } from "react";
import AddInstitutionPopup from "./AddInstitutionPopup";
import Button from "../../display/Button";
import { Text } from "../../typography/Text";

interface EducationalDetail {
  edu_id: number;
  user_id: string;
  degree: string;
  group_major: string;
  institution_name: string;
  passing_year: number;
}

function EducationalDetails() {
  const [educationalData, setEducationalData] = useState<EducationalDetail[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userId = "1";

  useEffect(() => {
    const fetchEducationalData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/educational`);
        if (!response.ok) {
          throw new Error("Failed to fetch educational details");
        }
        const data = await response.json();
        setEducationalData(data.educationalDetails);
      } catch (error) {
        console.error("Error fetching educational data:", error);
      }
    };

    fetchEducationalData();
  }, [userId]);

  const handleSave = (newDetail: { degree: string; group_major: string; institution_name: string; passing_year: number }) => {
    setEducationalData((prevData) => [
      ...prevData,
      { ...newDetail, edu_id: Date.now(), user_id: userId },
    ]);
  };

  return (
    <div className="flex flex-col p-10 rounded shadow-lg shadow-teal-700 gap-10">
      {educationalData.length === 0 ? (
        <Text text="No Educational Details Found" className="text-white" />
      ) : (
        educationalData.map((edu) => (
          <div key={edu.edu_id} className="flex flex-col">
            <Text
              text={edu.degree}
              isBold
              className="text-cyan-500 mb-4 text-[22px]"
            />
            <Text
              text={edu.institution_name}
              isBold
              className="text-cyan-200 text-[16px]"
            />
            <Text text={edu.group_major} className="text-white text-[14px]" />
            <Text
              text={`Passing Year: ${edu.passing_year}`}
              className="text-white text-[14px]"
            />
          </div>
        ))
      )}
      <div className="flex justify-center mt-6">
        <Button theme="primary" onClick={() => setIsPopupOpen(true)}>
          Add Institution
        </Button>
      </div>
      {isPopupOpen && (
        <AddInstitutionPopup
          onClose={() => setIsPopupOpen(false)}
          userId={userId}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default EducationalDetails;
