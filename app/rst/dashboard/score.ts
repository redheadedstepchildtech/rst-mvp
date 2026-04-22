export function calculateScore({
  views,
  clicks,
  sms,
  engagement,
  trend,
}: {
  views: number;
  clicks: number;
  sms: number;
  engagement: number; // 0–1
  trend: "up" | "flat" | "down";
}) {
  // Normalize each metric to a 0–100 scale
  const viewScore = Math.min(views * 5, 100); // 20+ views = max
  const clickScore = Math.min(clicks * 10, 100); // 10+ clicks = max
  const smsScore = Math.min(sms * 4, 100); // 25+ SMS = max
  const engagementScore = Math.min(engagement * 200, 100); // 0.5+ = max

  let trendScore = 50;
  if (trend === "up") trendScore = 100;
  if (trend === "down") trendScore = 20;

  // Weighted average
  const final =
    viewScore * 0.25 +
    clickScore * 0.25 +
    engagementScore * 0.25 +
    trendScore * 0.15 +
    smsScore * 0.10;

  return Math.round(final);
}