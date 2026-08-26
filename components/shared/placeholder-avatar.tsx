import { initialsFromName, seededGradient } from "@/lib/seeded-gradient";
import { cn } from "@/lib/utils";

export function PlaceholderAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-medium text-white",
        className
      )}
      style={{ background: seededGradient(name) }}
      aria-hidden
    >
      {initialsFromName(name)}
    </div>
  );
}
