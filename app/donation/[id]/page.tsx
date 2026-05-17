import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // adjust if your prisma path is different
import { useState } from "react";

export default async function DonationPage({ params }: { params: { id: string } }) {
  const profileId = params.id;

  // Load the profile from your database
  const profile = await prisma.profile.findUnique({
    where: { id: profileId }
  });

  if (!profile) {
    notFound();
  }

  return (
    <DonationClient profile={profile} />
  );
}

// Client component for interactivity
function DonationClient({ profile }: { profile: any }) {
  const [amount, setAmount] = useState("5.00");
  const [loading, setLoading] = useState(false);

  async function handleDonate() {
    setLoading(true);

    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileId: profile.id,
        amountDollars: amount
      })
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Donate to {profile.name}
      </h1>

      <p className="text-gray-700 mb-6 text-center">
        {profile.greeting || "Your support makes a difference."}
      </p>

      <label className="block mb-4">
        <span className="text-gray-800 font-semibold">Donation Amount ($)</span>
        <input
          type="number"
          step="0.01"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full p-3 border rounded-lg"
        />
      </label>

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
      >
        {loading ? "Redirecting…" : "Donate with Stripe"}
      </button>
    </div>
  );
}