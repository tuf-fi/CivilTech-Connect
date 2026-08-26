import type { LucideIcon } from "lucide-react";
import { seededGradient } from "@/lib/seeded-gradient";
import { cn } from "@/lib/utils";

export function PlaceholderImage({
  seed,
  icon: Icon,
  className,
}: {
  seed: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Placeholder illustration"
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
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
      {Icon && (
        <>
          <Icon className="absolute bottom-2 right-2 size-20 text-white/10" strokeWidth={1} />
          <Icon className="relative size-9 text-white drop-shadow transition-transform duration-300 ease-out group-hover:-rotate-6" strokeWidth={1.75} />
        </>
      )}
    </div>
  );
}
