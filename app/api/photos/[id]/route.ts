import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.photo.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Photo DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}