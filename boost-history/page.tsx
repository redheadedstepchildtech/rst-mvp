import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BoostHistoryPage() {
  const boosts = await prisma.need.findMany({
    where: {
      boostCount: { gt: 0 },
    },
    orderBy: {
      lastBoostedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      boostCount: true,
      boostType: true,
      lastBoostedAt: true,
    },
  });

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Boost History</h1>

      {boosts.length === 0 && (
        <p className="text-gray-600">No boosts have been used yet.</p>
      )}

      <div className="space-y-4">
        {boosts.map((need) => (
          <div
            key={need.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  <Link
                    href={`/need/${need.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {need.title}
                  </Link>
                </h2>

                <p className="text-gray-600 text-sm">
                  Boosted on{" "}
                  {need.lastBoostedAt
                    ? new Date(need.lastBoostedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Unknown date"}
                </p>
              </div>

              <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {need.boostType || "Boosted"}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Total boosts: {need.boostCount}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/rst"
        className="text-blue-600 underline inline-block mt-6"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}