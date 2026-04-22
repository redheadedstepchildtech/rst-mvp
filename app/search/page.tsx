import { prisma } from "@/lib/prisma";
import Link from "next/link";

type SearchParams = {
  q?: string;
  category?: string;
  city?: string;
  sort?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams.q?.trim() || "";
  const category = searchParams.category || "";
  const city = searchParams.city || "";
  const sort = searchParams.sort || "newest";
  const page = Number(searchParams.page) || 1;
  const pageSize = 20;

const needs = await prisma.need.findMany({
  where,
  orderBy,
  skip: (page - 1) * pageSize,
  take: pageSize,
});

{need.tags?.split(",").map((tag) => (
  <Link
    key={tag}
    href={`/search?q=${tag}`}
    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
  >
    #{tag.trim()}
  </Link>
))}

  const where: any = {};

  if (category) where.category = category;
  if (city) where.city = city;

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { tags: { contains: q, mode: "insensitive" } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };

  if (sort === "boosted") {
    orderBy = { boostCount: "desc" };
  } else if (sort === "verified") {
    // if you later add a verifiedAt field, sort by that
    orderBy = { lastBoostedAt: "desc" };
  }
{need.boostCount > 0 && (
  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
    {need.boostCount} boosts
  </span>
)}

{need.lastBoostedAt && (
  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
    Recently boosted
  </span>
)}

export const metadata = {
  title: need.title,
  description: need.description?.slice(0, 150),
};

  const needs = await prisma.need.findMany({
    where,
    orderBy,
    take: 50,
  });

  const categories = await prisma.need.groupBy({
    by: ["category"],
    _count: { category: true },
  });

  const cities = await prisma.need.groupBy({
    by: ["city"],
    _count: { city: true },
  });

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Find Needs</h1>

      <SearchFilters
        q={q}
        category={category}
        city={city}
        sort={sort}
        categories={categories}
        cities={cities}
      />

      <section className="grid gap-4 md:grid-cols-2">
        {needs.length === 0 && (
          <p className="text-gray-600">No needs match your search yet.</p>
        )}

        {needs.map((need) => (
          <article
            key={need.id}
            className="border rounded p-4 bg-white shadow-sm flex flex-col gap-2"
          >
<div className="flex gap-4 mt-6">
  {page > 1 && (
    <Link href={`/search?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}>
      Previous
    </Link>
  )}

  {needs.length === pageSize && (
    <Link href={`/search?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}>
      Next
    </Link>
  )}
</div>

            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{need.title}</h2>
              {need.boostCount > 0 && (
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                  {need.boostCount} boosts
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700 line-clamp-3">
              {need.description || "No description yet."}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              {need.category && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {need.category}
                </span>
              )}
              {need.city && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {need.city}
                </span>
              )}
              {need.state && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {need.state}
                </span>
              )}
            </div>

            <Link
              href={`/needs/${need.id}`}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              View details
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

function SearchFilters({
  q,
  category,
  city,
  sort,
  categories,
  cities,
}: {
  q: string;
  category: string;
  city: string;
  sort: string;
  categories: { category: string | null; _count: { category: number } }[];
  cities: { city: string | null; _count: { city: number } }[];
}) {
  return (
    <form className="grid gap-3 md:grid-cols-4 items-end mb-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          name="q"
          defaultValue={q}
          placeholder="Keywords (diapers, rent, food, etc.)"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          defaultValue={category}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.category || "uncat"} value={c.category || ""}>
              {c.category || "Uncategorized"} ({c._count.category})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          name="city"
          defaultValue={city}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">All</option>
          {cities.map((c) => (
            <option key={c.city || "unknown"} value={c.city || ""}>
              {c.city || "Unknown"} ({c._count.city})
            </option>
          ))}
        </select>
      </div>
<Link
  href="/search"
  className="text-sm text-gray-600 underline ml-2"
>
  Clear filters
</Link>

      <div>
        <label className="block text-sm font-medium mb-1">Sort by</label>
        <select
          name="sort"
          defaultValue={sort}
          className="w-full border rounded px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="boosted">Most Boosted</option>
          <option value="verified">Recently Boosted</option>
        </select>
      </div>

      <button className="md:col-span-4 mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Apply Filters
      </button>
    </form>
  );
}
