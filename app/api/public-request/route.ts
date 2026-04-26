import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      category: String(form.get("category") || ""),
      details: String(form.get("details") || ""),
      location: String(form.get("location") || ""),
    };

    // Basic validation stays
    if (!data.name || !data.details || !data.location) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ⭐ RST 1.0: PublicRequest is disabled
    return NextResponse.json({
      ok: true,
      message: "PublicRequest disabled until RST 2.0",
      received: data,
    });

    // ------------------------------------------------------
    // RST 2.0 IMPLEMENTATION WILL GO HERE
    // ------------------------------------------------------
    // const recent = await prisma.publicRequest.findFirst({...});
    // if (recent) { ... }
    // await prisma.publicRequest.create({ data });
    // return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}