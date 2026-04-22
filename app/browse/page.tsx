"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrowsePage() {
  const [stories, setStories] = useState<any[]>([]);
{/* Filters */}
<div className="flex flex-wrap gap-4 mb-8">
  <select
    className="border rounded-md px-3 py-2"
    value={selectedNeed}
    onChange={(e) => setSelectedNeed(e.target.value)}
  >
    <option value="">All Needs</option>
    {uniqueNeeds.map((need) => (
      <option key={need} value={need}>
        {need}
      </option>
    ))}
  </select>

{filteredStories.length === 0 && (
  <div className="text-center text-gray-600 py-10">
    <p className="text-lg font-medium mb-2">No stories match your filters.</p>
    <p className="text-sm">Try adjusting your search or clearing your filters.</p>
  </div>
)}

{filteredStories.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {filteredStories.map((story) => (
      <div
        key={story.id}
        className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
      >
        {/* card content */}
      </div>
    ))}
  </div>
)}

const uniqueNeeds = [...new Set(stories.map((s) => s.needs).filter(Boolean))];
const uniqueCategories = [...new Set(stories.map((s) => s.category).filter(Boolean))];
const uniqueCities = [...new Set(stories.map((s) => s.city).filter(Boolean))];

const filteredStories = stories.filter((s) => {
  return (
    (!selectedNeed || s.needs === selectedNeed) &&
    (!selectedCategory || s.category === selectedCategory) &&
    (!selectedCity || s.city === selectedCity)
  );
});

{filteredStories.map((story) => (
  // card code here
))}

  <select
    className="border rounded-md px-3 py-2"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    {uniqueCategories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>

  <select
    className="border rounded-md px-3 py-2"
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
  >
    <option value="">All Cities</option>
    {uniqueCities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>
</div>

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/browse");
      if (!res.ok) return;
      const json = await res.json();
      setStories(json);
    }
    load();
  }, []);

  // Generate a short summary for each story
  function getSummary(story: any) {
    if (story.needs) {
      return `Seeking help with ${story.needs.toLowerCase()}.`;
    }
    if (story.story) {
      return story.story.length > 120
        ? story.story.slice(0, 120) + "..."
        : story.story;
    }
    return "No summary available.";
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Browse Stories</h1>

      {stories.length === 0 && (
        <p className="text-gray-600">No stories available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Name */}
            {story.name && (
              <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
            )}

            {/* Summary */}
            <p className="text-gray-700 mb-3">{getSummary(story)}</p>

            {/* Location */}
            {(story.city || story.state) && (
              <p className="text-gray-500 text-sm mb-4">
                {[story.city, story.state].filter(Boolean).join(", ")}
              </p>
            )}

            {/* View Story */}
            <Link
              href={`/story/${story.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              View Story
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}