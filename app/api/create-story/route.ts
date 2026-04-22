import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();

  const id = Date.now().toString();
  const filePath = path.join(process.cwd(), "data", `${id}.json`);

  const story = {
    name: body.name,
    category: body.category,
    tags: body.tags
      ? body.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    needs: body.needs,
    story: body.story,

    // ⭐ NEW LOCATION FIELDS
    city: body.city || "",
    state: body.state || "MT",
    zip: body.zip || "",

    analytics: {
      views: 0,
      qrScans: 0,
      shares: {}
    },

    lastUpdatedISO: new Date().toISOString(),
    lastUpdatedHuman: new Date().toLocaleString()
  };

  fs.writeFileSync(filePath, JSON.stringify(story, null, 2));

  return NextResponse.json({ success: true, id });
}