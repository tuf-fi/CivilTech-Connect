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
  ["var(--primary)", "var(--info)"],
  ["var(--primary)", "var(--success)"],
  ["var(--info)", "var(--primary)"],
  ["var(--warning)", "var(--primary)"],
  ["var(--success)", "var(--info)"],
];

export function seededGradient(seed: string) {
  const hash = hashString(seed);
  const [from, to] = GRADIENT_PAIRS[hash % GRADIENT_PAIRS.length];
  const angle = hash % 360;
  return `linear-gradient(${angle}deg, ${from}, ${to})`;
}

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}
