import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  variant = "default",
  size = "default",
}: {
  className?: string;
  variant?: "default" | "inverted";
  size?: "default" | "sm";
}) {
  const inverted = variant === "inverted";
  const sm = size === "sm";

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex items-center justify-center bg-primary font-black italic text-primary-foreground",
          sm ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm"
        )}
      >
        T
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold uppercase tracking-tight",
            sm ? "text-base" : "text-lg",
            inverted && "text-background"
          )}
        >
          Torque
        </span>
        <span
          className={cn(
            "font-bold uppercase tracking-[0.2em] text-muted-foreground",
            sm ? "text-[8px]" : "text-[10px]",
            inverted && "text-background/60"
          )}
        >
          Academy
        </span>
      </span>
    </span>
  );
}
