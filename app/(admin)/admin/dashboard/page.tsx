import Link from "next/link";
import { BookOpen, Users, ClipboardCheck, DollarSign } from "lucide-react";
import { requireRole } from "@/lib/auth/guards";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const session = await requireRole(["INSTRUCTOR", "ADMIN"]);
  const isAdmin = session.user.role === "ADMIN";
  const courseFilter = isAdmin ? {} : { instructorId: session.user.id };

  const [courseCount, enrollmentCount, quizAttemptCount, courses] = await Promise.all([
    db.course.count({ where: courseFilter }),
    db.enrollment.count({ where: { course: courseFilter } }),
    db.quizAttempt.count({ where: { quiz: { course: courseFilter } } }),
    db.course.findMany({
      where: courseFilter,
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { enrollments: true } } },
    }),
  ]);

  const stats = [
    { label: isAdmin ? "Total courses" : "Your courses", value: courseCount, icon: BookOpen },
    { label: "Enrollments", value: enrollmentCount, icon: Users },
    { label: "Quiz attempts", value: quizAttemptCount, icon: ClipboardCheck },
    { label: "Revenue (stub)", value: "$0", icon: DollarSign },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">
        {isAdmin ? "Admin dashboard" : `Welcome, ${session.user.name?.split(" ")[0] ?? "instructor"}`}
      </h1>
      <p className="mt-1 text-muted-foreground">
        {isAdmin ? "Overview across the whole platform." : "Overview of your courses and students."}
      </p>

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
          <h2 className="text-lg font-semibold">Recent courses</h2>
          <Link href="/admin/courses" className="text-sm font-medium text-primary hover:underline">
            Manage all
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No courses yet.{" "}
            <Link href="/admin/courses/new" className="font-medium text-primary hover:underline">
              Create your first course
            </Link>
            .
          </div>
        ) : (
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/admin/courses/${course.id}/edit`}
                className="flex items-center justify-between p-4 transition-colors hover:bg-accent"
              >
                <div>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-muted-foreground">{course.status}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {course._count.enrollments} students
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
