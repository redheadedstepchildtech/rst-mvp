"use client";

import { useState } from "react";

export default function CreateDonationPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      category: formData.get("category"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/monetary-donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = `/qr/${data.donation.id}`;
    } else {
      alert("Error creating donation request");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <section className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Donation Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What do you need help with?
            </label>
            <select
              name="category"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a category…</option>
              <option value="disabled-vet">Disabled Vet</option>
              <option value="vet">Veteran</option>
              <option value="single-parent">Single Parent</option>
              <option value="fundraising">Fundraising</option>
              <option value="medical-bills">Medical Bills</option>
              <option value="hygiene">Hygiene</option>
              <option value="motel-stay">Motel Stay</option>
              <option value="new-clothes">New Clothes</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <textarea
              name="message"
              className="w-full border rounded px-3 py-2"
              placeholder="A short message for your donors..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            {loading ? "Creating..." : "Create Donation Request"}
          </button>

        </form>
      </section>
    </main>
  );
}