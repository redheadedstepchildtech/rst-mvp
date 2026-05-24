import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NeedDetailsPage({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

  if (!need) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{need.title}</h1>

      <p className="text-gray-700 font-semibold">{need.category}</p>

      <p className="text-gray-800 whitespace-pre-line">{need.description}</p>

      <p className="text-gray-600">
        Contact: <span className="font-semibold">{need.contact}</span>
      </p>

      <p className="text-sm text-gray-500">
        Posted: {new Date(need.createdAt).toLocaleString()}
      </p>

      <a
        href="/needs"
        className="inline-block mt-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        ← Back to Needs
      </a>
    </div>
  );
}

