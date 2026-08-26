import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BrandMark } from "@/components/shared/brand-mark";

const NAV_LINKS = [
  { href: "/courses", label: "Certifications" },
  { href: "/blog", label: "Bulletins" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="border-b border-border bg-foreground text-background">
        <div className="mx-auto flex h-8 max-w-6xl items-center justify-between px-4 text-xs font-medium tracking-wide">
          <span>DEALER & TECHNICIAN CERTIFICATION NETWORK</span>
          <span className="hidden sm:inline">SUPPORT: 1-800-555-0199</span>
        </div>
      </div>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wide text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30"
          >
            Enroll
          </Link>
        </div>
      </div>
    </header>
  );
}
