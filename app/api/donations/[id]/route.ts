// app/api/donations/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Donation GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch donation" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const donation = await prisma.donation.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
      },
      include: { photos: true },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Donation PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update donation" },
      { status: 500 }
    );
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.donation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Donation DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete donation" },
      { status: 500 }
    );
  }
}