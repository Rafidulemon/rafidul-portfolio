// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        occupation: userData.occupation,
        phone: userData.phone,
        email: userData.email,
        dob: new Date(userData.dob), // Ensure the date is a Date object
        nationality: userData.nationality,
        address: userData.address,
        password_hash: "", // Add logic to hash password if applicable
        self_introduction: "", // Optional: Add a default or user input if needed
        skill_description: "", // Optional: Add a default or user input if needed
        languages: { create: userData.languages.map((lang: any) => ({ language_name: lang })) }, // Assuming languages is an array of strings
        // social_media, educational_details, professional_details, skills, projects, blogs, services can be initialized if required
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
