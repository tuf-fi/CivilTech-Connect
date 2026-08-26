"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import type { PlaceholderTestimonial } from "@/lib/placeholder-data/testimonials";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;

export function TestimonialCarousel({ testimonials }: { testimonials: PlaceholderTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, ROTATE_MS);
    return () => clearInterval(id);
  }, [advance, paused]);

  const current = testimonials[index];

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote className="mx-auto size-7 text-primary" />

      <div className="relative mt-6 min-h-[9rem] sm:min-h-[7rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <blockquote className="text-xl font-medium leading-snug sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Photo
                seed={current.name}
                person
                width={88}
                height={88}
                interactive={false}
                className="size-11 shrink-0 rounded-full"
              />
              <div className="text-left">
                <div className="text-sm font-bold">{current.name}</div>
                <div className="text-xs text-background/60">{current.title}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-primary" : "w-1.5 bg-background/25 hover:bg-background/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
