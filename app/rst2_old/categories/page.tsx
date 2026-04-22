import Link from "next/link";

const categories = [
  "Housing",
  "Food",
  "Medical",
  "Transportation",
  "Family",
  "Emergency",
  "Disability",
  "Veterans",
  "Seniors",
  "Other",
];

export default function CategoriesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse by Category</h1>

      <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/rst2/stories?category=${encodeURIComponent(cat)}`}
            className="block p-4 border rounded-md shadow-sm hover:shadow-md transition"
          >
            <span className="text-lg font-semibold">{cat}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}