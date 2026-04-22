"use client";

import { useState } from "react";

export default function PartnerSignup() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Creating account...");

    const form = new FormData(e.target);
    const res = await fetch("/api/partners/signup", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setStatus("Account created! You can now log in.");
      e.target.reset();
    } else {
      setStatus("Failed to create account.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Partner Signup</h1>

      <p className="text-gray-600">
        For churches, shelters, and community groups who want to send alerts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Organization Name"
          required
          className="w-full border p-2 rounded"
        />

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
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Create Account
        </button>
      </form>

      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
}