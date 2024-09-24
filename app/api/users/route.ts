// app/api/users/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import based on your prisma client setup

export async function GET() {
  try {
    const user = await prisma.user.findFirst(); // Fetch the first user
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Unable to fetch user" }, { status: 500 });
  }
}
