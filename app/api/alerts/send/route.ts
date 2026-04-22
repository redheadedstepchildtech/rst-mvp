import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const message = form.get("message");
    const category = form.get("category") || "ALL"; // fallback so Prisma never gets null
    const urgent = form.get("urgent") === "on";

    // Fetch subscribers
    const subscribers =
      category === "ALL"
        ? await prisma.alertSubscriber.findMany()
        : await prisma.alertSubscriber.findMany({
            where: {
              categories: {
                has: category, // correct filter for enum list
              },
            },
          });

    // Save alert to DB
    await prisma.alert.create({
      data: {
        message,
        category,
        urgent,
      },
    });

    console.log("Sending email alert:", message);

    // Filter SMS recipients
    const smsTargets = subscribers.filter(
      (s) => s.smsOptIn && s.phone
    );

    console.log("Sending SMS to:", smsTargets.length);

    // Send SMS
    for (const sub of smsTargets) {
      try {
        await client.messages.create({
          body: urgent
            ? `🚨 URGENT ALERT 🚨\n${message}`
            : message,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: sub.phone,
        });
      } catch (smsErr) {
        console.error("SMS SEND ERROR:", smsErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ALERT SEND ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send alert" },
      { status: 500 }
    );
  }
}