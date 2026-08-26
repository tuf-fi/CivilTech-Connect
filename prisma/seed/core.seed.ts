import bcrypt from "bcryptjs";
import { db } from "../../lib/db";
import { MODULE_REGISTRY } from "../../lib/modules/registry";

export async function seedCore() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await db.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      fullName: "Program Administrator",
      role: "ADMIN",
      passwordHash,
    },
  });

  const instructors = await Promise.all(
    [
      { email: "fujimoto@example.com", fullName: "R. Fujimoto" },
      { email: "alvarez@example.com", fullName: "K. Alvarez" },
      { email: "delacruz@example.com", fullName: "M. Delacruz" },
      { email: "nakamura@example.com", fullName: "T. Nakamura" },
    ].map((i) =>
      db.user.upsert({
        where: { email: i.email },
        update: {},
        create: { ...i, role: "INSTRUCTOR", passwordHash },
      })
    )
  );

  const students = await Promise.all(
    Array.from({ length: 8 }, (_, i) => ({
      email: `student${i + 1}@example.com`,
      fullName: `Student ${i + 1}`,
    })).map((s) =>
      db.user.upsert({
        where: { email: s.email },
        update: {},
        create: { ...s, role: "STUDENT", passwordHash },
      })
    )
  );

  // Optional modules default enabled so the template demos the full
  // feature set out of the box; admins can turn them off from /admin/modules.
  await Promise.all(
    Object.entries(MODULE_REGISTRY).map(([key, meta]) =>
      db.siteModuleToggle.upsert({
        where: { key },
        update: {},
        create: { key, label: meta.label, enabled: true },
      })
    )
  );

  await Promise.all(
    [
      { key: "site_name", value: "Torque Academy" },
      { key: "site_tagline", value: "Certification training for the Torque Motors dealer network" },
      { key: "contact_email", value: "academy-support@example.com" },
    ].map((s) =>
      db.siteSetting.upsert({
        where: { key: s.key },
        update: {},
        create: s,
      })
    )
  );

  console.log(
    `Seeded core: 1 admin, ${instructors.length} instructors, ${students.length} students.`
  );

  return { admin, instructors, students };
}
