import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// --- ADD THIS FUNCTION AT THE TOP ---
async function createNeedWithRetry(data, retries = 3) {
  try {
    return await prisma.need.create({ data });
  } catch (err) {
    console.log("Prisma createNeed failed, retries left:", retries, err);

    if (retries > 0) {
      await new Promise((res) => setTimeout(res, 2000)); // wait 2 seconds
      return createNeedWithRetry(data, retries - 1);
    }

    throw err;
  }
}
// ------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const {
      title,
      category,
      description,
      tags,
      city,
      state,
      zip,
    } = body;

    const userId = "anonymous-user";

    // --- USE THE RETRY WRAPPER HERE ---
    const need = await createNeedWithRetry({
      title,
      category,
      description: description || null,
      tags: tags || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      userId,
    });

    return NextResponse.json({ ok: true, id: need.id });
  } catch (err) {
    console.error("Request Help Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}