import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "inverted";
}) {
  const inverted = variant === "inverted";

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center bg-primary text-sm font-black italic text-primary-foreground">
        T
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold uppercase tracking-tight",
            inverted && "text-background"
          )}
        >
          Torque
        </span>
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
            inverted && "text-background/60"
          )}
        >
          Academy
        </span>
      </span>
    </span>
  );
}
