import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditNeedPage({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

  if (!need) return <div>Need not found</div>;

  async function updateNeed(formData) {
    "use server";

    await prisma.need.update({
      where: { id: params.id },
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
      },
    });

    redirect("/admin");
  }

  return (
    <form action={updateNeed} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Need</h1>

      <input
        name="title"
        defaultValue={need.title}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        defaultValue={need.description}
        className="w-full border p-2 rounded h-32"
      />

      <input
        name="category"
        defaultValue={need.category || ""}
        className="w-full border p-2 rounded"
      />

      <input
        name="city"
        defaultValue={need.city || ""}
        className="w-full border p-2 rounded"
      />

      <input
        name="state"
        defaultValue={need.state || ""}
        className="w-full border p-2 rounded"
      />

      <input
        name="zip"
        defaultValue={need.zip || ""}
        className="w-full border p-2 rounded"
      />

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Changes
      </button>
    </form>
  );
}