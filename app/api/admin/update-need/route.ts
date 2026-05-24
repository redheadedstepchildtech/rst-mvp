import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const id = form.get("id") as string;

  const data = {
    title: form.get("title") as string,
    category: form.get("category") as string,
    description: form.get("description") as string,
    contact: form.get("contact") as string,
  };

  try {
    await prisma.need.update({
      where: { id },
      data,
    });

    return NextResponse.redirect("/admin/needs");
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
