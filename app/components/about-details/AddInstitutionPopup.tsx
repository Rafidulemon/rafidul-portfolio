import React, { useState } from "react";
import { TextInput } from "../typography/TextInput";
import Button from "../display/Button";
import { z } from "zod"; // Import Zod

interface AddInstitutionPopupProps {
  onClose: () => void;
  userId: string;
  onSave: (data: { degree: string; group_major: string; institution_name: string; passing_year: number }) => void;
}

// Define a Zod schema for the form fields
const institutionSchema = z.object({
  degree: z.string().min(1, "Degree is required."),
  group_major: z.string().min(1, "Group/Major is required."),
  institution_name: z.string().min(1, "Institution Name is required."),
  passing_year: z.number().min(1900, "Passing Year is required and must be a valid year."),
});

const AddInstitutionPopup: React.FC<AddInstitutionPopupProps> = ({
  onClose,
  userId,
  onSave,
}) => {
  const [degree, setDegree] = useState("");
  const [groupMajor, setGroupMajor] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [errors, setErrors] = useState<{ degree?: string; group_major?: string; institution_name?: string; passing_year?: string }>({});

  const handleSave = async () => {
    // Parse passingYear to a number for validation
    const parsedYear = parseInt(passingYear);

    // Validate input using Zod
    const validationResult = institutionSchema.safeParse({
      degree,
      group_major: groupMajor,
      institution_name: institutionName,
      passing_year: parsedYear,
    });

    if (!validationResult.success) {
      // Set errors based on Zod validation
      const newErrors: any = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message; // Map error messages
      });
      setErrors(newErrors);
      return;
    }

    const newInstitution = {
      degree,
      group_major: groupMajor,
      institution_name: institutionName,
      passing_year: parsedYear,
      user_id: userId,
    };

    try {
      const response = await fetch(`/api/users/${userId}/educational`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInstitution),
      });

      if (!response.ok) {
        throw new Error("Failed to save institution");
      }

      onSave(newInstitution);
      onClose();
    } catch (error) {
      console.error("Error saving institution:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg flex flex-col gap-6 w-1/4">
        <h2 className="text-white text-lg mb-4">Add Institution</h2>
        <TextInput
          label="Degree"
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
            setErrors({ ...errors, degree: undefined });
          }}
          error={errors.degree}
        />
        <TextInput
          label="Group/Major"
          value={groupMajor}
          onChange={(e) => {
            setGroupMajor(e.target.value);
            setErrors({ ...errors, group_major: undefined });
          }}
          error={errors.group_major}
        />
        <TextInput
          label="Institution Name"
          value={institutionName}
          onChange={(e) => {
            setInstitutionName(e.target.value);
            setErrors({ ...errors, institution_name: undefined });
          }}
          error={errors.institution_name}
        />
        <TextInput
          label="Passing Year"
          value={passingYear}
          type="number"
          onChange={(e) => {
            setPassingYear(e.target.value);
            setErrors({ ...errors, passing_year: undefined });
          }}
          error={errors.passing_year}
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

export default AddInstitutionPopup;
