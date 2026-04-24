"use client";

import { useState } from "react";

interface Props {
  data: {
    title: string;
    description: string;
    type: string;
    availability: string;
    contactPreference: string;
  };
  onNext: (updated: any) => void;
}

export default function OfferHelpDetailsStep({ data, onNext }: Props) {
  const [form, setForm] = useState(data);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Help Offer Details</h2>

      <input
        className="border rounded w-full px-2 py-1 mb-3"
        placeholder="What are you offering?"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <textarea
        className="border rounded w-full px-2 py-1 mb-3"
        placeholder="Describe your offer..."
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <input
        className="border rounded w-full px-2 py-1 mb-3"
        placeholder="Type of help"
        value={form.type}
        onChange={(e) => update("type", e.target.value)}
      />

      <input
        className="border rounded w-full px-2 py-1 mb-3"
        placeholder="Availability"
        value={form.availability}
        onChange={(e) => update("availability", e.target.value)}
      />

      <input
        className="border rounded w-full px-2 py-1 mb-3"
        placeholder="Contact preference"
        value={form.contactPreference}
        onChange={(e) => update("contactPreference", e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onNext(form)}
      >
        Continue
      </button>
    </div>
  );
}