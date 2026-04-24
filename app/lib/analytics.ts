export function computeTrendingScore(story: {
  analytics?: {
    views?: number;
    qrScans?: number;
    shares?: Record<string, number>;
  };
}) {
  const views = story.analytics?.views ?? 0;
  const qrScans = story.analytics?.qrScans ?? 0;

  const sharesObj = story.analytics?.shares ?? {};

  const totalShares = Object.values(sharesObj).reduce(
    (sum: number, val: unknown) =>
      sum + (typeof val === "number" ? val : 0),
    0
  );

  return views * 1 + qrScans * 2 + totalShares * 3;
}