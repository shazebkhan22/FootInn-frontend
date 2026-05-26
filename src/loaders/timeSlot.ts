import type { TimeSlot } from '@/types'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

/* -------------------------------------------------------
   GET SLOTS BY TURF  (public)
   GET /time-slots/turf/:turfId
------------------------------------------------------- */
export async function getSlotsByTurf(
  turfId: number
): Promise<{ success: true; slots: TimeSlot[] } | { error: string }> {
  try {
    const res = await fetch(`${BASE_URL}/time-slots/turf/${turfId}`, {
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch time slots" }

    return { success: true, slots: json.data?.slots ?? json.data ?? [] }
  } catch {
    return { error: "Server error while fetching time slots" }
  }
}
