import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  const stories = files
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const json = JSON.parse(raw);
      const id = file.replace(".json", "");
      return { id, ...json };
    })
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedISO).getTime() -
        new Date(a.lastUpdatedISO).getTime()
    )
    .slice(0, 5);

  return NextResponse.json(stories);
}