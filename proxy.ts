import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

/**
 * UI-level route gating only. This is not sufficient authorization on its
 * own — every Server Action / Route Handler re-checks the session via
 * lib/auth/guards.ts, since middleware can't be assumed to run in front of
 * direct Server Action invocations.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/portal")) {
    if (!req.auth) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!req.auth || (role !== "INSTRUCTOR" && role !== "ADMIN")) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
