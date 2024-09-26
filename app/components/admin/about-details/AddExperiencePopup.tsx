import React, { useState } from "react";
import { z } from "zod"; // Import Zod
import { TextInput } from "../../typography/TextInput";
import Button from "../../display/Button";

interface AddExperiencePopupProps {
  onClose: () => void;
  userId: string;
  onSave: (data: {
    designation: string;
    company_name: string;
    company_website: string; // Added company_website to the type
    work_from: string;
    work_till: string;
  }) => void;
}

// Define a Zod schema for the form fields
const experienceSchema = z.object({
  designation: z.string().min(1, "Job Title is required."),
  company_name: z.string().min(1, "Company Name is required."),
  company_website: z.string().url("Must be a valid URL."), // Added validation for company_website
  work_from: z.string().min(1, "Start Date is required."),
  work_till: z.string().min(1, "End Date is required."),
});

const AddExperiencePopup: React.FC<AddExperiencePopupProps> = ({
  onClose,
  userId,
  onSave,
}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState(""); // Added companyWebsite state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<{
    designation?: string;
    company_name?: string;
    company_website?: string; // Added error state for company_website
    work_from?: string;
    work_till?: string;
  }>({});

  const handleSave = async () => {
    const validationResult = experienceSchema.safeParse({
      designation: jobTitle,
      company_name: companyName,
      company_website: companyWebsite, // Added company_website to validation
      work_from: startDate,
      work_till: endDate,
    });

    if (!validationResult.success) {
      const newErrors: any = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    const newExperience = {
      designation: jobTitle,
      company_name: companyName,
      company_website: companyWebsite, // Added company_website to the object
      work_from: startDate,
      work_till: endDate,
      user_id: userId,
    };

    try {
      // Log the newExperience object before calling onSave
      console.log("New Experience to save: ", newExperience);
      
      const response = await fetch(`/api/users/${userId}/professional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) {
        throw new Error("Failed to save experience");
      }

      onSave(newExperience);
      onClose();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg flex flex-col gap-6 w-1/4">
        <h2 className="text-white text-lg mb-4">Add Experience</h2>
        <TextInput
          label="Job Title"
          value={jobTitle}
          onChange={(e) => {
            setJobTitle(e.target.value);
            setErrors({ ...errors, designation: undefined });
          }}
          error={errors.designation}
        />
        <TextInput
          label="Company Name"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setErrors({ ...errors, company_name: undefined });
          }}
          error={errors.company_name}
        />
        <TextInput
          label="Company Website"
          value={companyWebsite} // Bind to companyWebsite
          onChange={(e) => {
            setCompanyWebsite(e.target.value);
            setErrors({ ...errors, company_website: undefined });
          }}
          error={errors.company_website} // Display error if any
        />
        <TextInput
          label="Start Date"
          value={startDate}
          type="date"
          onChange={(e) => {
            setStartDate(e.target.value);
            setErrors({ ...errors, work_from: undefined });
          }}
          error={errors.work_from}
        />
        <TextInput
          label="End Date"
          value={endDate}
          type="date"
          onChange={(e) => {
            setEndDate(e.target.value);
            setErrors({ ...errors, work_till: undefined });
          }}
          error={errors.work_till}
        />
        <div className="flex justify-center mt-4 gap-6">
          <Button theme="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button theme="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExperiencePopup;
