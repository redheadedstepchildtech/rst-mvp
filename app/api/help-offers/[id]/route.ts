import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const updated = await prisma.helpOffer.update({
      where: { id },
      data: {
        title: body.title,
        type: body.type,
        description: body.description,
        availability: body.availability,
        contactPreference: body.contactPreference,
        // photos can be added later if needed
      },
      include: { photos: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Help Offer PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update help offer" },
      { status: 500 }
    );
  }
}