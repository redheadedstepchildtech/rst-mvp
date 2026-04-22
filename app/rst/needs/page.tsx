import { PrismaClient } from "@prisma/client";
import NeedCard from "../components/NeedCard";

const prisma = new PrismaClient();

export default async function NeedsPage() {
  const needs = await prisma.need.findMany({
    orderBy: { createdAt: "desc" },
    include: { boosts: true }, // Keep this for Boost badge logic
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Community Needs</h1>

      <div className="grid gap-6">
        {needs.map((need) => (
          <NeedCard key={need.id} need={need} />
        ))}
      </div>
    </main>
  );
}