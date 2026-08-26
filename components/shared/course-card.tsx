import Link from "next/link";
import { Star, Users, PlayCircle } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import { categoryIcon } from "@/lib/category-icon";
import { categoryPhotoKeywords } from "@/lib/category-photo";
import type { PlaceholderCourse } from "@/lib/placeholder-data/courses";

function formatPrice(cents: number, currency: string) {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

const LEVEL_LABEL: Record<PlaceholderCourse["level"], string> = {
  BEGINNER: "Level 1",
  INTERMEDIATE: "Level 2",
  ADVANCED: "Level 3",
};

export function CourseCard({ course }: { course: PlaceholderCourse }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative">
        <Photo
          seed={course.id}
          keywords={categoryPhotoKeywords(course.category)}
          lock={course.photoLock}
          icon={categoryIcon(course.category)}
          className="h-36 w-full shrink-0"
        />
        <span className="absolute left-2.5 top-2.5 bg-foreground/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-background backdrop-blur">
          {LEVEL_LABEL[course.level]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-bold uppercase tracking-wide text-primary">
          {course.category}
        </span>
        <h3 className="line-clamp-2 min-h-[2.75rem] font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">{course.subtitle}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-warning text-warning" />
            {course.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {course.studentCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle className="size-3.5" />
            {course.lessonCount}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-display text-lg font-extrabold text-card-foreground">
            {formatPrice(course.priceCents, course.currency)}
          </span>
          <span className="text-xs text-muted-foreground">{course.instructorName}</span>
        </div>
      </div>
    </Link>
  );
}
