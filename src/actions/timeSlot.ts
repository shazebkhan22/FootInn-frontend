'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

/* -------------------------------------------------------
   BULK CREATE TIME SLOTS
   POST /time-slots/bulk
------------------------------------------------------- */
export async function bulkCreateTimeSlotsAction(
  turfId: number,
  slots: { startTime: string; endTime: string; priceOverride?: number }[]
): Promise<{ success: true; data: unknown } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ turfId, slots }),
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to bulk create time slots" }

    return { success: true, data: json.data }
  } catch {
    return { error: "Server error while bulk creating time slots" }
  }
}

/* -------------------------------------------------------
   CREATE TIME SLOT
   POST /time-slots
------------------------------------------------------- */
export async function createTimeSlotAction(
  turfId: number,
  startTime: string,
  endTime: string
): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const token = (await cookies()).get("session_token")?.value
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

/* -------------------------------------------------------
   UPDATE TIME SLOT
   PUT /time-slots/:id
------------------------------------------------------- */
export async function updateTimeSlotAction(
  slotId: number,
  startTime: string,
  endTime: string
): Promise<
  | { success: true; data: unknown }
  | { error: string }
> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots/${slotId}`, {
      method: "PUT",
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

/* -------------------------------------------------------
   DELETE TIME SLOT
   DELETE /time-slots/:id
------------------------------------------------------- */
export async function deleteTimeSlotAction(
  slotId: number
): Promise<{ success: true } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/time-slots/${slotId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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
