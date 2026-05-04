"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonateItemPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    donorName: "",
    donorEmail: "",
    message: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/donate-item", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/donate-item/success");
    } else {
      alert("There was an error submitting your donation.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Donate an Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold mb-1">Item Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Example: Winter coat, microwave, baby crib..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Item Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-32"
            placeholder="Describe the item, condition, and any details..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Your Name</label>
          <input
            type="text"
            name="donorName"
            value={form.donorName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Your Email</label>
          <input
            type="email"
            name="donorEmail"
            value={form.donorEmail}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded p-2 h-20"
            placeholder="Optional message to the recipient"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border rounded p-2"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="border rounded p-2"
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            className="border rounded p-2"
            placeholder="ZIP"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}