import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function DeleteNeedPage({ params }) {
  async function deleteNeed() {
    "use server";

    await prisma.need.delete({
      where: { id: params.id },
    });

    redirect("/admin");
  }

  return (
    <form action={deleteNeed} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-red-600">Delete Need</h1>
      <p>Are you sure you want to delete this Need?</p>

      <button className="px-4 py-2 bg-red-600 text-white rounded">
        Yes, Delete
      </button>
    </form>
  );
}