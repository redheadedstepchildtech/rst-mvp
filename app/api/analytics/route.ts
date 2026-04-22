import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { computeTrendingScore } from "@/lib/analytics";

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  let totalViews = 0;
  let totalScans = 0;
  let totalShares = 0;

  const categoryCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};

  const stories = files
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const json = JSON.parse(raw);
      const id = file.replace(".json", "");

      const views = json.analytics?.views || 0;
      const scans = json.analytics?.qrScans || 0;
      const sharesObj = json.analytics?.shares || {};
      const shares = Object.values(sharesObj).reduce(
        (sum: number, v: any) => sum + (typeof v === "number" ? v : 0),
        0
      );

      totalViews += views;
      totalScans += scans;
      totalShares += shares;

      // Category counts
      if (json.category) {
        categoryCounts[json.category] =
          (categoryCounts[json.category] || 0) + 1;
      }

      // Tag counts
      if (json.tags && Array.isArray(json.tags)) {
        json.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }

      return {
        id,
        ...json,
        trendingScore: computeTrendingScore(json),
      };
    });

  // Trending top 5
  const trending = [...stories]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 5);

  // Recently updated top 5
  const recent = [...stories]
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedISO).getTime() -
        new Date(a.lastUpdatedISO).getTime()
    )
    .slice(0, 5);

  return NextResponse.json({
    totals: {
      views: totalViews,
      qrScans: totalScans,
      shares: totalShares,
    },
    categories: categoryCounts,
    tags: tagCounts,
    trending,
    recent,
  });
}