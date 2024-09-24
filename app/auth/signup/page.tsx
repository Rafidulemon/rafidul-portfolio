"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { TextInput } from "@/app/components/typography/TextInput";
import Button from "@/app/components/display/Button";
import PageTitle from "@/app/components/typography/PageTitle";
import { PasswordInput } from "@/app/components/typography/PasswordInput";

function SignupPage() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    phone: "",
    email: "",
    dob: "",
    nationality: "",
    address: "",
    languages: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          languages: formData.languages.split(",").map(lang => lang.trim()), // Convert languages to an array
        }),
      });

      if (!response.ok) {
        console.log("Error signing up");
        return;
      }

      // If response is OK, navigate to the /admin page
      await router.push("/admin");
    } catch (error) {
      console.error("Error creating user:", error);
      console.log("Error signing up");
    }
  };

  return (
    <div className="w-full py-16 md:py-20 flex flex-col items-center">
      <PageTitle name="Sign Up" />
      <form
        onSubmit={handleSubmit}
        className="w-2/3 flex flex-col gap-6 p-10 rounded shadow-lg shadow-teal-700"
      >
        <TextInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          isRequired
        />
        <TextInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          isRequired
        />
        <TextInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isRequired
        />
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isRequired
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isRequired
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          isRequired
        />

        <TextInput
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        />
        <TextInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          isRequired
        />
        <TextInput
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
        <TextInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextInput
          label="Languages (comma-separated)"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
        />
        <div className="w-full flex flex-row justify-center">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
