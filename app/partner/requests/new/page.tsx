"use client";

import { useState } from "react";

export default function PartnerNewRequestPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const form = new FormData(e.target);

    const res = await fetch("/api/partner/create-request", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setStatus("Request created successfully.");
      e.target.reset();
    } else {
      setStatus("Failed to create request.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Create a New Help Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Person's Name"
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          required
          className="w-full border p-2 rounded"
        >
          <option value="FOOD">Food</option>
          <option value="CLOTHING">Clothing</option>
          <option value="SHELTER">Shelter</option>
          <option value="RIDES">Rides</option>
          <option value="SUPPLIES">Supplies</option>
          <option value="OTHER">Other</option>
        </select>

        <textarea
          name="story"
          placeholder="Describe the need..."
          required
          className="w-full border p-2 rounded h-32"
        />

        <input
          name="location"
          type="text"
          placeholder="Location (e.g., Helena)"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Create Request
        </button>
      </form>

      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
}