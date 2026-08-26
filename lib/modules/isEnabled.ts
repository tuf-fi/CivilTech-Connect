import { cache } from "react";
import { db } from "@/lib/db";
import type { ModuleKey } from "@/lib/modules/registry";

/**
 * Server-side module toggle check, memoized per request via React.cache.
 * Used in three places for defense in depth:
 *  1. Nav rendering (hide links to disabled modules)
 *  2. Page-level gate (call notFound() when disabled, so direct URLs 404)
 *  3. Server Action / Route Handler gate (reject mutations independently)
 */
export const isModuleEnabled = cache(async (key: ModuleKey): Promise<boolean> => {
  const toggle = await db.siteModuleToggle.findUnique({ where: { key } });
  // Default to enabled if the toggle row hasn't been seeded yet, so a
  // freshly-cloned template still shows its example modules out of the box.
  return toggle?.enabled ?? true;
});
