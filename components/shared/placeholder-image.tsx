import { seededGradient } from "@/lib/seeded-gradient";
import { cn } from "@/lib/utils";

export function PlaceholderImage({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Placeholder illustration"
      className={cn("relative overflow-hidden", className)}
      style={{ background: seededGradient(seed) }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20 mix-blend-overlay"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`grid-${seed}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${seed})`} />
      </svg>
    </div>
  );
}
