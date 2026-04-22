"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/browse");
      if (!res.ok) return;
      const json = await res.json();
      setStories(json);
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin: All Stories</h1>

      {stories.length === 0 && (
        <p className="text-gray-600">No stories found.</p>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Need</th>
            <th className="text-left p-3">City</th>
            <th className="text-left p-3">Updated</th>
            <th className="text-left p-3">Actions</th>
            <th className="text-left p-3">Featured</th>
          </tr>
        </thead>

<td className="p-3">
  {story.featured ? (
    <span className="text-blue-600 font-medium">Yes</span>
  ) : (
    <span className="text-gray-400">No</span>
  )}
</td>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-700">{story.id}</td>
              <td className="p-3">{story.name || "—"}</td>
              <td className="p-3">{story.needs || "—"}</td>
              <td className="p-3">{story.city || "—"}</td>
              <td className="p-3 text-sm text-gray-600">
                {story.lastUpdatedHuman}
              </td>
              <td className="p-3">
                <Link
                  href={`/story/${story.id}`}
                  className="text-blue-600 hover:underline mr-3"
                >
                  View
                </Link>

                <button
  onClick={async () => {
    await fetch("/api/feature-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: story.id }),
    });
    window.location.reload(); // refresh admin page
  }}
  className="text-blue-600 hover:underline mr-3"
>
  {story.featured ? "Unfeature" : "Make Featured"}
</button>