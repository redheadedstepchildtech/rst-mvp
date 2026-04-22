"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

function slugifyCity(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function CityBrowsePage() {
  const params = useParams();
  const citySlug = params?.city as string;

  const [stories, setStories] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [tags, setTags] = useState<{ [tag: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch("/api/list-stories");
      const json = await res.json();

      // Filter by city slug
      const cityStories = json.filter((story: any) => {
        if (!story.city) return false;
        return slugifyCity(story.city) === citySlug;
      });

      setStories(cityStories);
      setFiltered(cityStories);

      // Build tags map
      const tagCounts: { [tag: string]: number } = {};
      cityStories.forEach((story: any) => {
        if (Array.isArray(story.tags)) {
          story.tags.forEach((t: string) => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
          });
        }
      });
      setTags(tagCounts);

      // Trending (simple: sort by views)
      const trendingSorted = [...cityStories].sort(
        (a, b) => (b.analytics?.views || 0) - (a.analytics?.views || 0)
      );
      setTrending(trendingSorted.slice(0, 5));

      // Recently updated
      const recentSorted = [...cityStories].sort(
        (a, b) =>
          new Date(b.lastUpdatedISO).getTime() -
          new Date(a.lastUpdatedISO).getTime()
      );
      setRecent(recentSorted.slice(0, 5));

      setLoading(false);
    }

    if (citySlug) {
      load();
    }
  }, [citySlug]);

  useEffect(() => {
    let results = [...stories];

    if (search.trim()) {
      const s = search.toLowerCase();
      results = results.filter((story) =>
        story.name.toLowerCase().includes(s) ||
        story.needs.toLowerCase().includes(s) ||
        story.story.toLowerCase().includes(s)
      );
    }

    setFiltered(results);
  }, [search, stories]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        Loading city stories…
      </div>
    );
  }

  if (!stories.length) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">
          No stories found for this city.
        </h1>
        <Link href="/browse" className="text-blue-600 underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  const displayCity = stories[0].city;
  const displayState = stories[0].state || "MT";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Stories in {displayCity}, {displayState}
          </h1>
          <Link href="/browse" className="text-sm text-blue-600 underline">
            Back to all stories
          </Link>
        </div>

        <div className="w-48">
          <input
            type="text"
            placeholder="Search in this city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      {/* TAGS IN THIS CITY */}
      {Object.keys(tags).length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Popular Tags Here</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(tags)
              .sort((a: any, b: any) => b[1] - a[1])
              .slice(0, 20)
              .map(([tag, count]) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {tag} ({count})
                </span>
              ))}
          </div>
        </div>
      )}

      {/* TRENDING IN THIS CITY */}
      {trending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Trending in {displayCity}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trending.map((story: any) => (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-1">{story.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {story.analytics?.views || 0} views
                </p>
                <p className="text-gray-700 line-clamp-3 mb-3">
                  {story.needs}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* RECENTLY UPDATED IN THIS CITY */}
      {recent.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Recently Updated in {displayCity}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recent.map((story: any) => (
              <Link
                key={story.id}
                href={`/story/${story.id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-1">{story.name}</h3>
                <p className="text-xs text-gray-500">
                  Updated {story.lastUpdatedHuman}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ALL STORIES IN THIS CITY */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          All Stories in {displayCity}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((story: any) => (
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

              <p className="text-xs text-gray-500">
                {story.analytics?.views || 0} views • Updated{" "}
                {story.lastUpdatedHuman}
              </p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No stories match your search in this city.
          </p>
        )}
      </div>
    </div>
  );
}