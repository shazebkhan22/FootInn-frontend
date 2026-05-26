import { cookies } from 'next/headers'
import type { Turf } from '@/types'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

/* -------------------------------------------------------
   GET ALL TURFS
   GET /turf  (public)
------------------------------------------------------- */
export async function getAllTurfs(params?: {
  page?: number
  limit?: number
  search?: string
  sport?: string
}): Promise<
  | {
      success: true
      turfs: Turf[]
      pagination?: { total: number; page: number; limit: number; pages: number }
    }
  | { error: string }
> {
  try {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.search) query.set("search", params.search)
    if (params?.sport) query.set("sport", params.sport)

    const res = await fetch(`${BASE_URL}/turf?${query}`, {
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch turfs" }

    return {
      success: true,
      turfs: json.data?.turfs ?? json.data ?? [],
      pagination: json.pagination,
    }
  } catch {
    return { error: "Server error while fetching turfs" }
  }
}

/* -------------------------------------------------------
   GET TURF BY ID
   GET /turf/:id  (public)
------------------------------------------------------- */
export async function getTurfById(
  turfId: number
): Promise<{ success: true; turf: Turf } | { error: string }> {
  try {
    const res = await fetch(`${BASE_URL}/turf/${turfId}`, {
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Turf not found" }

    return { success: true, turf: json.data?.turf ?? json.data }
  } catch {
    return { error: "Server error while fetching turf" }
  }
}

/* -------------------------------------------------------
   GET MY TURF STATS  (turf admin)
   GET /turf/my/stats
------------------------------------------------------- */
export async function getMyTurfStats(): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf/my/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch turf stats" }

    return { success: true, data: json.data }
  } catch {
    return { error: "Server error while fetching turf stats" }
  }
}
