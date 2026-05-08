"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestHelpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    contact: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: form.title,
      category: "general", // default category for now
      description: form.description,
      city: form.city,
      state: form.state,
      zip: form.zip,
      contact: form.contact,
    };

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const formData = {
    name,
    phone,
    email,
    description,
    category,
    urgency,
  };

  const res = await fetch("/api/request-help", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (data.success) {
    alert("Request submitted successfully");
  } else {
    alert("There was an error submitting your request");
  }
}
    const res = await fetch("/api/request-help", {
      method: "POST",
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
          <label className="block font-semibold mb-1">What do you need?</label>
          <input
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
          <label className="block font-semibold mb-1">Your story</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 h-32"
            placeholder="Tell us what's going on and how the community can help..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Contact method</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Email, phone, or preferred contact"
            required
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}