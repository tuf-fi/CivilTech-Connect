import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { photoUrl, personPhotoUrl } from "@/lib/photo-url";
import { cn } from "@/lib/utils";

/**
 * Real-photo placeholder (see lib/photo-url.ts) with a consistent brand
 * treatment — desaturated by default, full color on hover — so arbitrary
 * stock photography reads as one deliberate system instead of a random
 * grab-bag of colors. Pass `person` for headshot photos (instructors,
 * testimonials) — uses a dedicated headshot placeholder source instead of
 * keyword photo search, which is unreliable for "a person's face".
 */
export function Photo({
  seed,
  width = 600,
  height = 450,
  keywords,
  lock,
  person = false,
  icon: Icon,
  interactive = true,
  className,
  imgClassName,
  priority,
}: {
  seed: string;
  width?: number;
  height?: number;
  keywords?: string[];
  lock?: number;
  person?: boolean;
  icon?: LucideIcon;
  interactive?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("group/photo relative overflow-hidden bg-secondary", className)}>
      <Image
        src={person ? personPhotoUrl(seed) : photoUrl(seed, width, height, keywords, lock)}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 400px"
        className={cn(
          "object-cover grayscale-[45%] contrast-[1.05] transition-all duration-500 ease-out",
          interactive && "group-hover/photo:scale-105 group-hover/photo:grayscale-0",
          imgClassName
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
      {Icon && (
        <span className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-md ring-1 ring-foreground/5 backdrop-blur transition-transform duration-300 group-hover/photo:-rotate-6">
          <Icon className="size-4" strokeWidth={2.25} />
        </span>
      )}
    </div>
  );
}
