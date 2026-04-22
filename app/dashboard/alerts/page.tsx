"use client";

import { useState } from "react";

export default function SendAlertPage() {
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

        {/* NEW: Urgent checkbox */}
        <label className="flex items-center gap-2">
          <input type="checkbox" name="urgent" />
          <span>Mark as urgent</span>
        </label>

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