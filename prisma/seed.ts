import { db } from "../lib/db";
import { seedCore } from "./seed/core.seed";
import { seedCatalog } from "./seed/catalog.seed";
import { seedOptionalCivilTech } from "./seed/optional-civiltech.seed";

async function main() {
  const { students } = await seedCore();
  const studentIds = students.map((s) => s.id);

  await seedCatalog(studentIds);

  // Delete this call (and its import above) if you remove the optional
  // CivilTech module — see MODULES.md.
  await seedOptionalCivilTech(studentIds);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
