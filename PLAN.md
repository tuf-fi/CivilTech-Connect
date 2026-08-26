# eLearning-template — Next.js E-Learning Website Template

## Context

This repo is a fresh, generic **e-learning website template**, spun out of an exploration of an existing project (CivilTech-Connect, a Laravel + React school e-learning/OJT/job-board site) but built independently from scratch here — Next.js-only (no PHP/Laravel), Postgres + Prisma, Tailwind CSS, with placeholder content/images, a modern/sleek/interactive design, and a broad e-learning feature set (courses, quizzes, enrollments, certificates, ratings, discussions, blog, gamification, payments-stub) plus a set of optional, toggle-able "CivilTech-style" modules (OJT placement, job board, TESDA course catalog) that demonstrate how the template can be extended for a specific institution and can be cleanly deleted if a client only wants the plain student+admin e-learning core.

## Tech Stack (decided)

- **Next.js 15 (App Router) + React 19**, TypeScript throughout.
- **PostgreSQL + Prisma ORM** (using Prisma's `prismaSchemaFolder` preview feature to split `prisma/schema/*.prisma` into domain files).
- **Auth.js (NextAuth v5)** with Prisma Adapter, Credentials provider (bcrypt-hashed passwords), JWT session strategy, role claim (`STUDENT` / `INSTRUCTOR` / `ADMIN`) on the session.
- **Tailwind CSS + shadcn/ui** (Radix-based, copied-source components — not a locked dependency, ideal for a forkable/re-themeable template) **+ Framer Motion** (interactions/animations) **+ next-themes** (dark mode) **+ @dnd-kit** (drag-reorder in course authoring) **+ react-hook-form + zod** (forms/validation) **+ SWR or TanStack Query** (client-side polling for notifications/activity feed/leaderboard on top of Server Components for first paint).
- **Stripe**, stubbed: real `stripe` SDK wrapped by a `StubStripeClient` that auto-marks orders paid when no live key is configured, so the template works out of the box with zero external services.
- **@react-pdf/renderer** for certificate PDF generation. **react-player** for video (supports YouTube/Vimeo/MP4 placeholder sources).

## Repo Structure

Single Next.js app at repo root: `app/`, `components/`, `lib/`, `prisma/`, `public/`, plus standard Next.js config files.

## Data Model (Prisma, split across `prisma/schema/*.prisma`)

Segmented so the optional module is a clean deletion (see "Module Toggle & Removability" below). Uses the standard `Course → Module → Lesson` e-learning vocabulary.

**`core.prisma`** — `Role` enum (`STUDENT/INSTRUCTOR/ADMIN`), `User` (email, passwordHash, fullName, role, avatarUrl, bio), NextAuth adapter models (`Account`, `Session`, `VerificationToken`).

**`catalog.prisma`** — `Course` (slug, title, description, coverImageUrl, level, status draft/published/archived, priceCents, currency, category tag, tags[], instructorId, publishedAt), `Module` (course-scoped, ordered), `Lesson` (module-scoped, ordered, slug, isPreview, videoUrl, videoDurationSec), `ContentBlock` (lesson-scoped, ordered, `type` enum RICH_TEXT/VIDEO/IMAGE/FILE_DOWNLOAD/QUIZ_EMBED/CODE_SNIPPET, `data Json` for type-specific payload — a lightweight block-editor model, not a rigid per-type schema).

**`learning.prisma`** — `Enrollment` (student+course unique, status, progressPercent, enrolledAt/completedAt, `onDelete: Restrict` on course to preserve history), `LessonProgress` (student+lesson unique, completedAt, lastPositionSec for video resume).

**`quiz.prisma`** — `Quiz` (course/module-scoped, passingScorePercent), `QuizQuestion`, `QuizChoice` (isCorrect), `QuizAttempt` (scorePercent, passed, timestamps), `QuizAttemptAnswer` (links attempt+question+chosen choice+isCorrect).

**`certificate.prisma`** — `Certificate` (student+course unique, certificateNumber unique, issuedAt, filePath).

**`community.prisma`** — `CourseRating` (student+course unique, rating, review), `Discussion` (lesson-scoped, self-referential `parentId` for threaded replies), `BlogPost` (title, slug, body, coverImageUrl, optional courseId link, authorId, publishedAt).

**`notification.prisma`** — `Notification` (userId, type enum covering enrollment/lesson/quiz/certificate/discussion-reply/badge/OJT-status/payment/system, title, body, link, readAt).

**`gamification.prisma`** — `Point` (userId, amount, reason enum), `Badge` (code, name, description, iconUrl, `criteria Json` evaluated by an award service), `UserBadge` (award record). Leaderboard is a computed `GROUP BY` query over `Point`, not a stored table.

**`payment.prisma`** — `Order` (userId, courseId, amountCents, status enum PENDING/PAID/FAILED/REFUNDED, stripeSessionId, stripePaymentIntentId).

**`site.prisma`** — `SiteModuleToggle` (key unique e.g. `OJT`/`JOB_BOARD`/`TESDA_CATALOG`/`BLOG`/`GAMIFICATION`/`PAYMENTS`, label, enabled) — the CMS toggle system; `SiteSetting` (key/value `Json`) as a generic key-value CMS table for site name/tagline/contact/socials (template-friendly — no migration needed to add a field).

**`optional-civiltech.prisma`** (isolated optional module, deletable — see below) — `OjtCompany`, `OjtReferral`, `OjtApplication` (status enum, references core `User` for the student), `JobOpportunity`, `TesdaCategory`, `TesdaCourse`, `TesdaTrainingCenter` + join table `TesdaCourseTrainingCenter`.

The **only** touchpoint from core into the optional module is a single back-relation field on `User` (`ojtApplications OjtApplication[]`) — flag it with an inline comment (`// OPTIONAL: example module — delete when removing optional-civiltech.prisma`) so it's the one grep-able line to remove.

## Auth & RBAC

- NextAuth v5, Credentials provider, JWT sessions carrying `id` + `role`. Type-augment `next-auth.d.ts`.
- Public self-registration creates `STUDENT` accounts. `INSTRUCTOR` accounts are admin-provisioned (an "invite instructor" admin action); seed data includes 2-3 demo instructors so the template isn't empty.
- `middleware.ts` gates by path prefix: `/portal/**` requires any authenticated session, `/admin/**` requires `INSTRUCTOR` or `ADMIN` (with finer per-page checks — e.g. module-toggle settings and site settings are `ADMIN`-only, course editing is scoped to the owning `INSTRUCTOR` or any `ADMIN`).
- **Defense in depth**: middleware only gates UI navigation. Every Server Action and Route Handler independently re-checks the session/role via a shared `lib/auth/guards.ts` (`requireRole(session, [...])`) — Server Actions are directly invokable and must not rely on middleware alone.
- Password reset uses Auth.js's email-token flow via a stub mailer (`lib/email/stub-mailer.ts`) that logs to console by default — swappable for a real provider (Resend/Nodemailer) later, same "stub by default" philosophy as Stripe.

## Module Toggle & Removability (the CMS layer)

- `lib/modules/registry.ts` — canonical list of module keys/metadata (currently: `OJT`, `JOB_BOARD`, `TESDA_CATALOG`; extendable to `BLOG`, `GAMIFICATION`, `PAYMENTS` if a client wants to turn those off too).
- `lib/modules/isEnabled.ts` — cached server-side check against `SiteModuleToggle`, used in three places for real defense in depth:
  1. **Nav rendering** — shared layout/header components hide links to disabled modules.
  2. **Page-level gate** — every optional-module `page.tsx` calls `isModuleEnabled(key)` and calls `notFound()` if disabled, so direct URLs 404.
  3. **Server Action / Route Handler gate** — every optional-module mutation independently re-checks the toggle before touching the DB.
- Admin UI: `/admin/modules` — a `ModuleTogglePanel` of `ModuleToggleSwitch` rows wired to `SiteModuleToggle`.
- **Deletion procedure** (documented in `MODULES.md`): delete `prisma/schema/optional-civiltech.prisma` → remove the flagged back-relation line on `User` → `prisma migrate dev` → delete the optional route folders (listed below) → delete `prisma/seed/optional-civiltech.seed.ts` and its import → remove entries from `lib/modules/registry.ts` and nav components.

## Route/Page Structure (App Router)

Three portal *experiences* implemented as **one Next.js app** using route groups for layout separation plus explicit URL prefixes for the authed portals (needed so `/portal` and `/admin` trees don't collide on shared page names like `dashboard`):

```
app/
├── layout.tsx                    # fonts, ThemeProvider, Toaster
├── middleware.ts
├── globals.css                   # Tailwind + CSS variable design tokens
│
├── (marketing)/                  # PUBLIC, no auth, no URL prefix
│   ├── layout.tsx                # MarketingHeader + MarketingFooter
│   ├── page.tsx                  # Home/landing
│   ├── courses/page.tsx          # catalog: search + filters
│   ├── courses/[slug]/page.tsx   # public course detail + enroll/buy CTA
│   ├── pricing/page.tsx
│   ├── blog/page.tsx , blog/[slug]/page.tsx
│   ├── about/page.tsx , contact/page.tsx
│   ├── jobs/**                   # [MODULE: JOB_BOARD]
│   ├── ojt/**                    # [MODULE: OJT]
│   ├── tesda/**                  # [MODULE: TESDA_CATALOG]
│   ├── login/page.tsx , register/page.tsx
│   └── forgot-password/, reset-password/[token]/
│
├── (student)/portal/             # STUDENT-AUTH, prefix /portal
│   ├── layout.tsx                # StudentSidebar + NotificationBell
│   ├── dashboard/page.tsx        # progress overview + auto-updating activity feed
│   ├── my-courses/page.tsx , my-courses/[courseSlug]/page.tsx
│   ├── my-courses/[courseSlug]/lessons/[lessonSlug]/page.tsx   # LessonPlayer
│   ├── quizzes/[quizId]/page.tsx , quizzes/[quizId]/results/[attemptId]/page.tsx
│   ├── certificates/page.tsx , certificates/[id]/page.tsx
│   ├── discussions/page.tsx , discussions/[threadId]/page.tsx
│   ├── achievements/page.tsx     # points/badges/leaderboard
│   ├── notifications/page.tsx
│   ├── checkout/[courseSlug]/page.tsx   # Stripe-stub checkout
│   ├── jobs/**                   # [MODULE: JOB_BOARD] saved/applied
│   ├── ojt/**                    # [MODULE: OJT] application flow
│   └── settings/profile/, settings/change-password/
│
├── (admin)/admin/                # INSTRUCTOR or ADMIN auth, prefix /admin, role-aware nav
│   ├── layout.tsx                # AdminSidebar
│   ├── dashboard/page.tsx        # analytics-lite + activity feed
│   ├── courses/page.tsx , courses/new/, courses/[id]/edit/
│   ├── courses/[id]/curriculum/page.tsx      # module/lesson authoring, @dnd-kit reorder
│   ├── courses/[id]/lessons/[lessonId]/edit/page.tsx   # content-block editor
│   ├── courses/[id]/quizzes/[quizId]/builder/page.tsx
│   ├── students/page.tsx , students/[id]/page.tsx
│   ├── quiz-results/page.tsx , discussions/page.tsx (moderation)
│   ├── blog/page.tsx , blog/new/ , blog/[id]/edit/
│   ├── orders/page.tsx , gamification/page.tsx
│   ├── modules/page.tsx          # SiteModuleToggle CMS switchboard — ADMIN only
│   ├── jobs/**, ojt/**, tesda/**  # [MODULE: ...] admin management — ADMIN/INSTRUCTOR
│   └── settings/site/ (ADMIN only), settings/change-password/
│
└── api/
    ├── auth/[...nextauth]/route.ts
    ├── webhooks/stripe/route.ts
    └── certificates/[id]/download/route.ts
```

## Design System

- **Tailwind + shadcn/ui** components in `components/ui/*` (owned source, easy to re-theme) + **Framer Motion** for interactions + **next-themes** for dark mode (class strategy, SSR-safe).
- **Direction**: modern SaaS-y — near-neutral base (not pure black/white) for light/dark, one vivid primary accent used sparingly (CTAs, active nav, progress bars) so re-theming means swapping ~3-4 CSS variables, semantic colors (success/warning/destructive/info) for status badges/toasts, one variable font (`next/font`) with a modular type scale, generous rounded-xl cards, soft low-opacity shadows, consistent motion durations/easing.
- **Interactivity**: `ScrollReveal` (Framer Motion `whileInView`), route/section transitions via `AnimatePresence`, hover/tap micro-interactions on cards/buttons, animated progress bars and count-up stat tiles, `@dnd-kit` drag-reorder in course authoring, animated theme toggle.

## Component Inventory (high level)

- **Shared**: `CourseCard`, `ProgressBar`, `NotificationBell`, `BadgeDisplay`, `Avatar`, `SearchFilterBar`, `EmptyState`, `ModuleGate` (hides children when a module is toggled off), `ScrollReveal`.
- **Marketing**: `Hero`, `FeatureGrid`, `PricingCard`/`PricingTable`, `TestimonialCard`, `BlogPostCard`, `CourseCatalogGrid`, `StatCounter`.
- **Student**: `LessonPlayer`, `ContentBlockRenderer`, `LessonSidebarOutline`, `QuizRunner`, `QuizResultSummary`, `CertificateViewer`, `DiscussionThread`/`DiscussionComposer`, `LeaderboardTable`, `ActivityFeed`, `CheckoutForm`.
- **Admin**: `AdminDataTable` (generic sortable/paginated), `CourseAuthoringForm`, `CurriculumBuilder` (drag-reorder), `LessonContentEditor` (block editor), `QuizBuilder`, `EnrollmentTable`, `ModuleToggleSwitch`/`ModuleTogglePanel`, `AnalyticsChartCard`, `BlogPostEditor`.

## Feature Notes

- **Video**: `react-player` reading `Lesson.videoUrl` (provider-agnostic — direct MP4 or YouTube/Vimeo embed); no video hosting infra in the template, explicitly a "bring your own CDN" swap point.
- **PDF certificates**: `@react-pdf/renderer`, generated on course completion (100% progress + passing quiz attempts), stored path recorded on `Certificate`, served via `api/certificates/[id]/download`.
- **Payments**: Stripe SDK wrapped by a stub client — auto-completes orders when no live key is set, so checkout "just works" for free/demo purposes; real webhook handling activates once real keys are added.
- **Gamification**: points awarded via a small rules service on lesson/quiz/course completion events; badges evaluated against `criteria Json`; leaderboard is a live aggregate query, not a cached table (add caching later only if needed).
- **Activity feed**: `lib/activity-feed.ts` merges recent `Enrollment`/`LessonProgress`/`QuizAttempt`/`Course.publishedAt` rows into one sorted feed — genuinely live from DB state, polled client-side via SWR/TanStack Query.
- **Search/filtering**: simple Postgres queries (ILIKE / basic full-text) over `Course` by category/level/price/rating — no external search service needed for a template.
- **Notifications**: DB-backed `Notification` model, bell dropdown + full center page, polled client-side.

## Placeholder Content & Images

- `lib/placeholder-data/` — typed fixtures per entity (courses, lessons, users, blog posts, badges, discussions), shaped like the Prisma types, doubling as seed source data.
- **No external image URLs.** `PlaceholderImage` and `PlaceholderAvatar` components render deterministic seeded SVG gradient blocks / initials-on-gradient (seeded by id/title so the same course always looks the same), using CSS variable colors so they auto-adapt to theme/re-theming. A handful of hand-authored local SVG illustrations for empty states/hero art.
- Prefer populated placeholder data over empty states wherever plausible (e.g. new instructor sees a sample course), reserving true empty states for action-required moments (no search results).

## Seed Data Strategy

`prisma/seed.ts` composed of modular seed files (deletable independently for the optional module): 1 admin + 2-3 instructors + 8-10 students; all `SiteModuleToggle` rows (optional ones default **enabled** so the template demos the full feature set); `SiteSetting` placeholders; 6-8 courses with modules/lessons/mixed content blocks and quizzes; a realistic spread of enrollments/progress/quiz attempts/ratings/discussion threads so dashboards look populated immediately; 5-6 badges with awarded points/badges for a few students; 3-4 blog posts; and (separately) 3-4 OJT companies with applications/referrals, 4-5 job listings, 2 TESDA categories with courses/training centers.

## Suggested Build Order

1. **Scaffold**: Next.js + TypeScript + Tailwind + shadcn init, Prisma + Postgres connection, `core.prisma` + auth (NextAuth, middleware, guards), base layouts for all 3 portal groups, design tokens in `globals.css`/`tailwind.config.ts`.
2. **Core e-learning spine**: `catalog`/`learning`/`quiz`/`certificate` schemas + seed data, public course catalog, student enrollment/lesson player/quiz runner/certificate flows.
3. **Instructor/admin authoring**: course/module/lesson/quiz builder with drag-reorder, student/enrollment management, quiz results.
4. **Community & engagement**: discussions, ratings, blog, gamification (points/badges/leaderboard), notifications, activity feed.
5. **Payments**: Stripe-stub checkout + orders.
6. **Optional example modules**: OJT, job board, TESDA catalog + admin module-toggle CMS, wired with the defense-in-depth gating.
7. **Polish**: dark mode, animations/scroll-reveal, skeleton/loading states, placeholder image system, responsive pass, final seed data tuning.

## Verification

- `npx prisma migrate dev` + `npx prisma db seed` succeed and produce a fully populated demo dataset.
- `npm run dev`: walk the golden paths — register as student → browse catalog → enroll → complete a lesson → pass a quiz → earn a certificate → leave a rating → post in discussions; log in as instructor → author a course with modules/lessons/quiz → publish → view enrolled students/results; log in as admin → toggle a module off and confirm its public/student/admin routes 404 and nav links disappear, then toggle back on.
- Confirm dark mode toggle, responsive layout (mobile/tablet/desktop), and scroll-reveal/animation interactions across marketing pages.
- Confirm the "delete optional module" procedure works end-to-end on a throwaway branch (delete schema file + relation line + route folders + seed import, migrate, app still builds and runs with OJT/Jobs/TESDA fully gone).
