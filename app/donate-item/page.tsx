"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonateItemPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    itemName: "",
    condition: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      itemName: form.itemName,
      condition: form.condition,
      description: form.description,
    };

    try {
      const res = await fetch("/api/donate-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/donate-item/success");
      } else {
        console.error("Failed to submit donation");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold">Donate an Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Your Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="(555) 123‑4567"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Item Name</label>
          <input
            name="itemName"
            type="text"
            value={form.itemName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Winter coat, bunk bed, stroller..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Condition</label>
          <input
            name="condition"
            type="text"
            value={form.condition}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="New, like new, good, fair..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-32"
            placeholder="Any details about the item, size, age, etc."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-white w-full ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
