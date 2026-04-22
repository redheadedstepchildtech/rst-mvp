import { prisma } from "@/lib/prisma";

export default async function AdminNeedsPage() {
  const needs = await prisma.need.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Needs</h1>

      <div className="space-y-4">
        {needs.map((n) => (
          <a
            key={n.id}
            href={`/need/${n.id}`}
            className="block border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-semibold">{n.title}</div>
            <div className="text-sm text-gray-500">{n.type}</div>
          </a>
        ))}
      </div>
    </div>
  );
}