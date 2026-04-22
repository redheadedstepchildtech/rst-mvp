import { prisma } from "@/lib/prisma";
import { addBoost } from "@/app/actions/needActions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BoostPage({ params }) {
  const { id } = params;

  const need = await prisma.need.findUnique({
    where: { id },
    include: {
      boosts: true,
    },
  });

await prisma.boostHistory.create({
  data: {
    needId,
    userId: currentUserId || null,
  },
});

  if (!need) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Need not found</h1>
        <p className="text-gray-600 mt-2">
          This listing may have been removed or is no longer available.
        </p>
      </div>
    );
  }

  async function handleBoost() {
    "use server";
    await addBoost(id);
    redirect(`/rst/needs/${id}`);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {/* Back */}
      <Link
        href={`/rst/needs/${id}`}
        className="inline-block mb-4 text-blue-600 underline text-sm"
      >
        ← Back to Need
      </Link>

      <h1 className="text-3xl font-bold mb-4">Boost This Need</h1>

      <p className="text-gray-700 mb-6">
        Boosting increases visibility and helps this need reach more people.
      </p>

      {/* Current Boost Levels */}
      <div className="mb-6 flex gap-4 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Visibility: {need.visibilityBoost}
        </span>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
          Urgency: {need.urgencyBoost}
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          Dignity: {need.dignityBoost}
        </span>
      </div>

      {/* Boost Button */}
      <form action={handleBoost}>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
        >
          Add Boost
        </button>
      </form>
    </main>
  );
}