import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing story ID" }, { status: 400 });
  }

  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);

    const storyId = file.replace(".json", "");

    // Update featured flag
    json.featured = storyId === id;

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  }

  return NextResponse.json({ success: true });
}