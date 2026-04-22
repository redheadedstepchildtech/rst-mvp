import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "data");

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  const stories = files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
        const json = JSON.parse(raw);
        const id = file.replace(".json", "");
        return { id, ...json };
      } catch (err) {
        console.error("Invalid JSON:", file);
        return null;
      }
    })
    .filter(Boolean)
    .filter((story) => story.draft !== true) // DRAFT MODE
    .filter((story) => {
      // Basic validation
      return (
        story.name?.trim() &&
        story.needs?.trim() &&
        story.story?.trim() &&
        story.city?.trim()
      );
    })
    .map((story) => ({
      ...story,
      lastUpdatedHuman: new Date(story.lastUpdated || Date.now()).toLocaleString(),
    }));

  return NextResponse.json(stories);
}