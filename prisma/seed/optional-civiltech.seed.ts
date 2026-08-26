// OPTIONAL, EXAMPLE MODULE — delete alongside prisma/schema/optional-civiltech.prisma.
// See MODULES.md for the full removal procedure.
import { db } from "../../lib/db";

export async function seedOptionalCivilTech(studentIds: string[]) {
  const companies = await Promise.all(
    [
      {
        companyName: "Northbridge Builders",
        companyPresident: "Elena Cruz",
        address: "12 Harbor Ave",
        slotsAvailable: 4,
        email: "hr@northbridge.example",
        phone: "555-0101",
        deploymentLocation: "Site A",
      },
      {
        companyName: "Summit Construction Group",
        companyPresident: "Owen Reyes",
        address: "88 Ridge Rd",
        slotsAvailable: 2,
        email: "careers@summitcg.example",
        phone: "555-0102",
        deploymentLocation: "Site B",
      },
      {
        companyName: "Coastal Infrastructure Co.",
        companyPresident: "Mila Santos",
        address: "4 Bayview Dr",
        slotsAvailable: 3,
        email: "jobs@coastalinfra.example",
        phone: "555-0103",
        deploymentLocation: "Site C",
      },
    ].map((c) => db.ojtCompany.create({ data: c }))
  );

  await db.ojtApplication.createMany({
    data: studentIds.slice(0, 3).map((studentId, i) => ({
      companyId: companies[i % companies.length].id,
      studentId,
      deploymentLocation: companies[i % companies.length].deploymentLocation,
      course: "Civil Engineering",
      yearLevel: "4th Year",
      status: "PENDING" as const,
    })),
  });

  await db.jobOpportunity.createMany({
    data: [
      {
        companyName: "Northbridge Builders",
        jobOffers: "Junior Site Engineer, Safety Officer",
        email: "hr@northbridge.example",
        phone: "555-0101",
        address: "12 Harbor Ave",
      },
      {
        companyName: "Summit Construction Group",
        jobOffers: "Project Coordinator",
        email: "careers@summitcg.example",
        phone: "555-0102",
        address: "88 Ridge Rd",
      },
    ],
  });

  const category = await db.tesdaCategory.create({
    data: { name: "Construction Trades", description: "Hands-on trade certifications." },
  });

  const center = await db.tesdaTrainingCenter.create({
    data: { name: "Regional Skills Institute", address: "9 Trade Center Blvd" },
  });

  const course = await db.tesdaCourse.create({
    data: {
      categoryId: category.id,
      name: "Basic Masonry NC II",
      shortDesc: "Foundational masonry techniques and safety standards.",
    },
  });

  await db.tesdaCourseTrainingCenter.create({
    data: { courseId: course.id, centerId: center.id },
  });

  console.log(
    `Seeded optional module: ${companies.length} OJT companies, 2 job listings, 1 TESDA course.`
  );
}
