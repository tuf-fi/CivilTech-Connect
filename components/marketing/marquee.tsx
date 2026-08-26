"use client";

export function Marquee({ items }: { items: string[] }) {
  // Duplicated once for a seamless loop (the track scrolls exactly -50%).
  const track = [...items, ...items];

  return (
    <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex w-max items-center gap-12 py-1 group-hover/marquee:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 text-sm font-semibold text-muted-foreground/70"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
