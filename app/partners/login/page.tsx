"use client";

import { useState } from "react";

export default function PartnerLogin() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Logging in...");

    const form = new FormData(e.target);
    const res = await fetch("/api/partners/login", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      window.location.href = "/partners/alerts";
    } else {
      setStatus("Invalid email or password.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Partner Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Log In
        </button>
      </form>

      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
}