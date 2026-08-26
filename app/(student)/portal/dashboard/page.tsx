import Link from "next/link";
import { BookOpen, Award, Flame, TrendingUp } from "lucide-react";
import { requireUser } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { PlaceholderImage } from "@/components/shared/placeholder-image";

export default async function StudentDashboardPage() {
  const session = await requireUser();

  const enrollments = await db.enrollment.findMany({
    where: { studentId: session.user.id },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
    take: 6,
  });

  const completedCount = enrollments.filter((e) => e.status === "COMPLETED").length;
  const inProgressCount = enrollments.filter((e) => e.status === "ACTIVE").length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progressPercent, 0) / enrollments.length)
    : 0;

  const stats = [
    { label: "Enrolled courses", value: enrollments.length, icon: BookOpen },
    { label: "Completed", value: completedCount, icon: Award },
    { label: "In progress", value: inProgressCount, icon: Flame },
    { label: "Avg. progress", value: `${avgProgress}%`, icon: TrendingUp },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Welcome back, {session.user.name?.split(" ")[0] ?? "there"}</h1>
      <p className="mt-1 text-muted-foreground">Here&apos;s where you left off.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <stat.icon className="size-5 text-primary" />
            <div className="mt-3 text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Continue learning</h2>
          <Link href="/portal/my-courses" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            You haven&apos;t enrolled in any courses yet.{" "}
            <Link href="/courses" className="font-medium text-primary hover:underline">
              Browse the catalog
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => (
              <Link
                key={enrollment.id}
                href={`/portal/my-courses/${enrollment.course.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <PlaceholderImage seed={enrollment.course.id} className="h-28 w-full" />
                <div className="p-4">
                  <h3 className="line-clamp-1 font-semibold group-hover:text-primary">
                    {enrollment.course.title}
                  </h3>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-1.5 text-xs text-muted-foreground">
                    {enrollment.progressPercent}% complete
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
