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
        <div className="mx-auto flex h-7 max-w-6xl items-center justify-between px-4 text-[11px] font-medium tracking-wide">
          <span>Dealer & Technician Certification Network</span>
          <span className="hidden sm:inline">Support: 1-800-555-0199</span>
        </div>
      </div>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/">
          <BrandMark size="sm" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
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
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30"
          >
            Enroll
          </Link>
        </div>
      </div>
    </header>
  );
}
