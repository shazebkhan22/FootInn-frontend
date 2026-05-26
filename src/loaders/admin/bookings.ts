import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Booking } from '@/types'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   GET TURF BOOKINGS (admin view)
   GET /admin/bookings
------------------------------------------------------- */
export async function getTurfBookings(params?: {
  page?: number
  limit?: number
  status?: string
  turfId?: number
}): Promise<
  | {
      success: true
      bookings: (Booking & {
        user: { name: string; email: string }
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

    const res = await fetch(`${BASE_URL}/admin/bookings?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error || "Failed to fetch bookings" }

    return { success: true, bookings: json.data.bookings, pagination: json.pagination }
  } catch {
    return { error: "Server error while fetching bookings" }
  }
}
