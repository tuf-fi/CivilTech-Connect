/**
 * Real-photo placeholders via LoremFlickr, keyword-searched. Broad terms
 * ("garage", "workshop", "dealership", "portrait") are unreliable on a
 * crowdsourced photo pool — they return anything tagged with the word,
 * including irrelevant results or real third-party business/brand
 * signage. The keyword pairs used in lib/category-photo.ts and the
 * curated person photos below were manually verified image-by-image.
 * Deterministic per `seed` (locked), so a given course/instructor always
 * gets the same photo. Swap for your own asset pipeline (CMS, S3, etc.)
 * when real content is available — call sites just need a URL string.
 */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function photoUrl(
  seed: string,
  width: number,
  height: number,
  keywords: string[] = ["automotive", "garage"],
  lock?: number
) {
  const tags = keywords.join(",");
  const resolvedLock = lock ?? hashSeed(seed) % 100000;
  return `https://loremflickr.com/${width}/${height}/${tags}?lock=${resolvedLock}`;
}

/**
 * Business-attire headshots, manually verified — keyword photo search
 * returns mostly business-casual (or occasionally irrelevant) results, so
 * only these specific keyword+lock combinations are known to show a
 * person in a suit or professional dress against a clean background.
 */
const CURATED_HEADSHOTS: Record<string, { keywords: string[]; lock: number }> = {
  "R. Fujimoto": { keywords: ["director", "portrait"], lock: 1 },
  "K. Alvarez": { keywords: ["professional", "headshot"], lock: 2 },
  "M. Delacruz": { keywords: ["executive", "portrait"], lock: 1 },
  "T. Nakamura": { keywords: ["director", "portrait"], lock: 2 },
  "J. Okafor": { keywords: ["professional", "headshot"], lock: 8 },
  "L. Bergström": { keywords: ["corporate", "portrait"], lock: 2 },
  "D. Whitfield": { keywords: ["director", "portrait"], lock: 1 },
  "R. Castellanos": { keywords: ["director", "portrait"], lock: 2 },
};

export function personPhotoUrl(seed: string, width = 400, height = 500) {
  const curated = CURATED_HEADSHOTS[seed];
  if (curated) {
    return photoUrl(seed, width, height, curated.keywords, curated.lock);
  }
  // Fallback for any person not in the curated list above.
  return photoUrl(seed, width, height, ["professional", "headshot"]);
}
