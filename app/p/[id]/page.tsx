export const dynamic = "force-dynamic";

import { promises as fs } from "fs";
import path from "path";
import CopyLinkButton from "./CopyLinkButton";

async function getDonation(id: string) {
  const dataFile = path.join(process.cwd(), "data", "donations.json");
  const fileData = await fs.readFile(dataFile, "utf8");
  const list = JSON.parse(fileData || "[]");
  return list.find((d: any) => d.id === id) || null;
}

export default async function DonationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = await getDonation(id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-700 text-lg">This donation page could not be found.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex justify-center p-6 bg-gray-50 theme-${donation.theme}`}>
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-red-700 text-center">
          Need help?
        </h1>

        {/* MAIN PHOTO */}
        {donation.photoUrl && (
          <img
            src={donation.photoUrl}
            alt="Donation"
            className="w-full max-h-80 object-cover rounded-xl shadow-md"
          />
        )}

        {/* CATEGORY */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Category</h2>
          <p className="text-gray-700">{donation.category}</p>
        </div>

        {/* SUMMARY + STORY */}
        <div className="space-y-4">
          {donation.summary && (
            <p className="text-lg font-medium text-gray-900 bg-gray-100 p-4 rounded-xl shadow-sm">
              {donation.summary}
            </p>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Story</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {donation.story}
            </p>
          </div>
        </div>

        {/* PAYOUT METHOD */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Payout Method</h2>
          <p className="text-gray-700">{donation.payoutMethod}</p>
        </div>

        {/* QR CODE */}
        <div className="text-center space-y-3 pt-4 border-t border-gray-200">
          <p className="text-gray-700 font-semibold">Scan to help</p>
          <img
            src={donation.qrUrl}
            alt="QR code"
            className="w-40 h-40 mx-auto shadow-sm rounded-lg"
          />
          <p className="text-sm text-gray-600">Or visit: /p/{donation.id}</p>
        </div>

        {/* SHARE PANEL */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Share this page
          </h2>

          <div className="grid grid-cols-2 gap-3">

            {/* SMS */}
            <a
              href={`sms:?&body=Please take a look: ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/p/${donation.id}`}
              className="bg-green-600 text-white py-2 rounded-lg text-center font-semibold shadow-sm hover:bg-green-700 transition"
            >
              SMS
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Please take a look: ${(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")}/p/${donation.id}`
              )}`}
              target="_blank"
              className="bg-green-700 text-white py-2 rounded-lg text-center font-semibold shadow-sm hover:bg-green-800 transition"
            >
              WhatsApp
            </a>

            {/* Messenger */}
            <a
              href={`fb-messenger://share/?link=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/p/${donation.id}`
              )}`}
              className="bg-blue-600 text-white py-2 rounded-lg text-center font-semibold shadow-sm hover:bg-blue-700 transition"
            >
              Messenger
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=Please help&body=Take a look: ${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
              }/p/${donation.id}`}
              className="bg-gray-700 text-white py-2 rounded-lg text-center font-semibold shadow-sm hover:bg-gray-800 transition"
            >
              Email
            </a>

          </div>

          {/* COPY LINK BUTTON */}
          <CopyLinkButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/p/${donation.id}`}
          />
        </div>

        {/* PRINT MATERIALS */}
        <a
          href={`/p/${donation.id}/print`}
          className="block w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold text-center shadow-sm hover:bg-blue-700 transition"
        >
          Print Materials
        </a>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Powered by Redheaded Stepchild Tech
        </p>

      </div>
    </div>
  );
}