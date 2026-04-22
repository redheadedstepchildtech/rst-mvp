import fs from "fs";
import path from "path";

export async function POST(req) {
  const form = await req.formData();
  const tier = form.get("tier");

  const userPath = path.join(process.cwd(), "data", "users", "user123.json");
  const user = JSON.parse(fs.readFileSync(userPath, "utf8"));

  user.subscription = tier;

  fs.writeFileSync(userPath, JSON.stringify(user, null, 2));

  return Response.redirect("/rst2/admin/video-library");
}