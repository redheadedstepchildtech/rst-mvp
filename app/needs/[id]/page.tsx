import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export async function generateMetadata({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

  if (!need) {
    return {
      title: "Need not found",
      description: "This need does not exist.",
    };
  }

  return {
    title: need.title,
    description: need.description?.slice(0, 150) || "A community need on RST.",
    openGraph: {
      title: need.title,
      description: need.description?.slice(0, 150),
    },
  };
}

export default async function NeedPage({ params }) {
  const need = await prisma.need.findUnique({
    where: { id: params.id },
  });

  if (!need) {
    return <p className="p-6">Need not found.</p>;
  }

  const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/qr/${need.id}`;
  const qrDataUrl = await QRCode.toDataURL(qrUrl);

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{need.title}</h1>

      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {need.category && (
          <span className="px-2 py-1 bg-gray-100 rounded">{need.category}</span>
        )}
        {need.city && (
          <span className="px-2 py-1 bg-gray-100 rounded">{need.city}</span>
        )}
        {need.state && (
          <span className="px-2 py-1 bg-gray-100 rounded">{need.state}</span>
        )}
      </div>

      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {need.description}
      </p>

      {need.tags && (
        <div className="flex flex-wrap gap-2 text-xs text-blue-700">
          {need.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 rounded"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Share This Need</h2>
        <img src={qrDataUrl} alt="QR Code" className="w-40 h-40" />
        <p className="text-sm text-gray-600">
          Scan or share this QR code to help spread the word.
        </p>
      </section>
    </main>
  );
}