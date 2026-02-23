'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

type UpdateBookingStatusResponse =
  | { success: true; booking: unknown }
  | { error: string }

export async function updateBookingStatusAction(
  bookingId: number,
  status: "CONFIRMED" | "CANCELLED" | "REFUNDED"
): Promise<UpdateBookingStatusResponse> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) {
      return { error: "Unauthorized. Please login again." }
    }

    const res = await fetch(
      `${BASE_URL}/admin/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    )

    const data = await res.json()

    if (!res.ok) {
      return { error: data.error || "Failed to update booking status" }
    }

    return {
      success: true,
      booking: data.booking,
    }
  } catch (error) {
    console.error("Update booking status action error:", error)
    return { error: "Server error while updating booking status" }
  }
}
