import { GUIDE_CATEGORIES } from "./guideHelpers"
import { EXPERIENCE_CATEGORIES } from "./experienceHelpers"

// Single source of truth for turning a post's raw `category` key into a
// human-readable label — used by ShareExperience's step 2 chips and by
// the Community sidebar's "Trending Topics" (which counts real posts per
// category, so this is what actually renders as the topic title).
export const POST_CATEGORIES = [
  { key: "awareness", label: "Awareness" },
  { key: "scam", label: "Scam / Fraud" },
  { key: "thoughts", label: "Thoughts" },
  { key: "tips", label: "Tips" },
  ...GUIDE_CATEGORIES.map((g) => ({ key: g.key, label: g.label })),
  ...EXPERIENCE_CATEGORIES.map((e) => ({ key: e.key, label: e.label })),
  { key: "other", label: "Other" },
]

export function getCategoryLabel(key) {
  return POST_CATEGORIES.find((c) => c.key === key)?.label || key || "Other"
}