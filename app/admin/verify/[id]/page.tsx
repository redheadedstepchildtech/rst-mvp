import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function VerifyNeedPage({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

  if (!need) return <div>Need not found</div>;

  async function verifyNeed() {
    "use server";

    await prisma.need.update({
      where: { id: params.id },
      data: { verified: true },
    });

    redirect("/admin");
  }

{need.verified && (
  <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
    Verified
  </span>
)}

await sendEmail(
  "admin@rst.local",
  "Need Verified",
  `<h1>${need.title}</h1><p>This need is now verified.</p>`
);

  return (
    <form action={verifyNeed} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-green-600">Verify Need</h1>
      <p>Mark this Need as verified?</p>

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Verify
      </button>
    </form>
  );
}