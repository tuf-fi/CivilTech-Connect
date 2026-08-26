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
  photoLock?: number;
};

export const PLACEHOLDER_COURSES: PlaceholderCourse[] = [
  {
    id: "course-1",
    slug: "hybrid-drive-systems-fundamentals",
    title: "Hybrid Drive Systems Fundamentals",
    subtitle: "Certification Level 1 — hybrid powertrain systems",
    description:
      "The foundation course for every hybrid-certified technician: power split devices, high-voltage safety procedures, and regenerative braking systems across the Torque hybrid lineup.",
    level: "BEGINNER",
    category: "Powertrain",
    priceCents: 0,
    currency: "USD",
    instructorName: "R. Fujimoto",
    rating: 4.8,
    ratingCount: 612,
    studentCount: 9840,
    moduleCount: 6,
    lessonCount: 34,
    durationHours: 18,
    photoLock: 4,
  },
  {
    id: "course-2",
    slug: "torque-guard-safety-certification",
    title: "Torque Guard Safety Certification",
    subtitle: "ADAS calibration and diagnostics",
    description:
      "Certify on Torque Guard 3.0: pre-collision systems, dynamic radar cruise control, lane departure alert, and the calibration procedures required after windshield or bumper service.",
    level: "INTERMEDIATE",
    category: "Safety Systems",
    priceCents: 4900,
    currency: "USD",
    instructorName: "K. Alvarez",
    rating: 4.9,
    ratingCount: 501,
    studentCount: 8710,
    moduleCount: 9,
    lessonCount: 58,
    durationHours: 32,
  },
  {
    id: "course-3",
    slug: "service-advisor-customer-experience",
    title: "Service Advisor Customer Experience",
    subtitle: "Certification track for dealership service advisors",
    description:
      "The full advisor certification: multi-point inspection walkarounds, transparent estimate delivery, and the Torque Customer First service standard.",
    level: "BEGINNER",
    category: "Customer Experience",
    priceCents: 3900,
    currency: "USD",
    instructorName: "M. Delacruz",
    rating: 4.7,
    ratingCount: 358,
    studentCount: 5430,
    moduleCount: 7,
    lessonCount: 41,
    durationHours: 22,
  },
  {
    id: "course-4",
    slug: "advanced-electrical-diagnostics",
    title: "Advanced Electrical Diagnostics",
    subtitle: "Certification Level 3 — master technician track",
    description:
      "Advanced electrical fault-tracing across CAN bus networks, body control modules, and the diagnostic tooling used in master-certified service bays.",
    level: "ADVANCED",
    category: "Diagnostics",
    priceCents: 5900,
    currency: "USD",
    instructorName: "T. Nakamura",
    rating: 4.6,
    ratingCount: 197,
    studentCount: 2180,
    moduleCount: 8,
    lessonCount: 47,
    durationHours: 27,
  },
  {
    id: "course-5",
    slug: "dealership-shop-safety-compliance",
    title: "Dealership Shop Safety & Compliance",
    subtitle: "Required annual certification — all technicians",
    description:
      "Annual OSHA-aligned shop safety recertification: lift operation, hazardous material handling, high-voltage lockout/tagout, and incident reporting standards.",
    level: "BEGINNER",
    category: "Safety & Compliance",
    priceCents: 0,
    currency: "USD",
    instructorName: "K. Alvarez",
    rating: 4.9,
    ratingCount: 812,
    studentCount: 14560,
    moduleCount: 5,
    lessonCount: 28,
    durationHours: 14,
  },
  {
    id: "course-6",
    slug: "volt-series-ev-battery-systems",
    title: "Volt Series EV & Battery Systems",
    subtitle: "Certification Level 2 — electric vehicle platform",
    description:
      "High-voltage battery architecture, DC fast-charging diagnostics, and thermal management systems on the Volt Series platform, taught through real service-bay case studies.",
    level: "INTERMEDIATE",
    category: "Powertrain",
    priceCents: 4400,
    currency: "USD",
    instructorName: "R. Fujimoto",
    rating: 4.5,
    ratingCount: 143,
    studentCount: 1990,
    moduleCount: 6,
    lessonCount: 36,
    durationHours: 20,
    photoLock: 1,
  },
];
