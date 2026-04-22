import Link from "next/link";

const tags = [
  "rent",
  "single mom",
  "car broke down",
  "medical bill",
  "lost job",
  "food assistance",
  "veteran",
  "seniors",
  "emergency",
  "homeless",
  "utilities",
  "transportation",
];

export default function TagsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse by Tag</h1>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/rst2/stories?tag=${encodeURIComponent(tag)}`}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition text-sm"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </main>
  );
}