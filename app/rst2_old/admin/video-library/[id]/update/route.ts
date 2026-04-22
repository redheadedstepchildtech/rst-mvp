import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function POST(req, { params }) {
  const { id } = params;
  const form = await req.formData();

  const title = form.get("title");
  const description = form.get("description") || "";
  const newFile = form.get("video");

const categories = (form.get("categories") || "")
  .split(",")
  .map(c => c.trim())
  .filter(Boolean);

const tags = (form.get("tags") || "")
  .split(",")
  .map(t => t.trim())
  .filter(Boolean);

video.categories = categories;
video.tags = tags;

  const metaPath = path.join(process.cwd(), "data", "videos", `${id}.json`);
  const video = JSON.parse(fs.readFileSync(metaPath, "utf8"));

  // Update title + description
  video.title = title;
  video.description = description;

  // If user uploaded a new video file
  if (newFile && typeof newFile !== "string") {
    const arrayBuffer = await newFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const videoPath = path.join(process.cwd(), "public", "uploads", "videos", `${id}.mp4`);
    const thumbPath = path.join(process.cwd(), "public", "uploads", "thumbnails", `${id}.jpg`);

    // Replace video file
    fs.writeFileSync(videoPath, buffer);

    // Regenerate thumbnail
    execSync(
      `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -vf "scale=320:-1" "${thumbPath}"`
    );
  }

  // Save updated metadata
  fs.writeFileSync(metaPath, JSON.stringify(video, null, 2));

  return Response.redirect(`/rst2/admin/video-library/${id}`);
}