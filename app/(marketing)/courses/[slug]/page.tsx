import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Users, Clock, ArrowRight } from "lucide-react";
import { Photo } from "@/components/shared/photo";
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
  const index = PLACEHOLDER_COURSES.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const course = PLACEHOLDER_COURSES[index];
  const next = PLACEHOLDER_COURSES[(index + 1) % PLACEHOLDER_COURSES.length];

  const outline = Array.from({ length: course.moduleCount }, (_, i) => ({
    title: `Module ${i + 1}`,
    lessons: Math.max(2, Math.round(course.lessonCount / course.moduleCount)),
  }));

  return (
    <div>
      {/* full-bleed hero */}
      <div className="relative h-[52vh] min-h-[360px] w-full">
        <Photo
          seed={course.id}
          keywords={categoryPhotoKeywords(course.category)}
          lock={course.photoLock}
          width={1600}
          height={900}
          interactive={false}
          priority
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-5xl px-6 pb-10 sm:px-10">
            <span className="text-xs font-bold uppercase tracking-widest text-background/70">
              {course.category} · {course.level}
            </span>
            <h1 className="mt-2 max-w-2xl text-3xl font-bold text-background sm:text-4xl">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
          <div>
            <p className="text-lg text-muted-foreground">{course.subtitle}</p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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

            <div className="mt-8 flex items-center gap-3">
              <Photo
                seed={course.instructorName}
                person
                width={80}
                height={80}
                interactive={false}
                className="size-11 shrink-0 rounded-full"
              />
              <div>
                <div className="text-sm text-muted-foreground">Instructor</div>
                <div className="font-medium">{course.instructorName}</div>
              </div>
            </div>

            <section className="mt-16">
              <h2 className="text-xl font-semibold">About this course</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{course.description}</p>
            </section>

            <section className="mt-16">
              <h2 className="text-xl font-semibold">Curriculum</h2>
              <div className="mt-6 divide-y divide-border">
                {outline.map((m) => (
                  <div key={m.title} className="flex items-center justify-between py-4">
                    <span className="font-medium">{m.title}</span>
                    <span className="text-sm text-muted-foreground">{m.lessons} lessons</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="text-2xl font-bold">{formatPrice(course.priceCents, course.currency)}</div>
            <Link
              href={`/portal/checkout/${course.slug}`}
              className="mt-4 block w-full bg-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
            >
              {course.priceCents === 0 ? "Enroll for free" : "Enroll now"}
            </Link>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li>{course.moduleCount} modules, {course.lessonCount} lessons</li>
              <li>Certificate on completion</li>
              <li>Discussion &amp; Q&amp;A access</li>
            </ul>
          </aside>
        </div>
      </div>

      {/* next certification */}
      <Link
        href={`/courses/${next.slug}`}
        className="group relative flex h-64 items-end overflow-hidden border-t border-border sm:h-72"
      >
        <Photo
          seed={next.id}
          keywords={categoryPhotoKeywords(next.category)}
          lock={next.photoLock}
          interactive={false}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-5xl items-end justify-between px-6 pb-10 sm:px-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-background/70">
              Next certification
            </span>
            <h3 className="mt-2 text-2xl font-bold text-background">{next.title}</h3>
          </div>
          <ArrowRight className="size-6 shrink-0 text-background transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}
