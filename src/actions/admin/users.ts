"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Role, User } from "@/types"

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   UPDATE USER ROLE
   PATCH /admin/users/:id/role
------------------------------------------------------- */
export async function updateUserRoleAction(
  userId: number,
  role: Role
): Promise<{ success: true; user: User } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to update user role" }

    return { success: true, user: json.data.user }
  } catch {
    return { error: "Server error while updating user role" }
  }
}

/* -------------------------------------------------------
   TOGGLE BAN USER
   PATCH /admin/users/:id/ban
------------------------------------------------------- */
export async function toggleBanUserAction(
  userId: number
): Promise<{ success: true; user: User } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/admin/users/${userId}/ban`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to toggle ban" }

    return { success: true, user: json.data.user }
  } catch {
    return { error: "Server error while toggling ban" }
  }
}
