import { db } from "../../lib/db";

type SeedCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  priceCents: number;
  instructorEmail: string;
  modules: { title: string; lessons: string[] }[];
};

const COURSES: SeedCourse[] = [
  {
    slug: "hybrid-drive-systems-fundamentals",
    title: "Hybrid Drive Systems Fundamentals",
    subtitle: "Certification Level 1 — hybrid powertrain systems",
    description:
      "The foundation course for every hybrid-certified technician: power split devices, high-voltage safety procedures, and regenerative braking systems across the Torque hybrid lineup.",
    level: "BEGINNER",
    category: "Powertrain",
    priceCents: 0,
    instructorEmail: "fujimoto@example.com",
    modules: [
      { title: "High-Voltage Safety", lessons: ["Course overview", "Lockout/tagout procedures", "PPE requirements"] },
      { title: "Power Split Devices", lessons: ["Planetary gearset theory", "MG1/MG2 operation", "Diagnostic scan tool walkthrough"] },
      { title: "Regenerative Braking", lessons: ["Brake-by-wire systems", "Battery state of charge", "Service bay case study"] },
    ],
  },
  {
    slug: "torque-guard-safety-certification",
    title: "Torque Guard Safety Certification",
    subtitle: "ADAS calibration and diagnostics",
    description:
      "Certify on Torque Guard 3.0: pre-collision systems, dynamic radar cruise control, lane departure alert, and the calibration procedures required after windshield or bumper service.",
    level: "INTERMEDIATE",
    category: "Safety Systems",
    priceCents: 4900,
    instructorEmail: "alvarez@example.com",
    modules: [
      { title: "ADAS Overview", lessons: ["Sensor architecture", "Pre-collision system logic", "Practice set"] },
      { title: "Calibration Procedures", lessons: ["Static calibration", "Dynamic calibration", "Post-service verification"] },
    ],
  },
  {
    slug: "dealership-shop-safety-compliance",
    title: "Dealership Shop Safety & Compliance",
    subtitle: "Required annual certification — all technicians",
    description:
      "Annual OSHA-aligned shop safety recertification: lift operation, hazardous material handling, high-voltage lockout/tagout, and incident reporting standards.",
    level: "BEGINNER",
    category: "Safety & Compliance",
    priceCents: 0,
    instructorEmail: "alvarez@example.com",
    modules: [
      { title: "Shop Floor Safety", lessons: ["Lift operation standards", "Hazardous material handling"] },
      { title: "Compliance Reporting", lessons: ["Incident reporting standards", "Annual recertification checklist"] },
    ],
  },
];

export async function seedCatalog(studentIds: string[]) {
  for (const c of COURSES) {
    const instructor = await db.user.findUniqueOrThrow({ where: { email: c.instructorEmail } });

    const course = await db.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        level: c.level,
        status: "PUBLISHED",
        priceCents: c.priceCents,
        category: c.category,
        tags: [c.category],
        instructorId: instructor.id,
        publishedAt: new Date("2026-01-15T00:00:00.000Z"),
      },
    });

    for (const [moduleIndex, m] of c.modules.entries()) {
      const module = await db.module.create({
        data: { courseId: course.id, title: m.title, order: moduleIndex },
      });

      for (const [lessonIndex, lessonTitle] of m.lessons.entries()) {
        const lesson = await db.lesson.create({
          data: {
            moduleId: module.id,
            title: lessonTitle,
            slug: lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            order: lessonIndex,
            isPreview: moduleIndex === 0 && lessonIndex === 0,
          },
        });

        await db.contentBlock.create({
          data: {
            lessonId: lesson.id,
            type: "RICH_TEXT",
            order: 0,
            data: { html: `<p>Placeholder content for "${lessonTitle}".</p>` },
          },
        });
      }
    }

    // A short quiz on the first module of each seeded course.
    const firstModule = await db.module.findFirstOrThrow({ where: { courseId: course.id }, orderBy: { order: "asc" } });
    const quiz = await db.quiz.create({
      data: {
        title: `${c.title}: Knowledge Check`,
        courseId: course.id,
        moduleId: firstModule.id,
        passingScorePercent: 70,
      },
    });

    const question = await db.quizQuestion.create({
      data: { quizId: quiz.id, question: `What is this course primarily about?`, order: 0 },
    });

    await db.quizChoice.createMany({
      data: [
        { quizQuestionId: question.id, choiceText: c.category, isCorrect: true, order: 0 },
        { quizQuestionId: question.id, choiceText: "Cooking", isCorrect: false, order: 1 },
        { quizQuestionId: question.id, choiceText: "Astrology", isCorrect: false, order: 2 },
      ],
    });

    // Enroll a couple of students with varying progress so dashboards look populated.
    for (const [i, studentId] of studentIds.slice(0, 3).entries()) {
      await db.enrollment.upsert({
        where: { studentId_courseId: { studentId, courseId: course.id } },
        update: {},
        create: {
          studentId,
          courseId: course.id,
          progressPercent: [100, 60, 20][i] ?? 10,
          status: i === 0 ? "COMPLETED" : "ACTIVE",
          completedAt: i === 0 ? new Date("2026-02-01T00:00:00.000Z") : null,
        },
      });

      await db.courseRating.upsert({
        where: { studentId_courseId: { studentId, courseId: course.id } },
        update: {},
        create: {
          studentId,
          courseId: course.id,
          rating: 4 + (i % 2),
          review: "Clear explanations, good pacing.",
        },
      });
    }
  }

  console.log(`Seeded catalog: ${COURSES.length} courses with modules, lessons, and a quiz each.`);
}
