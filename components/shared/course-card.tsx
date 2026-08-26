import Link from "next/link";
import { Star, Users, PlayCircle } from "lucide-react";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import type { PlaceholderCourse } from "@/lib/placeholder-data/courses";

function formatPrice(cents: number, currency: string) {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export function CourseCard({ course }: { course: PlaceholderCourse }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <PlaceholderImage seed={course.id} className="h-36 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">
          {course.category}
        </span>
        <h3 className="line-clamp-2 font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.subtitle}</p>
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
          <span className="font-semibold text-card-foreground">
            {formatPrice(course.priceCents, course.currency)}
          </span>
          <span className="text-xs text-muted-foreground">{course.instructorName}</span>
        </div>
      </div>
    </Link>
  );
}
