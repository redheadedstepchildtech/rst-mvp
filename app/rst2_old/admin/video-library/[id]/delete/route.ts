import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  const { id } = params;

  const metaPath = path.join(process.cwd(), "data", "videos", `${id}.json`);
  const videoPath = path.join(process.cwd(), "public", "uploads", "videos", `${id}.mp4`);
  const thumbPath = path.join(process.cwd(), "public", "uploads", "thumbnails", `${id}.jpg`);

  if (fs.existsSync(metaPath)) fs.unlinkSync(metaPath);
  if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
  if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);

  return Response.redirect("/rst2/admin/video-library");
}