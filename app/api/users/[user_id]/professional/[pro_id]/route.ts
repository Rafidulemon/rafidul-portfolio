import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This is how to export a named GET function for Next.js App Router
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const userId = params.user_id;

  try {
    const professionalDetails = await prisma.professionalDetail.findMany({
      where: { user_id: userId },
    });

    return NextResponse.json({ professionalDetails });
  } catch (error) {
    console.error("Error fetching professional details:", error);
    return NextResponse.json({ error: "Failed to fetch professional details" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { user_id: string } }) {
    const { user_id } = params;
    
    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    const body = await request.json();
  
    const { company_name, company_website, designation, work_from, work_till } = body;
  
    if (!company_name || !company_website || !designation || !work_from || work_till) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
  
    try {
      const newEducationalDetail = await prisma.professionalDetail.create({
        data: {
          user_id,
          company_name,
          company_website,
          designation,
          work_from,
          work_till
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