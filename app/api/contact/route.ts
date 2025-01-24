import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.NEXT_PUBLIC_RECEIVER_EMAIL,
      subject: `Contact Form: ${name}`,
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
