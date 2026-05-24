"use client";

import { useEffect, useState } from "react";
import NeedCardMinimal from "@/components/NeedCardMinimal";

export default function NeedsPage() {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // FINAL ENTERPRISE‑READY CATEGORIES
  const categories = [
    "Housing",
    "Food",
    "Medical",
    "Transportation",
    "Clothing",
    "Utilities",
    "Emergency Help",
    "Financial Assistance",
    "Other",
  ];

  // ICONS FOR UI POLISH
  const CATEGORY_ICONS: Record<string, string> = {
    Housing: "🏠",
    Food: "🍎",
    Medical: "🚑",
    Transportation: "🚗",
    Clothing: "🧥",
    Utilities: "🔌",
    "Emergency Help": "⚠️",
    "Financial Assistance": "💵",
    Other: "📦",
  };

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/needs");
      const data = await res.json();
      setNeeds(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  // FILTER LOGIC
  const filteredNeeds = selectedCategory
    ? needs.filter((n: any) => n.category === selectedCategory)
    : needs;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community Needs</h1>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
            className={`px-4 py-2 rounded border transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

            {/* NEED LIST */}
      <div className="space-y-4">
        {filteredNeeds.map((need: any) => (
          <NeedCardMinimal key={need.id} need={need} />
        ))}
      </div>

    </div>
  );
}

