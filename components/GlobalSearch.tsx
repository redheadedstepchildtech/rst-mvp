"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  Housing: "🏠",
  Food: "🍎",
  Medical: "🚑",
  Transportation: "🚗",
  Clothing: "🧥",
  Utilities: "🔌",
  Other: "📦",
};

function categoryIcon(category?: string) {
  return CATEGORY_ICONS[category ?? "Other"] ?? "📦";
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json);
    }

    const delay = setTimeout(fetchResults, 200);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full max-w-md" ref={boxRef}>
      <input
        type="text"
        placeholder="Search needs..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full border rounded-lg px-4 py-2 shadow-sm"
      />

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((need) => (
            <Link
              key={need.id}
              href={`/need/${need.id}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{categoryIcon(need.category)}</span>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {need.title}
                </span>

                <span className="text-xs text-gray-500 flex items-center gap-1">
                  {categoryIcon(need.category)}
                  {need.category}
                </span>

                <span className="text-xs text-gray-600 line-clamp-2">
                  {need.story}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 px-4 py-3 text-gray-500 flex items-center gap-2">
          <span>📦</span>
          No results found
        </div>
      )}
    </div>
  );
}
