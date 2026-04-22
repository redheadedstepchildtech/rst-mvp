"use client";

import { useState, useEffect } from "react";
import { put } from "@vercel/blob/client";

export default function EditPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load donation data
  useEffect(() => {
    async function fetchDonation() {
      const res = await fetch(`/api/get/${id}`);
      const data = await res.json();
      setDonation(data);
      setPhotoPreview(data.photoUrl || null);
    }
    fetchDonation();
  }, [id]);

  if (!donation) {
    return (
      <div className="max-w-xl mx-auto p-8">
        <p>Loading...</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Handle photo upload
    let photoUrl = donation.photoUrl;
    const file = formData.get("photo") as File | null;

    if (file && file.size > 0) {
      const blob = await put(`donation-${Date.now()}.jpg`, file, {
        access: "public",
      });
      photoUrl = blob.url;
    }

    const payload = {
      amount: Number(formData.get("amount")),
      donorName: formData.get("donorName"),
      donorEmail: formData.get("donorEmail"),
      message: formData.get("message"),
      story: formData.get("story"),
      template: formData.get("template"),
      photoUrl,
    };

    const res = await fetch(`/api/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Error updating donation");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Donation Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Donor Name */}
        <input
          type="text"
          name="donorName"
          defaultValue={donation.donorName}
          required
          className="border p-3 rounded-lg"
        />

        {/* Donor Email */}
        <input
          type="email"
          name="donorEmail"
          defaultValue={donation.donorEmail}
          required
          className="border p-3 rounded-lg"
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          defaultValue={donation.amount}
          required
          className="border p-3 rounded-lg"
        />

        {/* Message */}
        <textarea
          name="message"
          defaultValue={donation.message}
          className="border p-3 rounded-lg"
        />

        {/* Story */}
        <textarea
          name="story"
          defaultValue={donation.story}
          className="border p-3 rounded-lg h-32"
        />

        {/* Photo Upload */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-700">Update Photo</p>

          <input
            type="file"
            name="photo"
            accept="image/*"
            className="border p-2 rounded-lg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setPhotoPreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />

          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="rounded-lg border mt-2 max-h-48 object-cover"
            />
          )}
        </div>

        {/* Template Selector */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-700">Choose a Template</p>

          <div className="grid grid-cols-3 gap-3">
            {["bold", "warm", "minimal"].map((tpl) => (
              <label
                key={tpl}
                className="cursor-pointer border rounded-lg p-3 text-center hover:bg-gray-100 transition"
              >
                <input
                  type="radio"
                  name="template"
                  value={tpl}
                  defaultChecked={donation.template === tpl}
                  className="hidden"
                />
                <span className="font-semibold capitalize">{tpl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}