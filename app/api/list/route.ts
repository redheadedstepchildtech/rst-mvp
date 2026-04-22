import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to your data folder
    const dataDir = path.join(process.cwd(), "data");

    // Read all JSON files in /data
    const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".json"));

    // Load each story
    const stories = files.map((file) => {
      const filePath = path.join(dataDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(raw);

      return {
        id: json.id,
        name: json.name,
        photo: json.photo || null,
        needs: json.needs || "",
        story: json.story || "",
        payment: json.payment || "",
      };
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error loading stories:", error);
    return NextResponse.json({ error: "Failed to load stories" }, { status: 500 });
  }
}