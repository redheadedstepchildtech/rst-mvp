import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  const rows: any[] = [];

  files
    .filter((f) => f.endsWith(".json"))
    .forEach((file) => {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const json = JSON.parse(raw);
      const id = file.replace(".json", "");

      const views = json.analytics?.views || 0;
      const scans = json.analytics?.qrScans || 0;
      const sharesObj = json.analytics?.shares || {};

      const totalShares = Object.values(sharesObj).reduce(
        (sum: number, v: any) => sum + (typeof v === "number" ? v : 0),
        0
      );

      rows.push({
        id,
        name: json.name,
        category: json.category,
        tags: (json.tags || []).join(", "),
        views,
        qrScans: scans,
        totalShares,
        lastUpdatedISO: json.lastUpdatedISO,
      });
    });

  // Convert to CSV
  const header = Object.keys(rows[0] || {}).join(",");
  const body = rows
    .map((row) =>
      Object.values(row)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const csv = header + "\n" + body;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=analytics.csv",
    },
  });
}