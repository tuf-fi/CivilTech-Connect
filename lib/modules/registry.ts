/**
 * Canonical list of toggle-able optional modules. Each key maps 1:1 to a
 * `SiteModuleToggle.key` row in the database. Adding a module here (plus a
 * DB row) is enough to make it appear in the admin toggle panel.
 */
export const MODULE_KEYS = {
  OJT: "OJT",
  JOB_BOARD: "JOB_BOARD",
  TESDA_CATALOG: "TESDA_CATALOG",
} as const;

export type ModuleKey = (typeof MODULE_KEYS)[keyof typeof MODULE_KEYS];

export const MODULE_REGISTRY: Record<
  ModuleKey,
  { label: string; description: string }
> = {
  OJT: {
    label: "OJT Placement",
    description:
      "On-the-job training company listings, referrals, and student applications.",
  },
  JOB_BOARD: {
    label: "Job Board",
    description: "Public job opportunity listings.",
  },
  TESDA_CATALOG: {
    label: "TESDA Course Catalog",
    description:
      "Separate TESDA course/training-center catalog, distinct from the main course catalog.",
  },
};
