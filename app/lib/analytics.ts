export function computeTrendingScore(story: any) {
  const views = story.analytics?.views || 0;
  const qrScans = story.analytics?.qrScans || 0;
  const sharesObj = story.analytics?.shares || {};

  const totalShares = Object.values(sharesObj).reduce(
    (sum: number, val: any) => sum + (typeof val === "number" ? val : 0),
    0
  );

  // Simple weighted formula
  return views * 1 + qrScans * 2 + totalShares * 3;
}