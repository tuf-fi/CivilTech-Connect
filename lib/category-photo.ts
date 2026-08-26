// Keyword pairs below were manually verified (see session notes) to
// reliably return on-topic photos from LoremFlickr's keyword search —
// broader terms like "garage", "workshop", or "dealership" kept returning
// irrelevant results or real third-party business signage.
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Powertrain: ["car", "engine"],
  "Safety Systems": ["car", "dashboard"],
  Diagnostics: ["mechanic", "tools"],
  "Customer Experience": ["car", "dashboard"],
  "Safety & Compliance": ["hardhat", "worker"],
};

export function categoryPhotoKeywords(category: string): string[] {
  return CATEGORY_KEYWORDS[category] ?? ["car", "engine"];
}
