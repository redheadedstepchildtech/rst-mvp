export function computeTrendingScore(item: any) {
  let score = 0;

  // Basic trending logic — safe defaults
  if (item.views) score += item.views * 0.1;
  if (item.likes) score += item.likes * 0.5;
  if (item.shares) score += item.shares * 1.0;

  // Recent activity boost
  if (item.updatedAt) {
    const updated = new Date(item.updatedAt).getTime();
    const now = Date.now();
    const diffDays = (now - updated) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) score += 5;
    else if (diffDays < 7) score += 3;
    else if (diffDays < 30) score += 1;
  }

  return score;
}