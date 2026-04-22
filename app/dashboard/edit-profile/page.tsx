"use client";

import { useState } from "react";

export default function EditProfilePage() {
  // Placeholder initial values — replace with DB fetch later
  const [name, setName] = useState("Sarah M.");
  const [city, setCity] = useState("Helena, MT");
  const [tagline, setTagline] = useState("Trying to get back on my feet.");
  const [story, setStory] = useState(
    "I recently lost my housing and I'm working hard to rebuild. Any help is deeply appreciated."
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved (placeholder)");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block font-semibold mb-1">Tagline</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        {/* Story */}
        <div>
          <label className="block font-semibold mb-1">Story</label>
          <textarea
            className="w-full border rounded p-2 h-32"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}