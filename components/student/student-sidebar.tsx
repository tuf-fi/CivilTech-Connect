"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  MessagesSquare,
  Trophy,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/portal/certificates", label: "Certificates", icon: Award },
  { href: "/portal/discussions", label: "Discussions", icon: MessagesSquare },
  { href: "/portal/achievements", label: "Achievements", icon: Trophy },
  { href: "/portal/notifications", label: "Notifications", icon: Bell },
  { href: "/portal/settings/profile", label: "Settings", icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card">
      <Link href="/" className="flex items-center gap-2 border-b border-border px-5 py-5 font-semibold">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-4.5" />
        </span>
        <span>e-learning</span>
      </Link>

      <nav className="flex-1 space-y-1 p-3">
        {LINKS.map((link) => {
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
