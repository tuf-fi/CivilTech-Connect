"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/shared/course-card";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data/courses";

const CATEGORIES = ["All", ...Array.from(new Set(PLACEHOLDER_COURSES.map((c) => c.category)))];
const LEVELS = ["All", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export default function CourseCatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");

  const filtered = useMemo(() => {
    return PLACEHOLDER_COURSES.filter((course) => {
      const matchesQuery =
        !query || course.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || course.category === category;
      const matchesLevel = level === "All" || course.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 border-b border-border pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Catalog</span>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Certification tracks</h1>
        <p className="mt-1 text-muted-foreground">
          {PLACEHOLDER_COURSES.length} active tracks across the dealer network
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none ring-ring/50 focus:ring-2"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as (typeof LEVELS)[number])}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none ring-ring/50 focus:ring-2"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "All levels" : l.charAt(0) + l.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
          No courses match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
