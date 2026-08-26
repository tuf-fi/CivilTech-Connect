import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Award, Wrench, Users, Quote, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CourseCard } from "@/components/shared/course-card";
import { HeroIllustration } from "@/components/marketing/hero-illustration";
import { Photo } from "@/components/shared/photo";
import { StatCounter } from "@/components/shared/stat-counter";
import { photoUrl } from "@/lib/photo-url";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data/courses";
import { PLACEHOLDER_INSTRUCTORS } from "@/lib/placeholder-data/instructors";

const STATS = [
  { label: "Certification tracks", value: 6, suffix: "" },
  { label: "Certified technicians", value: 20400, suffix: "+" },
  { label: "Dealerships enrolled", value: 1120, suffix: "" },
  { label: "Certification pass rate", value: 94, suffix: "%" },
];

const DEALER_NETWORK = [
  "Northgate Torque",
  "Summit Auto Group",
  "Coastal Torque",
  "Riverbend Motors",
  "Highline Torque",
  "Union Square Auto",
];

const FEATURES = [
  {
    icon: Wrench,
    title: "Built for the service bay",
    description:
      "Every course is scoped to a real certification level, with the diagnostic procedures technicians actually run — not generic theory.",
    photo: true,
  },
  {
    icon: Award,
    title: "Certificates that count",
    description: "Pass a level and your certificate is issued instantly, tied to your technician record.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance, tracked",
    description: "Annual safety recertification deadlines and completion status, visible to your service manager.",
  },
  {
    icon: Users,
    title: "One network, one standard",
    description: "The same curriculum and pass bar at every dealership, from Level 1 through Master Technician.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border text-background">
        <Image
          src={photoUrl("torque-academy-hero-bay", 1600, 900, ["mechanic", "tools"], 2)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale-[55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_400px] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 border border-background/25 px-3 py-1 text-xs font-bold uppercase tracking-widest text-background/70">
              Dealer & Technician Certification Network
            </span>
            <h1 className="mt-6 max-w-2xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Certified on
              <br />
              <span className="text-primary">every system.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-background/70">
              Torque Academy is the required training platform for technicians, service advisors,
              and sales staff across the dealer network — hybrid systems to shop safety, in one
              place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="group flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                View certifications{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/register"
                className="border border-background/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-background transition-all hover:-translate-y-0.5 hover:bg-background/10"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[360px] drop-shadow-2xl lg:max-w-none">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-secondary/40 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trusted across the network
          </span>
          {DEALER_NETWORK.map((name) => (
            <span key={name} className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground/70">
              {name}
            </span>
          ))}
        </div>
      </div>

      <ScrollReveal>
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center transition-colors hover:bg-secondary/60">
                <div className="font-display text-3xl font-extrabold">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <ScrollReveal className="mb-10 flex items-end justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Catalog</span>
            <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Active certification tracks</h2>
          </div>
          <Link
            href="/courses"
            className="hidden text-sm font-bold uppercase tracking-wide text-primary hover:underline sm:block"
          >
            View all
          </Link>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_COURSES.slice(0, 6).map((course, i) => (
            <ScrollReveal key={course.id} delay={i * 0.05} className="h-full">
              <CourseCard course={course} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <ScrollReveal className="mb-10 border-b border-border pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Why the Academy</span>
            <h2 className="mt-1 text-3xl font-bold sm:text-4xl">One standard, every dealership</h2>
          </ScrollReveal>
          <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {FEATURES.map((feature, i) => (
              <ScrollReveal
                key={feature.title}
                delay={i * 0.05}
                className={feature.photo ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                {feature.photo ? (
                  <div className="group relative h-full min-h-[280px] overflow-hidden border border-border">
                    <Photo
                      seed="torque-academy-diagnostics"
                      keywords={["car", "repair"]}
                      lock={1}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="relative flex h-full flex-col justify-end gap-2 p-6 text-background">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                        <feature.icon className="size-5" strokeWidth={2.25} />
                      </span>
                      <h3 className="font-display text-2xl font-extrabold uppercase">{feature.title}</h3>
                      <p className="max-w-sm text-sm text-background/80">{feature.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="group flex h-full flex-col gap-3 border border-border bg-card p-6 transition-colors hover:bg-primary">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground group-hover:ring-primary-foreground/25">
                      <feature.icon className="size-5" strokeWidth={2.25} />
                    </span>
                    <h3 className="font-bold transition-colors group-hover:text-primary-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                      {feature.description}
                    </p>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <ScrollReveal className="mb-10 border-b border-border pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Faculty</span>
          <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Learn from master trainers</h2>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_INSTRUCTORS.map((instructor, i) => (
            <ScrollReveal key={instructor.name} delay={i * 0.05} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
                <div className="relative aspect-[4/5] w-full">
                  <Photo seed={instructor.name} person className="h-full w-full" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-background">
                      View profile <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-primary">
                    {instructor.title}
                  </div>
                  <h3 className="mt-1 font-bold">{instructor.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {instructor.specialty} · {instructor.years} yrs
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <ScrollReveal>
            <Quote className="mx-auto size-8 text-primary" />
            <blockquote className="mt-6 text-2xl font-medium leading-snug sm:text-3xl">
              &ldquo;Every advisor at our store got Customer Experience-certified in the same
              week. Same standard, same bar, no exceptions — that&apos;s what the Academy
              gives us.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Photo
                seed="J. Okafor"
                person
                width={88}
                height={88}
                interactive={false}
                className="size-11 shrink-0 rounded-full"
              />
              <div className="text-left">
                <div className="text-sm font-bold">J. Okafor</div>
                <div className="text-xs text-background/60">Service Manager, Northgate Torque</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
