export type PlaceholderCourse = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  priceCents: number;
  currency: string;
  instructorName: string;
  rating: number;
  ratingCount: number;
  studentCount: number;
  moduleCount: number;
  lessonCount: number;
  durationHours: number;
};

export const PLACEHOLDER_COURSES: PlaceholderCourse[] = [
  {
    id: "course-1",
    slug: "foundations-of-web-development",
    title: "Foundations of Web Development",
    subtitle: "HTML, CSS, and JavaScript from first principles",
    description:
      "A hands-on introduction to building for the web — semantic HTML, modern CSS layout, and enough JavaScript to make pages interactive.",
    level: "BEGINNER",
    category: "Web Development",
    priceCents: 0,
    currency: "USD",
    instructorName: "Dana Whitfield",
    rating: 4.8,
    ratingCount: 214,
    studentCount: 3120,
    moduleCount: 6,
    lessonCount: 34,
    durationHours: 18,
  },
  {
    id: "course-2",
    slug: "data-structures-and-algorithms",
    title: "Data Structures & Algorithms",
    subtitle: "Core computer science for technical interviews",
    description:
      "Arrays, trees, graphs, and the algorithms that run on them — with problem sets modeled after real interview questions.",
    level: "INTERMEDIATE",
    category: "Computer Science",
    priceCents: 4900,
    currency: "USD",
    instructorName: "Marcus Ibe",
    rating: 4.9,
    ratingCount: 501,
    studentCount: 8710,
    moduleCount: 9,
    lessonCount: 58,
    durationHours: 32,
  },
  {
    id: "course-3",
    slug: "product-design-fundamentals",
    title: "Product Design Fundamentals",
    subtitle: "From user research to high-fidelity prototypes",
    description:
      "Learn the end-to-end product design process: research, wireframing, visual design systems, and usability testing.",
    level: "BEGINNER",
    category: "Design",
    priceCents: 3900,
    currency: "USD",
    instructorName: "Priya Raman",
    rating: 4.7,
    ratingCount: 168,
    studentCount: 2430,
    moduleCount: 7,
    lessonCount: 41,
    durationHours: 22,
  },
  {
    id: "course-4",
    slug: "cloud-infrastructure-with-containers",
    title: "Cloud Infrastructure with Containers",
    subtitle: "Docker, orchestration, and deployment pipelines",
    description:
      "Package, deploy, and scale applications using containers — building toward a real CI/CD pipeline by the end of the course.",
    level: "ADVANCED",
    category: "DevOps",
    priceCents: 5900,
    currency: "USD",
    instructorName: "Marcus Ibe",
    rating: 4.6,
    ratingCount: 97,
    studentCount: 1180,
    moduleCount: 8,
    lessonCount: 47,
    durationHours: 27,
  },
  {
    id: "course-5",
    slug: "civil-engineering-site-safety",
    title: "Civil Engineering Site Safety",
    subtitle: "Standards, hazard assessment, and compliance",
    description:
      "A practical certification-track course covering job-site hazard identification, safety standards, and compliance reporting.",
    level: "BEGINNER",
    category: "Civil Engineering",
    priceCents: 0,
    currency: "USD",
    instructorName: "Dana Whitfield",
    rating: 4.9,
    ratingCount: 312,
    studentCount: 4560,
    moduleCount: 5,
    lessonCount: 28,
    durationHours: 14,
  },
  {
    id: "course-6",
    slug: "applied-statistics-for-analysts",
    title: "Applied Statistics for Analysts",
    subtitle: "Statistical reasoning for real-world data",
    description:
      "Hypothesis testing, regression, and experiment design — taught through case studies rather than abstract theory.",
    level: "INTERMEDIATE",
    category: "Data",
    priceCents: 4400,
    currency: "USD",
    instructorName: "Priya Raman",
    rating: 4.5,
    ratingCount: 143,
    studentCount: 1990,
    moduleCount: 6,
    lessonCount: 36,
    durationHours: 20,
  },
];
