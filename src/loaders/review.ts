import type { Review } from '@/types'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

/* -------------------------------------------------------
   GET TURF REVIEWS  (public)
   GET /reviews/turf/:turfId
------------------------------------------------------- */
export async function getTurfReviews(
  turfId: number
): Promise<
  | {
      success: true
      reviews: (Review & { user: { name: string } })[]
    }
  | { error: string }
> {
  try {
    const res = await fetch(`${BASE_URL}/reviews/turf/${turfId}`, {
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to fetch reviews" }

    return { success: true, reviews: json.data?.reviews ?? json.data ?? [] }
  } catch {
    return { error: "Server error while fetching reviews" }
  }
}
