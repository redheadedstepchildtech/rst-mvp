export const dynamic = "force-dynamic";

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

async function getDonation(id: string) {
  const dataFile = path.join(process.cwd(), "data", "donations.json");
  const fileData = await fs.readFile(dataFile, "utf8");
  const list = JSON.parse(fileData || "[]");
  return list.find((d: any) => d.id === id) || null;
}

export default async function PrintCenter({ params }: { params: { id: string } }) {
  const donation = await getDonation(params.id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-700 text-lg">Print materials not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 space-y-8">

        <h1 className="text-3xl font-bold text-red-700 text-center">
          Print Materials
        </h1>

        {/* MICRO SUMMARY PREVIEW */}
        {donation.microSummary && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
            <p className="text-purple-800 font-bold text-2xl">
              {donation.microSummary}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This short phrase appears on signs, flyers, and cards.
            </p>
          </div>
        )}

        {/* ONE-SENTENCE SUMMARY PREVIEW */}
        {donation.summary && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <p className="text-blue-800 font-semibold">
              {donation.summary}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This appears at the top of the mini‑site.
            </p>
          </div>
        )}

        {/* QR PREVIEW */}
        <div className="text-center space-y-3">
          <p className="text-gray-700 font-semibold">QR Code</p>
          <img
            src={donation.qrUrl}
            alt="QR code"
            className="w-40 h-40 mx-auto shadow-sm rounded-lg"
          />
          <p className="text-sm text-gray-600">/p/{donation.id}</p>
        </div>

        <p className="text-center text-gray-700">
          Choose a format to print for this donation page.
        </p>

        <div className="space-y-4">

          <Link
            href={`/p/${donation.id}/card`}
            target="_blank"
            className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg text-lg font-semibold shadow-sm hover:bg-gray-900 transition"
          >
            Print Business Card
          </Link>

          <Link
            href={`/p/${donation.id}/flyer`}
            target="_blank"
            className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg text-lg font-semibold shadow-sm hover:bg-blue-800 transition"
          >
            Print Flyer
          </Link>

          <Link
            href={`/p/${donation.id}/sign`}
            target="_blank"
            className="block w-full bg-red-600 text-white text-center py-3 rounded-lg text-lg font-semibold shadow-sm hover:bg-red-700 transition"
          >
            Print Roadside Sign
          </Link>

        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Powered by Redheaded Stepchild Tech
        </p>

      </div>
    </div>
  );
}