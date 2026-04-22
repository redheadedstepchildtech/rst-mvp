"use client";

import { useState } from "react";

export default function PartnerSendAlert() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const form = new FormData(e.target);
    const res = await fetch("/api/alerts/send", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setStatus("Alert sent!");
      e.target.reset();
    } else {
      setStatus("Failed to send alert.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Send Community Alert</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="message"
          placeholder="Type your alert message here..."
          required
          className="w-full border p-2 rounded h-32"
        />

        <select
          name="category"
          required
          className="w-full border p-2 rounded"
        >
          <option value="ALL">All Subscribers</option>
          <option value="FOOD">Food</option>
          <option value="CLOTHING">Clothing</option>
          <option value="SHELTER">Shelter</option>
          <option value="RIDES">Rides</option>
          <option value="SUPPLIES">Supplies</option>
          <option value="EVENTS">Events</option>
          <option value="OTHER">Other</option>
        </select>

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send Alert
        </button>
      </form>

      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
}