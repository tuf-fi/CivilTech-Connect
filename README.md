# e-learning template

A generic, reusable e-learning website template — Next.js (App Router) + Prisma/Postgres + Tailwind + shadcn/ui, with placeholder content and images, ready to re-theme and extend.

See [PLAN.md](./PLAN.md) for the full architecture and build order, and [MODULES.md](./MODULES.md) for how to remove the optional example module (OJT / job board / TESDA catalog).

## Stack

- Next.js 16 (App Router) + React 19, TypeScript
- PostgreSQL + Prisma ORM (multi-file schema under `prisma/schema/`)
- Auth.js (NextAuth v5), credentials login, JWT sessions, role-based access (`STUDENT` / `INSTRUCTOR` / `ADMIN`)
- Tailwind CSS v4 + shadcn/ui (Radix-based, owned component source) + Framer Motion + next-themes
- Stripe, stubbed by default (checkout "just works" with no external services); swap in real keys to go live
- `@react-pdf/renderer` for certificates, `react-player` for video

## Getting started

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (see `docker-compose.yml` for a local Postgres you can run with `docker compose up -d`) and `AUTH_SECRET` (`npx auth secret`).
2. Install dependencies: `npm install`
3. Push the schema and seed placeholder data:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
4. Start the dev server: `npm run dev`

Seeded accounts (password for all: `password123`):
- Admin — `admin@example.com`
- Instructors — `dana@example.com`, `marcus@example.com`, `priya@example.com`
- Students — `student1@example.com` … `student8@example.com`

## Project layout

- `app/(marketing)` — public site: home, course catalog, course detail, blog, pricing, auth pages, and the optional module's public pages (jobs/ojt/tesda).
- `app/(student)/portal` — authenticated student portal (dashboard, my courses, quizzes, certificates, discussions, achievements, notifications).
- `app/(admin)/admin` — authenticated instructor/admin portal (course authoring, students, quiz results, blog, orders, gamification, module toggles).
- `lib/` — Prisma client singleton, auth config/guards, module-toggle system, Stripe/mailer stubs, placeholder-data.
- `prisma/schema/` — one `.prisma` file per domain; `prisma/schema/optional-civiltech.prisma` is the deletable example module.
- `prisma/seed/` — modular seed scripts, run via `prisma/seed.ts`.

## Status

This is an actively-scaffolded template, not a finished product. What's wired up so far: schema, auth, module-toggle architecture, design system, the public marketing site (home/catalog/course detail/login/register), and the student/admin dashboard shells with real Prisma-backed stats. Still to build out: the remaining portal pages (lesson player, quiz runner, course authoring/curriculum builder, certificates, discussions, blog admin, gamification, Stripe checkout wiring, module toggle admin UI) — see the "Suggested Build Order" in [PLAN.md](./PLAN.md) for the intended sequence.
