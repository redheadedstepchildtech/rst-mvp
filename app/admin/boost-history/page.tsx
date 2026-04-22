import { prisma } from "@/lib/prisma";

export default async function BoostHistoryPage() {
  const boosts = await prisma.boostHistory.findMany({
    orderBy: { boostedAt: "desc" },
    include: {
      need: true,
      user: true,
    },
    take: 200,
  });

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Boost History</h1>

      <div className="space-y-4">
        {boosts.map((b) => (
          <div key={b.id} className="p-4 bg-white shadow rounded">
            <p>
              <strong>{b.need.title}</strong>
            </p>

            <p className="text-sm text-gray-600">
              Boosted at: {new Date(b.boostedAt).toLocaleString()}
            </p>

            <p className="text-sm text-gray-600">
              By: {b.user?.name || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}