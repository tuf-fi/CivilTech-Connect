import { StudentSidebar } from "@/components/student/student-sidebar";
import { NotificationBell } from "@/components/shared/notification-bell";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <StudentSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-3 border-b border-border px-6">
          <NotificationBell />
          <ThemeToggle />
        </header>
        <main className="flex-1 bg-muted/20 p-6">{children}</main>
      </div>
    </div>
  );
}
