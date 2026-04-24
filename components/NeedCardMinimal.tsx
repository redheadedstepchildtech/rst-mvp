"use client";

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

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "purple",
  Food: "green",
  Medical: "red",
  Transportation: "blue",
  Clothing: "yellow",
  Utilities: "indigo",
  Other: "gray",
};

function categoryClasses(category?: string) {
  const color = CATEGORY_COLORS[category ?? "Other"] ?? "gray";

  return {
    badge: `bg-${color}-100 text-${color}-700`,
    border: `border-l-4 border-${color}-500`,
  };
}

  export default function NeedCardMinimal({ need }: { need: any }) {
  const created = new Date(need.createdAt).toLocaleDateString();

  return (
    <article
      className={`rounded-xl p-6 bg-white border shadow-sm transition hover:shadow-md
        ${categoryClasses(need.category).border}
        ${need.urgent ? "border-red-500" : "border-gray-200"}
      `}
    >
      {/* HEADER */}
      <header className="flex justify-between items-start">
        <div>
          {/* Title with icon */}
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span>{categoryIcon(need.category)}</span>
            {need.title}
          </h2>

          {/* Category badge */}
          {need.category && (
            <span
              className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${categoryClasses(need.category).badge}`}
            >
              {categoryIcon(need.category)} {need.category}
            </span>
          )}

          {/* Urgent badge */}
          {need.urgent && (
            <span className="inline-block mt-2 ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
              🆘 Urgent
            </span>
          )}
        </div>

        <span className="text-xs text-gray-400">{created}</span>
      </header>

      {/* STORY PREVIEW */}
      {need.story && (
        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
          {need.story}
        </p>
      )}

      {/* FOOTER */}
      <footer className="mt-4 flex justify-end">
        <Link
          href={`/rst/needs/${need.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View details →
        </Link>
      </footer>
    </article>
  );
}