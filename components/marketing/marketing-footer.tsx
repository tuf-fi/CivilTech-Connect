import Link from "next/link";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "Course catalog" },
      { href: "/blog", label: "Blog" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/jobs", label: "Job board" },
      { href: "/ojt", label: "OJT placement" },
      { href: "/tesda", label: "TESDA catalog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="font-semibold">e-learning</span>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            A generic, reusable e-learning template — placeholder content, ready to re-theme.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} e-learning template. All content is placeholder.
      </div>
    </footer>
  );
}
