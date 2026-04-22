import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();

  // Basic checks
  if (!story || story.trim().length === 0) {
    return NextResponse.json({ message: "" });
  }

  // Length check
  if (story.length > 600) {
    return NextResponse.json({
      message: "Your story is a bit long — consider shortening it for clarity.",
    });
  }

  // Personal info check
  if (story.match(/\b\d{3}-\d{2}-\d{4}\b/) || story.includes("@")) {
    return NextResponse.json({
      message: "This story may include personal details — consider removing them.",
    });
  }

  // Tone check (simple heuristic)
  const dramaticWords = ["desperate", "starving", "hopeless", "begging"];
  if (dramaticWords.some((w) => story.toLowerCase().includes(w))) {
    return NextResponse.json({
      message: "Tone feels heavy — want help softening it?",
    });
  }

  // Clarity check
  if (story.split(".").length > 8) {
    return NextResponse.json({
      message: "Your story has many sentences — consider simplifying it.",
    });
  }

  // Default
  return NextResponse.json({
    message: "Looks good — warm and clear.",
  });
}