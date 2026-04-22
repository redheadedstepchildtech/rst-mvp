import { promises as fs } from "fs";
import path from "path";

async function getDonation(id: string) {
  const dataFile = path.join(process.cwd(), "data", "donations.json");
  const fileData = await fs.readFile(dataFile, "utf8");
  const list = JSON.parse(fileData || "[]");
  return list.find((d: any) => d.id === id) || null;
}

export default async function CardPage({ params }: { params: { id: string } }) {
  const donation = await getDonation(params.id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Card not found.</p>
      </div>
    );
  }

<p className={`micro-summary theme-${donation.theme}`}>
  {donation.microSummary}
</p>

<p className={`micro-summary micro-summary-${donation.microSize}`}>
  {donation.microSummary}
</p>

  return (
    <div className="min-h-screen bg-white flex justify-center p-8 print:p-0">
      <div
        className="border border-gray-400 p-4 flex flex-col items-center justify-center space-y-3"
        style={{
          width: "3.5in",
          height: "2in",
        }}
      >
        {/* QR CODE */}
        <img
          src={donation.qrUrl}
          alt="QR Code"
          style={{ width: "1in", height: "1in" }}
        />

        {/* NEED HELP */}
{donation.microSummary && (
  <p className="text-xs font-semibold text-gray-700">
    {donation.microSummary}
  </p>
)}
        <h1 className="text-lg font-bold leading-none">Need help?</h1>

        {/* SHORT URL */}
        <p className="text-sm font-semibold leading-none">p/{donation.id}</p>
      </div>
    </div>
  );
}