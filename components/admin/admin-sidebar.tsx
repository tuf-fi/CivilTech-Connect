"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  MessagesSquare,
  Newspaper,
  Receipt,
  Trophy,
  ToggleLeft,
  Briefcase,
  HardHat,
  GraduationCap as TesdaIcon,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CORE_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/quiz-results", label: "Quiz Results", icon: ClipboardCheck },
  { href: "/admin/discussions", label: "Discussions", icon: MessagesSquare },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
  { href: "/admin/gamification", label: "Gamification", icon: Trophy },
];

// [MODULE] links — deletable alongside the optional module, see MODULES.md.
const MODULE_LINKS = [
  { href: "/admin/jobs", label: "Job Board", icon: Briefcase },
  { href: "/admin/ojt", label: "OJT Placement", icon: HardHat },
  { href: "/admin/tesda", label: "TESDA Catalog", icon: TesdaIcon },
];

const ADMIN_ONLY_LINKS = [
  { href: "/admin/modules", label: "Modules", icon: ToggleLeft },
  { href: "/admin/settings/site", label: "Site Settings", icon: Settings },
];

export function AdminSidebar({ role }: { role: "INSTRUCTOR" | "ADMIN" }) {
  const pathname = usePathname();
  const links = [...CORE_LINKS, ...MODULE_LINKS, ...(role === "ADMIN" ? ADMIN_ONLY_LINKS : [])];

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card">
      <Link href="/" className="flex items-center gap-2 border-b border-border px-5 py-5 font-semibold">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-4.5" />
        </span>
        <span>e-learning</span>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
          {role}
        </span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {links.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <link.icon className="size-4.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 border-t border-border px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
      >
        <LogOut className="size-4.5" />
        Sign out
      </button>
    </aside>
  );
}
