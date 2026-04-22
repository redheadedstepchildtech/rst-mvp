"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrendingPage() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/trending");
      const json = await res.json();
      setStories(json);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Trending Stories
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Stories with the most views, QR scans, and shares.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/story/${story.id}`}
            className="block border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{story.name}</h2>

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

            <p className="text-xs text-gray-500">
              Trending score: {story.trendingScore} •{" "}
              {story.analytics?.views || 0} views •{" "}
              {story.analytics?.qrScans || 0} scans
            </p>
          </Link>
        ))}
      </div>

      {stories.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No trending stories yet. As people view and share, they’ll appear here.
        </p>
      )}
    </div>
  );
}