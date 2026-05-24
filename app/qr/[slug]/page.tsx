import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export default async function QRPage({ params }) {
  const { slug } = params;

  // Fetch the donation by slug
  const donation = await prisma.monetaryDonation.findUnique({
    where: { slug },
  });

  if (!donation) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          Donation request not found
        </h1>
      </main>
    );
  }

  // Generate QR code as a data URL
  const qrUrl = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/donate/${slug}`
  );

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <section className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Donation QR Code
        </h1>

        <div className="text-center mb-6">
          <img src={qrUrl} alt="QR Code" className="mx-auto w-64 h-64" />
        </div>

        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold">{donation.name}</p>
          <p className="text-gray-700">{donation.category}</p>
          {donation.message && (
            <p className="text-gray-600 italic">"{donation.message}"</p>
          )}
        </div>

      </section>
    </main>
  );
}
