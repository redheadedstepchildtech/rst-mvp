import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const helpOffer = await prisma.helpOffer.create({
      data: {
        title: body.title,
        type: body.type,
        description: body.description,
        availability: body.availability,
        contactPreference: body.contactPreference,
        photos: {
          create: body.photos?.map((url: string) => ({
            url,
          })) || [],
        },
      },
      include: { photos: true },
    });

    return NextResponse.json(helpOffer);
  } catch (error) {
    console.error("Help Offer POST error:", error);
    return NextResponse.json(
      { error: "Failed to create help offer" },
      { status: 500 }
    );
  }
}