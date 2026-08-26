import { requireRole } from "@/lib/auth/guards";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole(["INSTRUCTOR", "ADMIN"]);

  return (
    <div className="flex min-h-full flex-1">
      <AdminSidebar role={session.user.role as "INSTRUCTOR" | "ADMIN"} />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-3 border-b border-border px-6">
          <ThemeToggle />
        </header>
        <main className="flex-1 bg-muted/20 p-6">{children}</main>
      </div>
    </div>
  );
}
