"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@/app/components/layout/Grid";
import { Text } from "@/app/components/typography/Text";
import { TextInput } from "@/app/components/typography/TextInput";
import Button from "@/app/components/display/Button";
import Details from "@/app/components/admin/about-details/Details";
import Modal from "@/app/components/display/Modal";

interface EducationalProps {
  userId: string;
}

function Educational({ userId }: EducationalProps) {
  const [educationalDetails, setEducationalDetails] = useState<any[]>([]);
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);
  const [updatedDetails, setUpdatedDetails] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const fetchEducationalDetails = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/educational`);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          setEducationalDetails(data.educationalDetails);
          setUpdatedDetails(data.educationalDetails);
        } else {
          setEducationalDetails([]);
        }
      } catch (error) {
        console.error("Error fetching educational details:", error);
        setEducationalDetails([]);
      }
    };

    fetchEducationalDetails();
  }, [userId]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const newDetails = [...updatedDetails];
    newDetails[index] = {
      ...newDetails[index],
      [field]: value,
    };
    setUpdatedDetails(newDetails);

    if (newDetails[index][field] !== educationalDetails[index][field]) {
      setHasChanges(true);
    }
  };

  const handleSaveClick = () => {
    if (hasChanges) {
      setModalOpen(true);
    } else {
      setDetailsPage(true);
    }
  };

  const handleSave = async () => {
    try {
      for (const detail of updatedDetails) {
        const eduId = detail.edu_id;
        console.log("Attempting to update Edu ID: ", eduId);
  
        const response = await fetch(`/api/users/${userId}/educational/${eduId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detail),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error updating detail:", errorData.error);
          continue;
        }
  
        const data = await response.json();
        console.log("Update Response for Edu ID:", eduId, data);
      }
  
      const updatedResponse = await fetch(`/api/users/${userId}/educational`);
      const updatedData = await updatedResponse.json();
      if (updatedData.success) {
        setEducationalDetails(updatedData.educationalDetails);
      }
    } catch (error) {
      console.error("Error saving educational detail:", error);
    } finally {
      setModalOpen(false);
      setDetailsPage(true);
    }
  };
  

  return (
    <>
      {!isDetailsPage ? (
        <div className="flex flex-col items-center justify-center gap-10">
          {educationalDetails.length > 0 ? (
            <div className="w-1/2 p-10 rounded shadow-lg shadow-teal-700">
              <Grid className="gap-4 text-white text-[16px]">
                {educationalDetails.map((detail, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <Text text="Degree" isBold />
                      <TextInput
                        value={updatedDetails[index]?.degree || ""}
                        onChange={(e) => handleInputChange(index, "degree", e.target.value)}
                      />
                    </div>
                    <div>
                      <Text text="Institute" isBold />
                      <TextInput
                        value={updatedDetails[index]?.institution_name || ""}
                        onChange={(e) => handleInputChange(index, "institution_name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Text text="Group" isBold />
                      <TextInput
                        value={updatedDetails[index]?.group_major || ""}
                        onChange={(e) => handleInputChange(index, "group_major", e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <Text text="Passing Year" isBold />
                      <TextInput
                        value={updatedDetails[index]?.passing_year || ""}
                        onChange={(e) => handleInputChange(index, "passing_year", e.target.value)}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
          ) : (
            <div className="text-white">No Educational Details Found</div>
          )}

          <div className="flex flex-row gap-6 mb-6">
            <Button theme="primary" className="w-[200px]" onClick={handleSaveClick}>
              Save
            </Button>
            <Button theme="secondary" className="w-[200px]" onClick={() => setDetailsPage(true)}>
              Back to Profile
            </Button>
          </div>
        </div>
      ) : (
        <Details userId={userId} />
      )}

      {isModalOpen && (
        <Modal
          title="Confirmation"
          message="Are you sure you want to update the details?"
          onConfirm={handleSave}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default Educational;
