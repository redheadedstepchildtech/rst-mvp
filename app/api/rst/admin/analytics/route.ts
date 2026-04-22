import prisma from "@/lib/prisma";

export async function GET() {
  const totalDonations = await prisma.donation.count();
  const totalPhotos = await prisma.photo.count();
  const totalCategories = await prisma.category.count();

  const recentDonations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const categoryCounts = await prisma.donation.groupBy({
    by: ["category"],
    _count: { category: true },
  });

  return Response.json({
    totalDonations,
    totalPhotos,
    totalCategories,
    recentDonations,
    categoryCounts,
  });
}