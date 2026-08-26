import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Users, Clock, Layers, CheckCircle2 } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import { categoryIcon } from "@/lib/category-icon";
import { categoryPhotoKeywords } from "@/lib/category-photo";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data/courses";

export function generateStaticParams() {
  return PLACEHOLDER_COURSES.map((c) => ({ slug: c.slug }));
}

function formatPrice(cents: number, currency: string) {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = PLACEHOLDER_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const outline = Array.from({ length: course.moduleCount }, (_, i) => ({
    title: `Module ${i + 1}`,
    lessons: Math.max(2, Math.round(course.lessonCount / course.moduleCount)),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {course.category} · {course.level}
          </span>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{course.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{course.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-warning text-warning" />
              {course.rating.toFixed(1)} ({course.ratingCount} ratings)
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {course.studentCount.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {course.durationHours}h
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Photo
              seed={course.instructorName}
              person
              width={80}
              height={80}
              interactive={false}
              className="size-10 shrink-0 rounded-full"
            />
            <div>
              <div className="text-sm text-muted-foreground">Instructor</div>
              <div className="font-medium">{course.instructorName}</div>
            </div>
          </div>

          <Photo
            seed={course.id}
            keywords={categoryPhotoKeywords(course.category)}
            lock={course.photoLock}
            icon={categoryIcon(course.category)}
            width={900}
            height={500}
            interactive={false}
            priority
            className="mt-8 h-64 w-full"
          />

          <section className="mt-10">
            <h2 className="text-xl font-semibold">About this course</h2>
            <p className="mt-3 text-muted-foreground">{course.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Layers className="size-5" /> Curriculum
            </h2>
            <div className="divide-y divide-border border border-border">
              {outline.map((m) => (
                <div key={m.title} className="flex items-center justify-between p-4">
                  <span className="font-medium">{m.title}</span>
                  <span className="text-sm text-muted-foreground">{m.lessons} lessons</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <div className="font-display text-3xl font-extrabold">
            {formatPrice(course.priceCents, course.currency)}
          </div>
          <Link
            href={`/portal/checkout/${course.slug}`}
            className="mt-4 block w-full bg-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            {course.priceCents === 0 ? "Enroll for free" : "Enroll now"}
          </Link>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" /> {course.moduleCount} modules,{" "}
              {course.lessonCount} lessons
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" /> Certificate on completion
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" /> Discussion &amp; Q&amp;A access
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
