'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Review } from '@/types'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

async function getToken() {
  const token = (await cookies()).get("session_token")?.value
  if (!token) redirect("/login")
  return token
}

/* -------------------------------------------------------
   CREATE REVIEW
   POST /reviews
------------------------------------------------------- */
export async function createReviewAction(data: {
  turfId: number
  bookingId: number
  rating: number
  comment?: string
}): Promise<{ success: true; review: Review } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to create review" }

    return { success: true, review: json.data?.review ?? json.data }
  } catch {
    return { error: "Server error while creating review" }
  }
}

/* -------------------------------------------------------
   UPDATE REVIEW
   PUT /reviews/:id
------------------------------------------------------- */
export async function updateReviewAction(
  reviewId: number,
  data: { rating?: number; comment?: string }
): Promise<{ success: true; review: Review } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to update review" }

    return { success: true, review: json.data?.review ?? json.data }
  } catch {
    return { error: "Server error while updating review" }
  }
}

/* -------------------------------------------------------
   DELETE REVIEW
   DELETE /reviews/:id
------------------------------------------------------- */
export async function deleteReviewAction(
  reviewId: number
): Promise<{ success: true } | { error: string }> {
  try {
    const token = await getToken()

    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })

    const json = await res.json()
    if (!res.ok) return { error: json.message || "Failed to delete review" }

    return { success: true }
  } catch {
    return { error: "Server error while deleting review" }
  }
}
