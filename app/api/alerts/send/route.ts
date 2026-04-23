import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const urgent = formData.get("urgent")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await client.messages.create({
      body: urgent
        ? `🚨 URGENT ALERT 🚨\n${message}`
        : message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ALERT SEND ERROR:", err);

    return NextResponse.json(
      { error: "Failed to send alert" },
      { status: 500 }
    );
  }
}