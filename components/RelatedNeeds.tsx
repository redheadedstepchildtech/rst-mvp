import Link from "next/link";
import NeedCardMinimal from "@/components/NeedCardMinimal";

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

export default function RelatedNeeds({ needs, category }) {
  if (!needs || needs.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
        <span>{categoryIcon(category)}</span>
        Related Needs
      </h3>

      <div className="space-y-4">
        {needs.map((need) => (
          <NeedCardMinimal key={need.id} need={need} />
        ))}
      </div>

      <Link
        href={`/dashboard?category=${category}`}
        className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
      >
        <span>{categoryIcon(category)}</span>
        View more in {category}
      </Link>
    </div>
  );
}
