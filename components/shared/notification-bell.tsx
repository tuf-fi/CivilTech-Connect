"use client";

import { Bell } from "lucide-react";

/**
 * Placeholder bell — wire up to a real Notification query + SWR polling
 * once the database is connected (see lib/modules and the Notification
 * model in prisma/schema/notification.prisma).
 */
export function NotificationBell() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="relative flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
    >
      <Bell className="size-4" />
    </button>
  );
}
