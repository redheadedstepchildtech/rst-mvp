"use client";

import { useState } from "react";

export default function DonatePageClient({ slug }: { slug: string }) {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");

  async function startCheckout() {
    const finalAmount = custom ? Number(custom) : amount;

    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a valid amount.");
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ slug, amount: finalAmount }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error starting checkout.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Choose Your Donation Amount</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[10, 25, 50, 100].map((amt) => (
          <button
            key={amt}
            onClick={() => {
              setAmount(amt);
              setCustom("");
            }}
            className={`py-3 rounded-lg border ${
              amount === amt && !custom
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            ${amt}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Custom amount"
        value={custom}
        onChange={(e) => {
          setCustom(e.target.value);
          setAmount(0);
        }}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <button
        onClick={startCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Donate ${custom || amount}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Powered by Stripe • Secure Payment
      </p>
    </div>
  );
}
