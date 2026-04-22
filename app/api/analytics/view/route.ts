import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    if (!data.analytics) {
      data.analytics = {
        views: 0,
        qrScans: 0,
        shares: {
          facebook: 0,
          nextdoor: 0,
          reddit: 0,
          email: 0,
          sms: 0,
          messenger: 0,
        },
      };
    }

    if (typeof data.analytics.views !== "number") {
      data.analytics.views = 0;
    }

    data.analytics.views += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, views: data.analytics.views });
  } catch (err) {
    console.error("VIEW ANALYTICS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}