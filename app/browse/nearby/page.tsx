"use client";

import { useState } from "react";
import Link from "next/link";

export default function NearbyPage() {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(10);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function searchNearby(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/nearby", {
      method: "POST",
      body: JSON.stringify({ zip, radius }),
    });

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      setResults([]);
      return;
    }

    setResults(json.results);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Stories Near You</h1>

      <form onSubmit={searchNearby} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">ZIP Code</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Radius (miles)</label>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          >
            <option value={5}>5 miles</option>
            <option value={10}>10 miles</option>
            <option value={25}>25 miles</option>
            <option value={50}>50 miles</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600 mb-6">{error}</p>}

      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Results ({results.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((story) => (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-1">{story.name}</h3>

                <p className="text-sm text-gray-600 mb-2">
                  {story.city}, {story.state}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  {story.distance.toFixed(1)} miles away
                </p>

                <p className="text-gray-700 line-clamp-3 mb-3">
                  {story.needs}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}