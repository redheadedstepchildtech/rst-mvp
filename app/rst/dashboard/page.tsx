<div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold">Your Dashboard</h1>

"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function boostNeed(needId: number) {
  // Add a boost queue entry
  await prisma.boostQueue.create({
    data: {
      needId,
      boostType: "paid", // or "credit" if you want to detect credits later
    },
  });

  // Redirect back to dashboard after boosting
  redirect("/rst/dashboard");
}

<form action={async () => boostNeed(need.id)}>
  <button
    type="submit"
    className="mt-3 bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 transition"
  >
    Boost Now
  </button>
</form>

<form action={async () => boostNeed(need.id)}>
  <button
    type="submit"
    disabled={user?.boostCredits <= 0}
    className={`mt-3 px-3 py-2 rounded text-sm transition ${
      user?.boostCredits <= 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-orange-600 text-white hover:bg-orange-700"
    }`}
  >
    {user?.boostCredits <= 0 ? "No Credits" : "Boost Now"}
  </button>
</form>

  {/* ⭐ Create New Listing Button */}
  <a
    href="/rst/create"
    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
  >
    + Create New Listing
  </a>
</div>

{/* ⭐ Boost Credits */}
<div className="mb-6">
  <span className="inline-block bg-sky-100 text-sky-800 px-3 py-2 rounded-full text-sm font-medium">
    Boost credits: {user?.boostCredits ?? 0}
  </span>

  {/* ⭐ Low Credits Warning */}
  {user?.boostCredits <= 1 && (
    <p className="text-red-600 text-sm mt-2">
      You’re running low on boost credits. Boost packs help your listings stay visible.
    </p>
  )}

  {/* ⭐ Optional: Buy Boost Pack Button */}
  {user?.boostCredits <= 1 && (
    <a
      href="/rst/needs"
      className="inline-block bg-blue-600 text-white text-xs px-3 py-2 rounded hover:bg-blue-700 mt-2"
    >
      Buy Boost Pack ($10)
    </a>

// ⭐ Fetch last 7 days of analytics for this need
const today = new Date();
today.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Get analytics entries for the last 7 days
const analytics = await prisma.needAnalytics.findMany({
  where: {
    needId: need.id,
    date: {
      gte: sevenDaysAgo,
    },
  },
  orderBy: { date: "asc" },
});

// Build a 7‑element array of daily view counts
const values: number[] = [];

// ⭐ Compute engagement ratio
const engagement =
  need.views > 0 ? need.clicks / need.views : 0;

// ⭐ Compute score using helper
import { calculateScore } from "./score";

const score = calculateScore({
  views: last7,
  clicks: need.clicks,
  sms: need.smsSent,
  engagement,
  trend,
});

for (let i = 0; i < 7; i++) {
  const d = new Date(sevenDaysAgo);
  d.setDate(d.getDate() + i);

  const entry = analytics.find(
    (a) => new Date(a.date).toDateString() === d.toDateString()
  );

  values.push(entry ? entry.views : 0);
}
{needs.map(async (need) => {

  // ⭐ Paste the entire Part C block right here
  // (before returning the JSX for the card)

  // ...the code block above...

{/* ⭐ Performance Score Badge */}
<div
  className={`
    inline-block px-3 py-1 rounded-full text-sm font-medium
    ${
      score >= 80
        ? "bg-green-100 text-green-700"
        : score >= 50
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }
  `}
>
  Score: {score}
</div>

{score < 50 && (
  <p className="text-xs text-red-600 mt-1">
    Low visibility — consider boosting or updating your listing.
  </p>
)}

{score >= 50 && score < 80 && (
  <p className="text-xs text-yellow-600 mt-1">
    Performing okay — a boost could help reach more helpers.
  </p>
)}

{score >= 80 && (
  <p className="text-xs text-green-600 mt-1">
    Great performance — your listing is trending well.
  </p>
)}

  return (
    <div className="your-card-styles">
      {/* your card UI */}
    </div>
  );
})}

{/* ⭐ Floating Create Button (Mobile Only) */}
<a
  href="/rst/create"
  className="
    fixed
    bottom-6
    right-6
    bg-green-600
    text-white
    w-14
    h-14
    rounded-full
    flex
    items-center
    justify-center
    text-3xl
    shadow-lg
    hover:bg-green-700
    transition
    md:hidden
  "
>
import { Fab } from "./Fab";

export default async function DashboardPage() {
  // ...existing code...

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* your existing dashboard UI */}

      <Fab />
    </main>
  );
}
  +
</a>
  )}
</div>