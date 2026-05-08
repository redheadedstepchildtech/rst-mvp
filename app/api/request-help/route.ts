import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      location,
      description,
      category,
      urgent,
    } = body;

    const helpRequest = await prisma.helpRequest.create({
      data: {
        name,
        email,
        phone,
        location,
        description,
        category,
        urgent,
      },
    });

    return NextResponse.json(
      { success: true, data: helpRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in request-help route:", error);
    return NextResponse.json(
      { error: "Failed to submit help request" },
      { status: 500 }
    );
  }
}