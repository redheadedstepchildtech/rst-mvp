import fs from "fs";
import path from "path";

export async function POST(req, { params }) {
  const { id } = await params;
  const form = await req.formData();

  const updatedStory = {
    id,
    title: form.get("title"),
    text: form.get("text"),
    createdAt: new Date().toISOString(), // or keep original if you prefer
  };

  const filePath = path.join(process.cwd(), "data", "stories", `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedStory, null, 2));

  return Response.redirect(`/rst2/story/${id}`);
}