"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

// ❌ REMOVE THIS — it does not belong on the create page
// const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/qr/${need.id}`;
// const qrDataUrl = await QRCode.toDataURL(qrUrl);

// Continue with your create form component...


const TYPES = [
  { value: "story", label: "Story" },
  { value: "donation", label: "Donation Request" },
  { value: "help-offer", label: "Help Offer" },
  { value: "swap", label: "Swap / Trade" },
  { value: "resource", label: "Resource" },
  { value: "announcement", label: "Announcement" },
];

export default function CreateNeedPage() {
  const [type, setType] = useState("story");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [needs, setNeeds] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MT");
  const [zip, setZip] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // Auto-select type from URL: /create-need?type=donation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    if (t) setType(t);
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const form = new FormData();
    form.append("type", type);
    form.append("title", title);
    form.append("category", category);
    form.append("description", description);
    form.append("tags", tags);
    form.append("needs", needs);
    form.append("city", city);
    form.append("state", state);
    form.append("zip", zip);
    if (photo) form.append("photo", photo);

    const res = await fetch("/api/needs", {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    window.location.href = `/need/${json.id}`;
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create a Need</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TYPE */}
        <div>
          <label className="block font-semibold mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="border rounded px-3 py-2 w-full h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* NEEDS (only for story/donation) */}
        {(type === "story" || type === "donation") && (
          <div>
            <label className="block font-semibold mb-1">Needs</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
            />
          </div>
        )}

        {/* TAGS */}
        <div>
          <label className="block font-semibold mb-1">Tags</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* LOCATION */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City"
            className="border rounded px-3 py-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="border rounded px-3 py-2"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="ZIP"
            className="border rounded px-3 py-2"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        {/* PHOTO */}
        <div>
          <label className="block font-semibold mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </div>

        <button className="px-4 py-2 bg-black text-white rounded">
          Create Need
        </button>
      </form>
    </div>
  );
}