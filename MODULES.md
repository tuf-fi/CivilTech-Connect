# Removing the optional example module (OJT / Job Board / TESDA)

This template ships with an example of an institution-specific extension —
OJT placement, a job board, and a TESDA course catalog — built as a
deliberately isolated, toggle-able "optional module" so it's easy to see
how to add (or remove) a similar module of your own.

Admins can turn it off at runtime from **Admin → Modules** without touching
code. To remove it from the codebase entirely (e.g. for a client that only
wants the core e-learning product):

1. Delete `prisma/schema/optional-civiltech.prisma`.
2. In `prisma/schema/core.prisma`, delete the `ojtApplications OjtApplication[]`
   line on `User` (search the repo for `OPTIONAL: example module` to find
   every touchpoint — there should only be this one).
3. Run `npx prisma migrate dev` to drop the now-unused tables.
4. Delete the optional route folders:
   - `app/(marketing)/jobs`, `app/(marketing)/ojt`, `app/(marketing)/tesda`
   - `app/(student)/portal/jobs`, `app/(student)/portal/ojt`
   - `app/(admin)/admin/jobs`, `app/(admin)/admin/ojt`, `app/(admin)/admin/tesda`
5. Delete `prisma/seed/optional-civiltech.seed.ts` and remove its import
   from `prisma/seed.ts`.
6. Remove `OJT`, `JOB_BOARD`, `TESDA_CATALOG` from `lib/modules/registry.ts`.
7. Remove the corresponding nav links in the shared header/sidebar
   components.

Nothing in the core schema files (`catalog`, `learning`, `quiz`,
`certificate`, `community`, `notification`, `gamification`, `payment`,
`site`) references the optional module, so this is a mechanical, low-risk
deletion.
