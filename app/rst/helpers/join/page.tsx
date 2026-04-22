"use client";

import { useState } from "react";

export default function HelperSignupPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/helpers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, name }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-sky-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4">You're signed up!</h1>
          <p className="text-gray-700 mb-6">
            We’ll text you when someone nearby needs help.
          </p>
          <a href="/rst/needs" className="text-blue-600 underline text-lg">
            Back to posts
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-sky-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Get Text Alerts</h1>
        <p className="text-gray-700 mb-6">
          When someone nearby needs help, we’ll send you a quick text.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Sign me up
          </button>
        </form>
      </div>
    </main>
  );
}