/**
 * Real-photo placeholders. Two sources, chosen per content type:
 *
 *  - `photoUrl` — LoremFlickr, keyword-searched (cars, engines, tools,
 *    hard hats). Good for scene/subject photos where exact keyword
 *    combinations have been manually verified to return on-topic results
 *    (see lib/category-photo.ts) — broad keyword search on a crowdsourced
 *    photo pool is otherwise unreliable (returns anything tagged with the
 *    word, including irrelevant or off-brand results).
 *  - `personPhotoUrl` — randomuser.me, a placeholder service built
 *    specifically for consistent, professional-looking headshot photos.
 *    Far more reliable for "a person's face" than keyword photo search.
 *
 * Both are deterministic per `seed`, so a given course/instructor always
 * gets the same photo. Swap either for your own asset pipeline (CMS, S3,
 * etc.) when real content is available — call sites just need a URL.
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

export function personPhotoUrl(seed: string) {
  const hash = hashSeed(seed);
  const gender = hash % 2 === 0 ? "men" : "women";
  const index = hash % 100;
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}
