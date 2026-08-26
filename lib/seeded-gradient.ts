/**
 * Deterministic hash → gradient angle/stops, so the same seed (course id,
 * title, user email, ...) always renders the same placeholder look instead
 * of a random one on every render. Colors are drawn from the design tokens
 * (via CSS vars) so placeholders re-theme automatically.
 */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const GRADIENT_PAIRS = [
  ["var(--primary)", "hsl(0 0% 9%)"],
  ["hsl(0 0% 9%)", "var(--primary)"],
  ["hsl(0 0% 20%)", "var(--primary)"],
  ["var(--primary)", "hsl(0 0% 20%)"],
];

const ANGLES = [110, 135, 160];

export function seededGradient(seed: string) {
  const hash = hashString(seed);
  const [from, to] = GRADIENT_PAIRS[hash % GRADIENT_PAIRS.length];
  const angle = ANGLES[hash % ANGLES.length];
  return `linear-gradient(${angle}deg, ${from}, ${to})`;
}

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}
