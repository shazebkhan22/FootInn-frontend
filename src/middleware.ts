import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isUserRoute = pathname.startsWith("/user");
  const isTurfRoute = pathname.startsWith("/turf-admin");
  const isSuperRoute = pathname.startsWith("/super-admin");

  // 1️⃣ Not logged in
  if (!token) {
    if (isAuthPage || pathname === "/") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2️⃣ Logged in but accessing login/register
  if (isAuthPage) {
    return redirectByRole(role, request);
  }

  // 3️⃣ Role protection
  if (isUserRoute && role !== "user") {
    return redirectByRole(role, request);
  }

  if (isTurfRoute && role !== "turf_admin") {
    return redirectByRole(role, request);
  }

  if (isSuperRoute && role !== "super_admin") {
    return redirectByRole(role, request);
  }

  return NextResponse.next();
}

function redirectByRole(role: string | undefined, request: NextRequest) {
  switch (role) {
    case "super_admin":
      return NextResponse.redirect(
        new URL("/super-admin/dashboard", request.url)
      );
    case "turf_admin":
      return NextResponse.redirect(
        new URL("/turf-admin/dashboard", request.url)
      );
    case "user":
      return NextResponse.redirect(
        new URL("/user/dashboard", request.url)
      );
    default:
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
  }
}


export const config = {
  matcher: [
    "/user/:path*",
    "/turf-admin/:path*",
    "/super-admin/:path*",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};
