import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { id, story } = await req.json();

    if (!id || !story) {
      return NextResponse.json(
        { error: "Missing id or story" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    // Update the story
    data.story = story;

    // Save back to disk
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save story" },
      { status: 500 }
    );
  }
}