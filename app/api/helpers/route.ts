import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const helper = await prisma.user.create({
      data: {
        phone,
        name,
        role: "helper",
     },
   });


    return NextResponse.json(helper, { status: 201 });
  } catch (error) {
    console.error("Helper signup error:", error);
    return NextResponse.json(
      { error: "Failed to sign up" },
      { status: 500 }
    );
  }
}