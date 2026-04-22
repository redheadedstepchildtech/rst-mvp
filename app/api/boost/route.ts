import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json();

    if (!id || !type) {
      return NextResponse.json(
        { error: "Missing id or type" },
        { status: 400 }
      );
    }

    const updated = await prisma.need.update({
      where: { id },
      data: {
        boostCount: { increment: 1 },
        lastBoostedAt: new Date(),
        boostType: type,
      },
    });

await sendEmail(
  "admin@rst.local",
  "Need Boosted",
  `<h1>${updated.title}</h1><p>Boost Type: ${updated.boostType}</p>`
);

if (type === "urgency") {
  await sendSMS(
    "+1406YOURNUMBER",
    `URGENT BOOST: ${updated.title}`
  );
}

    return NextResponse.json({ success: true, need: updated });
  } catch (err) {
    console.error("Boost error:", err);
    return NextResponse.json(
      { error: "Failed to boost" },
      { status: 500 }
    );
  }
}