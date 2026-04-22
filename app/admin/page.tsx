import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";

async function logout() {
  "use server";
  cookies().delete("rst_admin");
}

export default async function AdminDashboard() {
  const needs = await prisma.need.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        {needs.map((n) => (
          <div
            key={n.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{n.title}</h2>
                <p className="text-sm text-gray-600">
                  {n.city}, {n.state}
                </p>
              </div>

<form action={logout}>
  <button className="px-3 py-1 bg-gray-700 text-white rounded">
    Logout
  </button>
</form>

              <div className="space-x-2">
                <Link
                  href={`/admin/edit/${n.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </Link>

                <Link
                  href={`/admin/delete/${n.id}`}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </Link>

                <Link
                  href={`/admin/verify/${n.id}`}
                  className="px-3 py-1 bg-green-600 text-white rounded"

<Link
  href="/admin/analytics"
  className="px-3 py-1 bg-purple-600 text-white rounded"
>
  View Analytics
</Link>

                >
                  Verify
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}