import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { computeRecommendationScore } from "@/lib/recommend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  // Load base story
  const basePath = path.join(dataDir, `${id}.json`);
  if (!fs.existsSync(basePath)) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  const base = JSON.parse(fs.readFileSync(basePath, "utf8"));

  // Load all other stories
const candidates = files
  .filter((f) => f.endsWith(".json") && f !== `${id}.json`)
  .map((file) => {
    try {
      const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
      const json = JSON.parse(raw);
      const storyId = file.replace(".json", "");
      return { id: storyId, ...json };
    } catch (err) {
      console.error("Invalid JSON:", file);
      return null;
    }
  })
  .filter(Boolean)
  .filter((story) => {
    return (
      story.id &&
      story.name?.trim() &&
      story.needs?.trim() &&
      story.story?.trim() &&
      story.city?.trim()
    );
  });
      const storyId = file.replace(".json", "");
      return { id: storyId, ...json };
    });

  // Score each candidate
  const scored = candidates
    .map((story) => ({
      ...story,
      recommendationScore: computeRecommendationScore(base, story),
    }))
    .filter((s) => s.recommendationScore > 0)
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 5); // top 5

  return NextResponse.json(scored);

const candidates = files
  .filter((f) => f.endsWith(".json") && f !== `${id}.json`)
  .map((file) => {
    const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
    const json = JSON.parse(raw);
    const storyId = file.replace(".json", "");

    return { id: storyId, ...json };
  })
  .filter((story) => {
    // Ensure required fields exist
    return (
      story.id &&
      story.name &&
      story.category &&
      story.needs &&
      Array.isArray(story.tags)
    );
  });
}
.filter((story) => {
  return (
    story.id &&
    story.name?.trim() &&
    story.needs?.trim() &&
    story.story?.trim() &&
    story.city?.trim()
  );
})