import { prisma } from "@/lib/prisma";

export default async function QRAnalytics() {
  const scans = await prisma.qrScan.findMany({
    orderBy: { scannedAt: "desc" },
    include: { need: true },
    take: 200,
  });

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">QR Code Analytics</h1>

      <div className="space-y-4">
        {scans.map((scan) => (
          <div key={scan.id} className="p-4 bg-white shadow rounded">
            <p>
              <strong>{scan.need.title}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Scanned at: {new Date(scan.scannedAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Location: {scan.city || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}