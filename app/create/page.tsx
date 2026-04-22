"use client";

import { useState } from "react";

const MONTANA_CITIES = [
  "Helena",
  "East Helena",
  "Montana City",
  "Clancy",
  "Boulder",
  "Basin",
  "Townsend",
  "Winston",
  "Wolf Creek",
  "Craig",
  "Lincoln",
  "Augusta",
  "Canyon Creek",
  "Marysville",
  "Other..."
];

const STATES = [
  "MT","AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"
];

export default function CreateStoryPage() {
  const [city, setCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [state, setState] = useState("MT");
  const [zip, setZip] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [tags, setTags] = useState("");
  const [needs, setNeeds] = useState("");
  const [story, setStory] = useState("");

  // AI cleanup modal
  const [showModal, setShowModal] = useState(false);
  const [improvedStory, setImprovedStory] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");

  async function handleCleanup() {
    setLoadingAI(true);
    setAiError("");

    const res = await fetch("/api/cleanup", {
      method: "POST",
      body: JSON.stringify({ story }),
    });

    const json = await res.json();
    setLoadingAI(false);

    if (json.error) {
      setAiError(json.error);
      return;
    }

    setImprovedStory(json.improved);
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const finalCity = city === "Other..." ? customCity : city;

    const res = await fetch("/api/create-story", {
      method: "POST",
      body: JSON.stringify({
        name,
        category,
        tags,
        needs,
        story,
        city: finalCity,
        state,
        zip
      })
    });

    const json = await res.json();
    if (json.success) {
      window.location.href = `/story/${json.id}`;
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Create a Story</h1>

      {/* AI Cleanup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Improved Story</h2>

            <textarea
              className="w-full border rounded p-3 h-60"
              value={improvedStory}
              readOnly
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setStory(improvedStory);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* CITY */}
        <div>
          <label className="block font-semibold mb-1">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select a city</option>
            {MONTANA_CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {city === "Other..." && (
            <input
              type="text"
              placeholder="Enter your city"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="border rounded px-3 py-2 w-full mt-2"
            />
          )}
        </div>

        {/* STATE */}
        <div>
          <label className="block font-semibold mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* ZIP */}
        <div>
          <label className="block font-semibold mb-1">ZIP (optional)</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* NAME */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="block font-semibold mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* NEEDS */}
        <div>
          <label className="block font-semibold mb-1">Needs</label>
          <textarea
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* STORY */}
        <div>
          <label className="block font-semibold mb-1">Story</label>

          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="border rounded px-3 py-2 w-full h-40"
          />

          {/* AI Cleanup Button */}
          <button
            type="button"
            onClick={handleCleanup}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loadingAI ? "Improving..." : "Improve My Story"}
          </button>

          {aiError && (
            <p className="text-red-600 mt-2">{aiError}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create Story
        </button>
      </form>
    </div>
  );
}