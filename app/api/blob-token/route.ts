import { NextResponse } from "next/server";
import { generateClientTokenFromReadWriteToken } from "@vercel/blob";

export async function GET() {
  const token = generateClientTokenFromReadWriteToken(
    process.env.BLOB_READ_WRITE_TOKEN!, // server-side only
    {
      allowedOrigins: ["http://localhost:3000"],
      permission: "write",
    }
  );

  return NextResponse.json({ token });
}