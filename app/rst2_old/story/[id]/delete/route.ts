import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(_, { params }) {
  const id = params.id;
  const filePath = path.join(process.cwd(), "data", "stories", `${id}.json`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return NextResponse.redirect("/rst2/stories");
}