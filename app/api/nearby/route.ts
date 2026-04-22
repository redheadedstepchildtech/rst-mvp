import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ZIP_COORDS } from "@/lib/zipcodes";
import { distanceMiles } from "@/lib/distance";

export async function POST(req: Request) {
  const body = await req.json();
  const { zip, radius } = body;

  if (!ZIP_COORDS[zip]) {
    return NextResponse.json({ error: "Unknown ZIP code" }, { status: 400 });
  }

  const origin = ZIP_COORDS[zip];

  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  const results: any[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
    const json = JSON.parse(raw);
    const id = file.replace(".json", "");

    if (!json.zip || !ZIP_COORDS[json.zip]) continue;

    const dest = ZIP_COORDS[json.zip];

    const dist = distanceMiles(origin.lat, origin.lng, dest.lat, dest.lng);

    if (dist <= radius) {
      results.push({
        id,
        ...json,
        distance: dist,
      });
    }
  }

  return NextResponse.json({
    originZip: zip,
    radius,
    results: results.sort((a, b) => a.distance - b.distance),
  });
}