import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, Booking } from "@/types"

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   GET MY PROFILE
   GET /user/me
------------------------------------------------------- */
export async function getMyProfile(): Promise<
  { success: true; user: User } | { error: string }
> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    if (res.status === 401) redirect("/login")
    if (res.status === 403) redirect("/unauthorized")

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch profile" }

    return { success: true, user: json.data.user }
  } catch {
    return { error: "Server connection failed." }
  }
}

/* -------------------------------------------------------
   GET MY BOOKINGS (via /user/me/bookings)
   GET /user/me/bookings
------------------------------------------------------- */
export async function getMyBookingsViaUser(params?: {
  page?: number
  limit?: number
}): Promise<
  | {
      success: true
      bookings: (Booking & {
        turf: { name: string; location: string }
        timeSlot: { startTime: string; endTime: string }
      })[]
      pagination: { total: number; page: number; limit: number; pages: number }
    }
  | { error: string }
> {
  try {
    const token = await getToken()

    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))

    const res = await fetch(`${BASE_URL}/user/me/bookings?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    if (res.status === 401) redirect("/login")

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch bookings" }

    return { success: true, bookings: json.data.bookings, pagination: json.pagination }
  } catch {
    return { error: "Server connection failed." }
  }
}
