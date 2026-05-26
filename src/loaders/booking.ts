import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Booking, TimeSlot } from "@/types"

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   GET MY BOOKINGS
   GET /bookings/my
------------------------------------------------------- */
export async function getMyBookings(params?: {
  page?: number
  limit?: number
  status?: string
  turfId?: number
  from?: string
  to?: string
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
    if (params?.status) query.set("status", params.status)
    if (params?.turfId) query.set("turfId", String(params.turfId))
    if (params?.from) query.set("from", params.from)
    if (params?.to) query.set("to", params.to)

    const res = await fetch(`${BASE_URL}/bookings/my?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch bookings" }

    return { success: true, bookings: json.data.bookings, pagination: json.pagination }
  } catch {
    return { error: "Server error while fetching bookings" }
  }
}

/* -------------------------------------------------------
   GET AVAILABLE SLOTS FOR A TURF
   GET /bookings/available/:turfId
------------------------------------------------------- */
export async function getAvailableSlots(
  turfId: number
): Promise<{ success: true; slots: TimeSlot[] } | { error: string }> {
  try {
    const res = await fetch(`${BASE_URL}/bookings/available/${turfId}`, {
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch available slots" }

    return { success: true, slots: json.data.slots }
  } catch {
    return { error: "Server error while fetching available slots" }
  }
}
