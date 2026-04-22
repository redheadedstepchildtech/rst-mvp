import { promises as fs } from "fs";
import path from "path";

async function getDonation(id: string) {
  const dataFile = path.join(process.cwd(), "data", "donations.json");
  const fileData = await fs.readFile(dataFile, "utf8");
  const list = JSON.parse(fileData || "[]");
  return list.find((d: any) => d.id === id) || null;
}

{donation.microPlacement === "top" && donation.microSummary && (
  <h2 className="text-4xl font-bold mb-4">{donation.microSummary}</h2>
)}

export default async function SignPage({ params }: { params: { id: string } }) {
  const donation = await getDonation(params.id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Sign not found.</p>
      </div>
    );
  }

<p className={`micro-summary micro-summary-${donation.microSize}`}>
  {donation.microSummary}
</p>

  return (
    <div className="min-h-screen bg-white flex justify-center p-8 print:p-0">
      <div className="w-full max-w-3xl border-4 border-black p-8 text-center space-y-6">

{donation.microPlacement === "middle" && donation.microSummary && (
  <h2 className="text-4xl font-bold mt-2">{donation.microSummary}</h2>
)}

{donation.microPlacement === "bottom" && donation.microSummary && (
  <h2 className="text-4xl font-bold mt-6">{donation.microSummary}</h2>
)}

<p className="text-sm text-gray-600 mt-1">
  Placement: {donation.microPlacement}
</p>

        {/* BIG QR CODE */}
        <img
          src={donation.qrUrl}
          alt="QR Code"
          className="mx-auto"
          style={{ width: "60%", height: "auto" }}
        />

        {/* NEED HELP */}
        <h1 className="text-5xl font-bold mt-6">Need help?</h1>

{donation.microSummary && (
  <h2 className="text-4xl font-bold mt-2">
    {donation.microSummary}
  </h2>
)}
        {/* SHORT URL */}
        <p className="text-3xl font-semibold mt-2">p/{donation.id}</p>

      </div>
    </div>
  );
}