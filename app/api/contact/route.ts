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

    const smtpUser = process.env.EMAIL_SERVER_USER;
    const smtpPass = process.env.EMAIL_SERVER_PASS;
    const senderAddress = process.env.EMAIL_FROM ?? smtpUser;
    const receiverAddress =
      process.env.EMAIL_RECEIVER ?? process.env.EMAIL_FROM ?? smtpUser;

    if (!smtpUser || !smtpPass || !senderAddress || !receiverAddress) {
      return NextResponse.json(
        { message: "Email service is not configured properly." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: senderAddress,
      replyTo: `${name} <${email}>`,
      to: receiverAddress,
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
