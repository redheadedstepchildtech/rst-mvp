import fs from "fs/promises";
import path from "path";
import { generateQR } from "@/lib/server/qr";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      story,
      amount,
      photoUrl,
      cashapp,
      venmo,
      paypal,
      needs,
      email,
      phone,
    } = body;

    // Generate QR codes
    const donationQR = await generateQR(`donate:${name}`);
    const helpQR = await generateQR(`help:${name}`);

    // Load the minisite template
    const templatePath = path.join(process.cwd(), "app", "templates", "minisite.html");
    const template = await fs.readFile(templatePath, "utf8");

    // Fill the template
    const filled = template
      .replace("{{name}}", name)
      .replace("{{story}}", story)
      .replace("{{amount}}", amount)
      .replace("{{photoUrl}}", photoUrl)
      .replace("{{cashapp}}", cashapp || "")
      .replace("{{venmo}}", venmo || "")
      .replace("{{paypal}}", paypal || "")
      .replace("{{needs}}", needs || "")
      .replace("{{email}}", email || "")
      .replace("{{phone}}", phone || "")
      .replace("{{donationQR}}", donationQR)
      .replace("{{helpQR}}", helpQR);

    // Save the minisite file into /public/storage
    const filename = `minisite-${Date.now()}.html`;
    const outputPath = path.join(process.cwd(), "public", "storage", filename);

    await fs.writeFile(outputPath, filled, "utf8");

    // Build the full URL using your .env.local
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fullUrl = `${baseUrl}/storage/${filename}`;

    return Response.json({ url: fullUrl });
  } catch (err) {
    console.error("Mini-site generation error:", err);
    return new Response("Mini-site generation failed", { status: 500 });
  }
}