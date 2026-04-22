import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // ⭐ Hardcoded user until auth is ready
  const userId = 1;

  // ⭐ Fetch user (for boost credits)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // ⭐ Fetch user’s needs, sorted by Boost priority
  const needs = await prisma.need.findMany({
    where: { userId },
    include: {
      boosts: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: [
      { urgencyBoost: "desc" },
      { visibilityBoost: "desc" },
      { dignityBoost: "desc" },
      // If you add createdAt later:
      // { createdAt: "desc" },
    ],
  });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      {/* ⭐ Boost Credits */}
      <div className="mb-6">
        <span className="inline-block bg-sky-100 text-sky-800 px-3 py-2 rounded-full text-sm font-medium">
          Boost credits: {user?.boostCredits ?? 0}
        </span>
      </div>

      {/* ⭐ Listings Section */}
      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>

      {needs.length === 0 && (
        <p className="text-gray-600 mb-6">You haven’t posted any needs yet.</p>
      )}

      <div className="space-y-4">
        {needs.map((need) => {
          const lastBoost = need.boosts?.[0] || null;

          let nextBoostDate = null;
          if (lastBoost) {
            const last = new Date(lastBoost.createdAt);
            const next = new Date(last.getTime() + 1000 * 60 * 60 * 24 * 30);
            nextBoostDate = next.toISOString().split("T")[0];
          }

          return (
            <div
              key={need.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/rst/needs/${need.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {need.title}
                    </Link>
                  </h3>

                  {/* ⭐ Boost Status */}
                  {lastBoost ? (
                    <p className="text-gray-600 text-sm">
                      Last boosted on{" "}
                      {new Date(lastBoost.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      <br />
                      Next boost available on {nextBoostDate}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-sm">Not boosted yet</p>
                  )}
                </div>

                {/* ⭐ Quick Actions */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/rst/needs/${need.id}`}
                    className="bg-green-600 text-white text-xs px-3 py-2 rounded hover:bg-green-700 text-center"
                  >
                    View Listing
                  </Link>

                  <Link
                    href={`/rst/needs/${need.id}`}
                    className="bg-orange-500 text-white text-xs px-3 py-2 rounded hover:bg-orange-600 text-center"
                  >
                    Boost Options
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ⭐ Boost History Link */}
      <div className="mt-8">
        <Link
          href="/rst/boost-history"
          className="text-blue-600 underline text-sm"
        >
          View full boost history →
        </Link>
      </div>
    </main>
  );
}