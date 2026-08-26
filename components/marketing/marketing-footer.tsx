import Link from "next/link";
import { BrandMark } from "@/components/shared/brand-mark";

const COLUMNS = [
  {
    title: "Training",
    links: [
      { href: "/courses", label: "Certification catalog" },
      { href: "/blog", label: "Service bulletins" },
      { href: "/pricing", label: "Dealer pricing" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/jobs", label: "Careers" },
      { href: "/ojt", label: "Technician placement" },
      { href: "/tesda", label: "Trade school partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/about", label: "About the Academy" },
      { href: "/contact", label: "Contact support" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <BrandMark variant="inverted" />
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Certification training for technicians, service advisors, and sales staff across the
            dealer network. Torque Motors is a fictional placeholder brand — demo content only.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wide text-background">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/15 py-6 text-center text-xs text-background/60">
        © {new Date().getFullYear()} Torque Academy — a demo built on the e-learning template.
        All content is placeholder.
      </div>
    </footer>
  );
}
