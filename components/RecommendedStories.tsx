"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecommendedStories({ id }) {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/recommend?id=${id}`);
      const json = await res.json();
      setStories(json);
    }
    load();
  }, [id]);

  if (!stories || stories.length === 0) return null;

  // Filter out any stories missing an ID
  const validStories = stories.filter((s) => s.id);

  if (validStories.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Recommended Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validStories.map((story) => (
          <Link
            key={story.id}
            href={`/story/${story.id}`}
            className="block border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-1">{story.name}</h3>

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {story.category}
            </p>

            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {story.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 line-clamp-3 mb-3">
              {story.needs}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}