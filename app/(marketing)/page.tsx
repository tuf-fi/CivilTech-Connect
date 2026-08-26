import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Award, Wrench, Users, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CourseCard } from "@/components/shared/course-card";
import { HeroIllustration } from "@/components/marketing/hero-illustration";
import { Photo } from "@/components/shared/photo";
import { StatCounter } from "@/components/shared/stat-counter";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { Marquee } from "@/components/marketing/marquee";
import { photoUrl } from "@/lib/photo-url";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data/courses";
import { PLACEHOLDER_INSTRUCTORS } from "@/lib/placeholder-data/instructors";
import { PLACEHOLDER_TESTIMONIALS } from "@/lib/placeholder-data/testimonials";

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
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_400px] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 border border-background/25 px-3 py-1 text-xs font-bold uppercase tracking-widest text-background/70">
              Dealer & Technician Certification Network
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Certified on <span className="text-primary">every system.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-background/70 sm:text-lg">
              Torque Academy is the required training platform for technicians, service advisors,
              and sales staff across the dealer network — hybrid systems to shop safety, in one
              place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="group flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                View certifications{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/register"
                className="border border-background/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-all hover:-translate-y-0.5 hover:bg-background/10"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[340px] drop-shadow-2xl lg:max-w-none">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-secondary/40 py-5">
        <span className="mx-auto block max-w-6xl px-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground sm:text-left">
          Trusted across the network
        </span>
        <div className="mt-3">
          <Marquee items={DEALER_NETWORK} />
        </div>
      </div>

      <ScrollReveal>
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center transition-colors hover:bg-secondary/60">
                <div className="text-2xl font-bold">
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

      <section className="mx-auto max-w-6xl px-4 py-24">
        <ScrollReveal className="mb-10 flex items-end justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Catalog</span>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Active certification tracks</h2>
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
        <div className="mx-auto max-w-6xl px-4 py-24">
          <ScrollReveal className="mb-10 border-b border-border pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Why the Academy</span>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">One standard, every dealership</h2>
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
                      <feature.icon className="size-6 text-primary" strokeWidth={2.25} />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="max-w-sm text-sm text-background/80">{feature.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="group flex h-full flex-col gap-3 border-t-2 border-t-primary bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                    <feature.icon className="size-6 text-primary" strokeWidth={2.25} />
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <ScrollReveal className="mb-10 border-b border-border pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Faculty</span>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Learn from master trainers</h2>
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
        <div className="mx-auto px-4 py-24">
          <ScrollReveal>
            <TestimonialCarousel testimonials={PLACEHOLDER_TESTIMONIALS} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
