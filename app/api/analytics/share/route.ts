import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VALID_PLATFORMS = [
  "facebook",
  "nextdoor",
  "reddit",
  "email",
  "sms",
  "messenger",
];

export async function POST(req: Request) {
  try {
    const { id, platform } = await req.json();

    if (!id || !platform) {
      return NextResponse.json(
        { error: "Missing id or platform" },
        { status: 400 }
      );
    }

    if (!VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
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

    if (!data.analytics.shares) {
      data.analytics.shares = {
        facebook: 0,
        nextdoor: 0,
        reddit: 0,
        email: 0,
        sms: 0,
        messenger: 0,
      };
    }

    if (typeof data.analytics.shares[platform] !== "number") {
      data.analytics.shares[platform] = 0;
    }

    data.analytics.shares[platform] += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      shares: data.analytics.shares,
    });
  } catch (err) {
    console.error("SHARE ANALYTICS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to record share" },
      { status: 500 }
    );
  }
}