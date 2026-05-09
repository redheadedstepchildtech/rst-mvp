"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestHelpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: form.title,
      category: "general",
      description: form.description,
      city: form.city,
      state: form.state,
      zip: form.zip,
    };

    const res = await fetch("/api/request-help", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/request-help/success");
    } else {
      alert("There was an error submitting your request.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Request Help</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            What do you need?
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Example: Help with groceries, rent, transportation..."
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Your story
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-32"
            placeholder="Tell us what's going on and how the community can help..."
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="city" className="block font-semibold mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="City"
            />
          </div>

          <div>
            <label htmlFor="state" className="block font-semibold mb-1">
              State
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="State"
            />
          </div>

          <div>
            <label htmlFor="zip" className="block font-semibold mb-1">
              ZIP
            </label>
            <input
              id="zip"
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="ZIP"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}