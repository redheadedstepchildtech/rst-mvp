import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

orderBy: [
  { lastBoostedAt: "desc" },
  { boostCount: "desc" },
  { createdAt: "desc" },
],

  if (!q.trim()) return NextResponse.json([]);

  const results = await prisma.need.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { tags: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(results);
}