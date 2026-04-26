import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";



export async function GET(req, { params }) {
  const needId = params.id;

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  await prisma.qRScan.create({
    data: {
      needId,
      userAgent,
      ipHash,
   },
 });

  return NextResponse.redirect(`/needs/${needId}`);
}