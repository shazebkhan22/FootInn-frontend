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
   GET OVERVIEW STATS
   GET /admin/overview
------------------------------------------------------- */
export async function getOverviewStats(): Promise<
  | {
      success: true
      data: {
        totalUsers: number
        totalTurfs: number
        totalBookings: number
        totalRevenue: number
        recentBookings: unknown[]
      }
    }
  | { error: string }
> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch overview stats" }

    return { success: true, data: json.data }
  } catch {
    return { error: "Server error while fetching overview stats" }
  }
}

/* -------------------------------------------------------
   GET ALL USERS
   GET /admin/users
------------------------------------------------------- */
export async function getAllUsers(params?: {
  page?: number
  limit?: number
  role?: Role
  search?: string
}): Promise<
  | {
      success: true
      users: User[]
      pagination: { total: number; page: number; limit: number; pages: number }
    }
  | { error: string }
> {
  try {
    const token = await getToken()

    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.role) query.set("role", params.role)
    if (params?.search) query.set("search", params.search)

    const res = await fetch(`${BASE_URL}/admin/users?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch users" }

    return { success: true, users: json.data.users, pagination: json.pagination }
  } catch {
    return { error: "Server error while fetching users" }
  }
}

/* -------------------------------------------------------
   GET REVENUE STATS
   GET /admin/revenue
------------------------------------------------------- */
export async function getRevenueStats(): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/admin/revenue`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch revenue stats" }

    return { success: true, data: json.data }
  } catch {
    return { error: "Server error while fetching revenue stats" }
  }
}
