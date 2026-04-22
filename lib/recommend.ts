import { computeTrendingScore } from "./analytics";

export function computeRecommendationScore(base: any, candidate: any) {
  let score = 0;

  // TAG OVERLAP
  const baseTags = base.tags || [];
  const candidateTags = candidate.tags || [];

  const overlap = baseTags.filter((t: string) =>
    candidateTags.includes(t)
  ).length;

  score += overlap * 3;

  // SAME CATEGORY
  if (base.category && candidate.category && base.category === candidate.category) {
    score += 2;
  }

  // TRENDING SCORE (light weight)
  const trending = computeTrendingScore(candidate);
  score += trending * 0.1;

  return score;
}