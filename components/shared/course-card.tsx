import Link from "next/link";
import { Star, Users, PlayCircle } from "lucide-react";
import { Photo } from "@/components/shared/photo";
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
    <Link href={`/courses/${course.slug}`} className="group flex h-full flex-col">
      <div className="relative overflow-hidden">
        <Photo
          seed={course.id}
          keywords={categoryPhotoKeywords(course.category)}
          lock={course.photoLock}
          className="h-44 w-full shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-foreground backdrop-blur">
          {LEVEL_LABEL[course.level]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {course.category}
        </span>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-lg font-semibold transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">{course.subtitle}</p>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
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
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-lg font-bold">{formatPrice(course.priceCents, course.currency)}</span>
          <span className="text-xs text-muted-foreground">{course.instructorName}</span>
        </div>
      </div>
    </Link>
  );
}
