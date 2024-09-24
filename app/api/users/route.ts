import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    const newUser = await prisma.user.create({
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        occupation: userData.occupation,
        phone: userData.phone,
        email: userData.email,
        dob: new Date(userData.dob),
        nationality: userData.nationality,
        address: userData.address,
        password_hash: "",
        self_introduction: "",
        skill_description: "", 
        languages: { create: userData.languages.map((lang: any) => ({ language_name: lang })) },
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
