export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import NeedCardMinimal from "@/components/NeedCardMinimal";
import NeedCardFull from "@/components/NeedCardFull";
import Link from "next/link";

export default async function DashboardPage({ searchParams }) {
  const sort = searchParams?.sort || "newest";
  const category = searchParams?.category || null;
const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Food: "🍎",
  Medical: "🚑",
  Transportation: "🚗",
  Clothing: "🧥",
  Utilities: "🔌",
  Other: "📦",
};

function categoryIcon(category?: string) {
  return CATEGORY_ICONS[category ?? "Other"] ?? "📦";
}


  const user = {
    id: "dev-user",
    isNonprofit: false,
  };

  orderBy:
  sort === "urgent"
    ? [
        { urgent: "desc" },              // urgent first
        { boosts: { _count: "desc" } },  // then boosted
        { createdAt: "desc" },           // then newest
      ]
  : sort === "boosted"
    ? [
        { boosts: { _count: "desc" } },
        { urgent: "desc" },
        { createdAt: "desc" },
      ]
  : [
      { urgent: "desc" },
      { createdAt: "desc" },
    ],


  return (
    <main className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
  <span>{category ? categoryIcon(category) : "📦"}</span>
  Your Needs
</h1>


          <Link
  href="/dashboard?category=Transportation"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Transportation"
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
  }`}
>
  <span>{categoryIcon("Transportation")}</span>
  Transportation
</Link>

<Link
  href="/dashboard?category=Clothing"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Clothing"
      ? "bg-yellow-500 text-white border-yellow-600"
      : "bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-50"
  }`}
>
  <span>{categoryIcon("Clothing")}</span>
  Clothing
</Link>

<Link
  href="/dashboard?category=Utilities"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Utilities"
      ? "bg-indigo-600 text-white border-indigo-700"
      : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50"
  }`}
>
  <span>{categoryIcon("Utilities")}</span>
  Utilities
</Link>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          Logged in as <span className="font-mono">{user.id}</span>
          {user.isNonprofit && " · Nonprofit"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">

        {/* SUCCESS BANNER */}
        {searchParams?.created === "1" && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-xl shadow-sm">
            Need created successfully.
          </div>
        )}

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/dashboard?sort=newest"
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              sort === "newest"
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
            }`}
          <Link
  href="/dashboard?sort=newest"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${
    sort === "newest"
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
  }`}
>
  <span>🆕</span>
  Newest
</Link>

            href="/dashboard?sort=boosted"
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              sort === "boosted"
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
            }`}
          <Link
  href="/dashboard?sort=boosted"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${
    sort === "boosted"
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
  }`}
>
  <span>⚡</span>
  Most Boosted
</Link>

  href="/dashboard?category=Housing"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Housing"
      ? "bg-purple-600 text-white border-purple-700"
      : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
  }`}
>
  <span>{categoryIcon("Housing")}</span>
  Housing
</Link>


          <Link
  href="/dashboard?category=Food"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Food"
      ? "bg-green-600 text-white border-green-700"
      : "bg-white text-green-700 border-green-300 hover:bg-green-50"
  }`}
>
  <span>{categoryIcon("Food")}</span>
  Food
</Link>

<Link
  href="/dashboard?category=Medical"
  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
    category === "Medical"
      ? "bg-red-600 text-white border-red-700"
      : "bg-white text-red-700 border-red-300 hover:bg-red-50"
  }`}
>
  <span>{categoryIcon("Medical")}</span>
  Medical
</Link>

          <Link
  href="/dashboard"
  className="px-4 py-2 rounded-full text-sm font-medium border bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 flex items-center gap-2"
>
  <span>❌</span>
  Clear Filters
</Link>

        </div>

        {/* EMPTY STATE */}
        {needs.length === 0 && (
          <div className="text-center mt-20 text-gray-600">
            <img
              src="/empty.png"
              alt="No needs"
              className="w-40 mx-auto opacity-70 mb-4"
            />
            <p className="flex items-center justify-center gap-2">
  <span>📦</span>
  You haven’t created any needs yet.
</p>

          </div>
        )}

        {/* NEEDS LIST */}
        <div className="space-y-6">
          {needs.map((need) => {
            const isFull =
              need.premium ||
              need.wantsBoost ||
              need.boosts.length > 0 ||
              user.isNonprofit;

            return isFull ? (
              <NeedCardFull key={need.id} need={need} user={user} />
            ) : (
              <NeedCardMinimal key={need.id} need={need} />
            );
          })}
        </div>

      </div>
    </main>
  );
}