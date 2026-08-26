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
    slug: "foundations-of-web-development",
    title: "Foundations of Web Development",
    subtitle: "HTML, CSS, and JavaScript from first principles",
    description:
      "A hands-on introduction to building for the web — semantic HTML, modern CSS layout, and enough JavaScript to make pages interactive.",
    level: "BEGINNER",
    category: "Web Development",
    priceCents: 0,
    instructorEmail: "dana@example.com",
    modules: [
      { title: "Getting Started", lessons: ["Course overview", "Setting up your editor", "Your first HTML page"] },
      { title: "Styling with CSS", lessons: ["Selectors & the box model", "Flexbox layout", "Responsive design"] },
      { title: "Interactivity with JavaScript", lessons: ["Variables & functions", "DOM manipulation", "Handling events"] },
    ],
  },
  {
    slug: "data-structures-and-algorithms",
    title: "Data Structures & Algorithms",
    subtitle: "Core computer science for technical interviews",
    description:
      "Arrays, trees, graphs, and the algorithms that run on them — with problem sets modeled after real interview questions.",
    level: "INTERMEDIATE",
    category: "Computer Science",
    priceCents: 4900,
    instructorEmail: "marcus@example.com",
    modules: [
      { title: "Arrays & Strings", lessons: ["Two pointers", "Sliding window", "Practice set"] },
      { title: "Trees & Graphs", lessons: ["Binary trees", "Traversals", "Graph search"] },
    ],
  },
  {
    slug: "civil-engineering-site-safety",
    title: "Civil Engineering Site Safety",
    subtitle: "Standards, hazard assessment, and compliance",
    description:
      "A practical certification-track course covering job-site hazard identification, safety standards, and compliance reporting.",
    level: "BEGINNER",
    category: "Civil Engineering",
    priceCents: 0,
    instructorEmail: "dana@example.com",
    modules: [
      { title: "Hazard Identification", lessons: ["Common site hazards", "Risk assessment basics"] },
      { title: "Compliance", lessons: ["Reporting standards", "Case studies"] },
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
