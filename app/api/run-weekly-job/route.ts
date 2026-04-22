import { runWeeklyPerformanceJob } from "@/rst/jobs/weeklyPerformance";

export async function GET() {
  await runWeeklyPerformanceJob();
  return Response.json({ ok: true });
}