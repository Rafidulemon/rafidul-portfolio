import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { user_id: string; edu_id: string } }) {
  const { user_id, edu_id } = params;

  try {
    const body = await req.json();
    const { degree, institution_name, group_major, passing_year } = body;

    if (!degree || !institution_name || !group_major || !passing_year) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const updatedDetail = await prisma.educationalDetail.update({
      where: {
        edu_id: edu_id,
      },
      data: {
        degree,
        institution_name,
        group_major,
        passing_year: Number(passing_year),
        user_id,
      },
    });

    return NextResponse.json({ success: true, updatedDetail });
  } catch (error) {
    console.error('Error updating educational detail:', error);
    return NextResponse.json({ error: 'An error occurred while updating the detail.' }, { status: 500 });
  }
}
