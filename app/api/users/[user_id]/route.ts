import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;
  console.log("User ID: ", user_id)

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;
  const body = await request.json();

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id },
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        occupation: body.occupation,
        phone: body.phone,
        email: body.email,
        dob: new Date(body.dob),
        nationality: body.nationality,
        address: body.address,
        languages: body.languages
      },
    });

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
