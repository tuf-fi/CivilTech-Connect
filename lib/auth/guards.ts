import { auth } from "@/lib/auth/auth";

type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Independent, server-side auth check for Server Actions and Route
 * Handlers. Middleware gates UI navigation only — every mutation must
 * re-check the session itself, since Server Actions are directly
 * invokable and can't be assumed to have gone through middleware.
 */
export async function requireRole(allowed: Role[]) {
  const session = await auth();
  if (!session?.user || !allowed.includes(session.user.role)) {
    throw new UnauthorizedError();
  }
  return session;
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  return session;
}
