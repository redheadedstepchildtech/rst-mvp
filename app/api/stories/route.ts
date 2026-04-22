import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, goalAmount, userId } = body;

    const story = await db.story.create({
      data: {
        title,
        description,
        goalAmount,
        userId,
      },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stories = await db.story.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}