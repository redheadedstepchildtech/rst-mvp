"use client";

import { useState } from "react";

export default function SubscribeToAlerts() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const form = new FormData(e.target);
    const res = await fetch("/api/alerts/subscribe", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setStatus("Subscribed successfully!");
      e.target.reset();
    } else {
      setStatus("Failed to subscribe.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Sign Up for Community Alerts</h1>

      <p className="text-gray-600">
        Get notified when shelters, churches, or community groups have free items, food, clothing, or urgent announcements.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone Number (optional)"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="smsOptIn" />
          <span className="text-gray-700">Receive alerts by text message</span>
        </label>

        <select
          name="category"
          required
          className="w-full border p-2 rounded"
        >
          <option value="ALL">All Alerts</option>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Subscribe
        </button>
      </form>

      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
}