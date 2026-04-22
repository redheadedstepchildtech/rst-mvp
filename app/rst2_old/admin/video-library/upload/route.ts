import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function POST(req) {
  const form = await req.formData();

  const title = form.get("title");
  const file = form.get("video");

  const id = Date.now().toString();
const userPath = path.join(process.cwd(), "data", "users", "user123.json");
const user = JSON.parse(fs.readFileSync(userPath, "utf8"));

const videoLimit = getVideoLimit(user.subscription);

const videoDir = path.join(process.cwd(), "data", "videos");
const existing = fs.readdirSync(videoDir);

if (existing.length >= videoLimit) {
  return Response.redirect("/rst2/admin/video-library?error=limit");
}

  // Convert uploaded file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save video file
  const uploadDir = path.join(process.cwd(), "public", "uploads", "videos");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const videoPath = path.join(uploadDir, `${id}.mp4`);
  fs.writeFileSync(videoPath, buffer);

  // Generate thumbnail
  const thumbDir = path.join(process.cwd(), "public", "uploads", "thumbnails");
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  const thumbPath = path.join(thumbDir, `${id}.jpg`);

  // FFmpeg command: capture frame at 1 second
  execSync(
    `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -vf "scale=320:-1" "${thumbPath}"`
  );

  // Save metadata
  const videoData = {
    id,
    title,
    url: `/uploads/videos/${id}.mp4`,
    thumbnail: `/uploads/thumbnails/${id}.jpg`,
    createdAt: new Date().toISOString(),
  };

  const videoDir = path.join(process.cwd(), "data", "videos");
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const metaPath = path.join(videoDir, `${id}.json`);
  fs.writeFileSync(metaPath, JSON.stringify(videoData, null, 2));

  return Response.redirect("/rst2/admin/video-library");
}