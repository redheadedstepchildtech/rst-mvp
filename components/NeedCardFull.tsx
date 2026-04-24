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

export default function NeedCardFull({ need }: { need: any }) {
  return (
    <article className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
      {/* HEADER */}
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span>{categoryIcon(need.category)}</span>
            {need.title}
            {need.premium && <span>⭐</span>}
            {need.urgent && <span>🆘</span>}
            {need.nonprofitName && <span>🏛</span>}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {need.category && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {need.category}
              </span>
            )}

            {need.urgent && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                🆘 Urgent
              </span>
            )}

            {need.premium && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                ⭐ Premium
              </span>
            )}

            {need.nonprofitName && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                🏛 Nonprofit
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          {need.createdAt && (
            <p className="text-xs text-gray-400">
              {new Date(need.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </header>

      {/* NONPROFIT INFO */}
      {need.nonprofitName && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Organization:</strong> {need.nonprofitName}
        </div>
      )}

      {need.ein && (
        <div className="text-sm text-gray-700">
          <strong>EIN:</strong> {need.ein}
        </div>
      )}

      {/* STORY */}
      {need.story && (
        <p className="mt-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
          {need.story}
        </p>
      )}

      {/* PHOTOS */}
      {need.photos?.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {need.photos.map((url: string) => (
            <img
              key={url}
              src={url}
              alt="Need photo"
              className="w-full h-28 object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>
      )}

      {/* AI LISTING */}
      {need.aiListing && (
        <section className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span>{categoryIcon(need.category)}</span>
            AI‑Generated Listing
          </h3>

          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap flex items-start gap-2">
            <span className="text-xl">{categoryIcon(need.category)}</span>
            {need.aiListing}
          </p>
        </section>
      )}

      {/* AI APPRAISAL */}
      {need.aiAppraisal && (
        <section className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <span>{categoryIcon(need.category)}</span>
            AI‑Generated Appraisal
          </h3>

          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap flex items-start gap-2">
            <span className="text-xl">{categoryIcon(need.category)}</span>
            {need.aiAppraisal}
          </p>
        </section>
      )}

      {/* REPORT BUTTON */}
      <button
        className="mt-4 text-xs text-red-600 hover:underline"
        onClick={() => alert("Report submitted. Thank you.")}
      >
        Report Photo
      </button>
    </article>
  );
}