import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ token?: string; role?: string; error?: string }>;
}

export default async function OAuthCallbackPage({ searchParams }: Props) {
  const { token, role, error } = await searchParams;

  if (error || !token || !role) {
    redirect("/login?error=oauth_failed");
  }

  const cookieStore = await cookies();

  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("user_role", role, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  if (role === "super_admin") redirect("/super-admin/dashboard");
  if (role === "turf_admin") redirect("/turf-admin/dashboard");
  redirect("/user/dashboard");
}
