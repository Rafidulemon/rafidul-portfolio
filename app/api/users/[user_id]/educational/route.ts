import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;
  console.log("User ID: ", user_id);

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const educationalDetails = await prisma.educationalDetail.findMany({
      where: {
        user_id,
      },
    });

    if (educationalDetails.length === 0) {
      return NextResponse.json({ message: 'No educational details found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, educationalDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching educational details:', error);
    return NextResponse.json({ error: 'Error fetching educational details' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;
  
  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const body = await request.json();

  const { degree, group_major, institution_name, passing_year } = body;

  // Validate the input
  if (!degree || !group_major || !institution_name || !passing_year) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const newEducationalDetail = await prisma.educationalDetail.create({
      data: {
        user_id,
        degree,
        group_major,
        institution_name,
        passing_year,
      },
    });

    return NextResponse.json({ success: true, educationalDetail: newEducationalDetail }, { status: 201 });
  } catch (error) {
    console.error('Error adding educational detail:', error);
    return NextResponse.json({ error: 'Error adding educational detail' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
