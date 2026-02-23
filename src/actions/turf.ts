'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

/* -------------------------------------------------------
   CREATE TURF
------------------------------------------------------- */

export async function createTurfAction(data: {
  name: string
  location: string
  pricePerHr: number
  capacity: number
  adminId: number
}): Promise<{ success: true; data: unknown } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const result = await res.json()
    if (!res.ok) return { error: result.message }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("createTurfAction error:", error)
    return { error: "Server error while creating turf" }
  }
}

/* -------------------------------------------------------
   UPDATE TURF
------------------------------------------------------- */

export async function updateTurfAction(
  turfId: number,
  data: {
    name?: string
    location?: string
    pricePerHr?: number
    capacity?: number
  }
): Promise<{ success: true; data: unknown } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf/${turfId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const result = await res.json()
    if (!res.ok) return { error: result.message }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("updateTurfAction error:", error)
    return { error: "Server error while updating turf" }
  }
}

/* -------------------------------------------------------
   DELETE (SOFT DELETE) TURF
------------------------------------------------------- */

export async function deleteTurfAction(
  turfId: number
): Promise<{ success: true } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf/${turfId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    const result = await res.json()
    if (!res.ok) return { error: result.message }

    return { success: true }
  } catch (error) {
    console.error("deleteTurfAction error:", error)
    return { error: "Server error while deleting turf" }
  }
}

/* -------------------------------------------------------
   ASSIGN TURF ADMIN
------------------------------------------------------- */

export async function assignTurfAdminAction(
  turfId: number,
  adminId: number
): Promise<{ success: true; data: unknown } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf/${turfId}/assign-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ adminId }),
      cache: "no-store",
    })

    const result = await res.json()
    if (!res.ok) return { error: result.message }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("assignTurfAdminAction error:", error)
    return { error: "Server error while assigning admin" }
  }
}

/* -------------------------------------------------------
   UPDATE TURF STATUS (ACTIVATE / DEACTIVATE)
------------------------------------------------------- */

export async function updateTurfStatusAction(
  turfId: number,
  isActive: boolean
): Promise<{ success: true; data: unknown } | { error: string }> {
  try {
    const token = (await cookies()).get("session_token")?.value
    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/turf/${turfId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive }),
      cache: "no-store",
    })

    const result = await res.json()
    if (!res.ok) return { error: result.message }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("updateTurfStatusAction error:", error)
    return { error: "Server error while updating turf status" }
  }
}
