'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

export async function createTimeSlotAction(
  turfId: number,
  startTime: string,
  endTime: string
): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ turfId, startTime, endTime }),
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Failed to create time slot" }
    }

    return { success: true, data: data.data }
  } catch (error) {
    console.error("Create time slot error:", error)
    return { error: "Server error while creating time slot" }
  }
}

export async function updateTimeSlotAction(
  slotId: number,
  startTime: string,
  endTime: string
): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots/${slotId}`, {
      method: "PUT", // change to PATCH if your backend uses PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ startTime, endTime }),
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Failed to update time slot" }
    }

    return { success: true, data: data.data }
  } catch (error) {
    console.error("Update time slot error:", error)
    return { error: "Server error while updating time slot" }
  }
}

export async function deleteTimeSlotAction(
  slotId: number
): Promise<{ success: true } | { error: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots/${slotId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Failed to delete time slot" }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete time slot error:", error)
    return { error: "Server error while deleting time slot" }
  }
}
