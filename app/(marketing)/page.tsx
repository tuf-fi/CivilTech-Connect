import Link from "next/link";
import { ArrowRight, BookOpen, Award, Users2, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CourseCard } from "@/components/shared/course-card";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data/courses";

const STATS = [
  { label: "Courses", value: "6+" },
  { label: "Learners", value: "20k+" },
  { label: "Instructors", value: "12" },
  { label: "Completion rate", value: "92%" },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Structured curriculum",
    description: "Courses broken into modules and lessons with video, rich text, and downloads.",
  },
  {
    icon: Award,
    title: "Certificates that matter",
    description: "Auto-issued certificates on course completion, downloadable as PDF.",
  },
  {
    icon: Users2,
    title: "Built for community",
    description: "Discussion threads, ratings, and a leaderboard keep learners engaged.",
  },
  {
    icon: Sparkles,
    title: "Gamified progress",
    description: "Points and badges reward lesson completions, quiz passes, and streaks.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-96 opacity-20 blur-3xl"
          style={{ background: "linear-gradient(120deg, var(--primary), var(--info))" }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center">
          <span className="rounded-full border border-border bg-card px-4 py-1 text-xs font-medium text-muted-foreground">
            A template for building e-learning products
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Learning experiences,{" "}
            <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              built to launch fast
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-balance">
            Courses, quizzes, certificates, discussions, and a full instructor dashboard — wired to a
            real database, styled to ship, all placeholder content ready for you to replace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/courses"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105"
            >
              Browse courses <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <ScrollReveal className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Popular courses</h2>
            <p className="mt-1 text-muted-foreground">A sample of the catalog — swap in your own.</p>
          </div>
          <Link href="/courses" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            View all
          </Link>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_COURSES.slice(0, 6).map((course, i) => (
            <ScrollReveal key={course.id} delay={i * 0.05}>
              <CourseCard course={course} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Everything an e-learning site needs</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              A working starting point — not a UI-only mockup.
            </p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
