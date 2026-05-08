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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      itemName: form.itemName,
      condition: form.condition,
      description: form.description,
    };

    const res = await fetch("/api/donate-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
          <label htmlFor="name" className="block font-semibold mb-1">
            Your Name
          </label>
          <input
            id="name"
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
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
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
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="(555) 123‑4567"
          />
        </div>

        <div>
          <label htmlFor="itemName" className="block font-semibold mb-1">
            Item Name
          </label>
          <input
            id="itemName"
            name="itemName"
            type="text"
            value={form.itemName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Example: Winter coat, bunk bed, stroller..."
            required
          />
        </div>

        <div>
          <label htmlFor="condition" className="block font-semibold mb-1">
            Condition
          </label>
          <input
            id="condition"
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
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}