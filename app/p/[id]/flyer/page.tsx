import { promises as fs } from "fs";
import path from "path";

async function getDonation(id: string) {
  const dataFile = path.join(process.cwd(), "data", "donations.json");
  const fileData = await fs.readFile(dataFile, "utf8");
  const list = JSON.parse(fileData || "[]");
  return list.find((d: any) => d.id === id) || null;
}

export default async function FlyerPage({ params }: { params: { id: string } }) {
  const donation = await getDonation(params.id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Flyer not found.</p>
      </div>
    );
  }
<p className={`micro-summary theme-${donation.theme}`}>
  {donation.microSummary}
</p>

<p className={`micro-summary micro-summary-${donation.microSize}`}>
  {donation.microSummary}
</p>
  // Create a short story excerpt
  const excerpt =
    donation.story.length > 300
      ? donation.story.substring(0, donation.story.lastIndexOf(" ", 280)) + "..."
      : donation.story;

  return (
    <div className="min-h-screen bg-white flex justify-center p-8 print:p-0">
      <div className="w-full max-w-2xl border-2 border-gray-400 p-6 space-y-6">

        {/* QR CODE */}
        <div className="text-center">
          <img
            src={donation.qrUrl}
            alt="QR Code"
            className="mx-auto"
            style={{ width: "45%", height: "auto" }}
          />
        </div>

{donation.microSummary && (
  <p className="text-xl font-semibold text-center text-gray-800">
    {donation.microSummary}
  </p>
)}

        {/* NEED HELP */}
        <h1 className="text-4xl font-bold text-center">Need help?</h1>

        {/* SHORT URL */}
        <p className="text-xl text-center font-semibold">p/{donation.id}</p>

        {/* STORY EXCERPT */}
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-2">Story</h2>
          <p className="text-gray-700 whitespace-pre-line text-lg">{excerpt}</p>
        </div>

        {/* CATEGORY */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Category</h2>
          <p className="text-gray-700 text-lg">{donation.category}</p>
        </div>

      </div>
    </div>
  );
}