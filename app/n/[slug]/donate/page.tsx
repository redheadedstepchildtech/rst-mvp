"use client";

import { useState } from "react";

export default function DonatePage({ params }: any) {
  const { slug } = params;

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        slug,
        amount: parseFloat(amount),
        name,
        message,
      }),
    });

    const data = await res.json();

    // Stripe redirect
    window.location.href = data.url;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Donate</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Amount (USD)</label>
          <input
            type="number"
            step="0.01"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Your Name (optional)</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Message (optional)</label>
          <textarea
            className="border p-2 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
