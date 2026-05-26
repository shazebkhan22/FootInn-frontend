'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

type UpdateBookingStatusResponse =
  | { success: true; booking: unknown }
  | { error: string }

/* -------------------------------------------------------
   UPDATE BOOKING STATUS
   PATCH /admin/bookings/:id/status
------------------------------------------------------- */
export async function updateBookingStatusAction(
  bookingId: number,
  status: "CONFIRMED" | "CANCELLED" | "REFUNDED"
): Promise<UpdateBookingStatusResponse> {
  try {
    const token = await getToken()

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
