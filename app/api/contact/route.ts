import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "process";

export async function POST(request: Request) {

  try {
    const { name, email, title, message } = await request.json();

    if (!name || !email || !title || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "rafidul.islam054@gmail.com",
      subject: `Contact Form: ${title}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
