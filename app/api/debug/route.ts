import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const donations = await prisma.donation.findMany();
  const helpOffers = await prisma.helpOffer.findMany();

  return NextResponse.json({
    donations,
    helpOffers,
  });
}