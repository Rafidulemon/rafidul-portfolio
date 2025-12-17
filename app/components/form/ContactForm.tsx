"use client";

import React, { useState } from "react";
import TextInput from "../typography/TextInput";
import TextArea from "../typography/TextArea";
import Button from "../display/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "../typography/Text";
import { PopUp } from "../display/PopUp";
import Link from "next/link";

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

  const [open, setOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");

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

      setPopupMessage(
        "Your message has been sent successfully. We will get back to you as soon as possible."
      );
      setPopupTitle("Message Sent");
      setOpen(true);
      reset();
    } catch (error) {
      setPopupTitle("Failed");
      setPopupMessage("Failed to send the message. Please try again later.");
      setOpen(true);
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
        <div className="w-full">
          <Button theme="primary" type="submit" isWidthFull>
            <Text
              text={isSubmitting ? "Sending..." : "Send"}
              className="text-white text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
            />
          </Button>
        </div>
      </form>

      <PopUp
        open={open}
        setOpen={setOpen}
        title={popupTitle}
        className="w-[80%] md:w-[400px] lg:w-[500px]"
      >
        <div className="w-full flex flex-col gap-6 mb-2 justify-center items-center">
          <Text
            text={popupMessage}
            className="text-gray-800 dark:text-gray-300 text-[14px] md:text-[16px]"
          />
          <Link
            href={"/"}
            onClick={() => setOpen(false)}
            className="w-full md:w-fit rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500 to-teal-700 hover:bg-slate-200 text-white px-2 py-1 md:px-4 text-center"
          >
            Back to Home
          </Link>
        </div>
      </PopUp>
    </div>
  );
};

export default ContactForm;
