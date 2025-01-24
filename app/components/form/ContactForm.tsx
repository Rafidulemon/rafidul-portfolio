"use client";

import React, { useState } from "react";
import TextInput from "../typography/TextInput";
import TextArea  from "../typography/TextArea";
import Button from "../display/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "../typography/Text";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {  
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Your message has been sent!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send the message. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <TextInput
            label="Your Name"
            placeholder="Please enter your name here..."
            register={register}
            isRequired
            name="name"
            error={errors.name}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Your Email"
            placeholder="Please enter your email here..."
            register={register}
            isRequired
            name="email"
            error={errors.email}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="Enter the title of your message..."
            name="title"
            register={register}
            isRequired
            error={errors.title}
          />
        </div>
        <div className="mb-8">
          <TextArea
            label="Message"
            placeholder="Type your message here..."
            className="h-[250px]"
            register={register}
            name="message"
            isRequired
            error={errors.message}
          />
        </div>
        <Button theme="primary" type="submit" isWidthFull className="w-full">
          <Text
            text={isSubmitting ? "Sending..." : "Send"}
            className="text-white text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
          />
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
