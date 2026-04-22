import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title") || "";
  const text = formData.get("text") || "";
  const photo = formData.get("photo") || "";
  const audio = formData.get("audio") || "";

  const id = Date.now().toString();

  const story = {
    id,
    title,
    text,
    photo,
    audio,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(process.cwd(), "data", "stories", `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2));

  return NextResponse.redirect(`http://localhost:3000/rst2/story/${id}`);
}