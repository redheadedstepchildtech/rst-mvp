import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Totals
  const totalNeeds = await prisma.need.count();
  const totalBoosts = await prisma.need.aggregate({
    _sum: { boostCount: true }
  });

  // Needs by category
  const needsByCategory = await prisma.need.groupBy({
    by: ["category"],
    _count: { category: true }
  });

  // Needs by city
  const needsByCity = await prisma.need.groupBy({
    by: ["city"],
    _count: { city: true }
  });

  // Trending (last 7 days)
  const trending = await prisma.need.findMany({
    where: {
      lastBoostedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    },
    orderBy: { boostCount: "desc" },
    take: 10
  });

  // Recently added
  const recent = await prisma.need.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return NextResponse.json({
    totalNeeds,
    totalBoosts: totalBoosts._sum.boostCount || 0,
    needsByCategory,
    needsByCity,
    trending,
    recent
  });
}