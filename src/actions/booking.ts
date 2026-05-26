"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Booking } from "@/types"

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   CREATE BOOKING
   POST /bookings
------------------------------------------------------- */
export async function createBookingAction(data: {
  turfId: number
  timeSlotId: number
  bookingType: "SELF" | "GROUP" | "FULL"
  playersCount: number
}): Promise<{ success: true; booking: Booking } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to create booking" }

    return { success: true, booking: json.data.booking }
  } catch {
    return { error: "Server error while creating booking" }
  }
}

/* -------------------------------------------------------
   CANCEL BOOKING
   PATCH /bookings/:id/cancel
------------------------------------------------------- */
export async function cancelBookingAction(
  bookingId: number
): Promise<{ success: true; booking: Booking } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to cancel booking" }

    return { success: true, booking: json.data.booking }
  } catch {
    return { error: "Server error while cancelling booking" }
  }
}
