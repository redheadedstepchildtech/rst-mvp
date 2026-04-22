import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { computeTrendingScore } from "@/lib/analytics";

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  const stories = files
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const json = JSON.parse(raw);
      const id = file.replace(".json", "");
      const trendingScore = computeTrendingScore(json);

      return {
        id,
        trendingScore,
        ...json,
      };
    })
    .filter((s) => s.trendingScore > 0) // only stories with some activity
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 10); // top 10

  return NextResponse.json(stories);
}