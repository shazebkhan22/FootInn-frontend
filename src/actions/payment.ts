'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001"

export async function createPaymentOrderAction(
  bookingId: number
): Promise<
  | {
      success: true
      orderId: string
      amount: number
      currency: string
      paymentId: number
      key: string
    }
  | { error: string }
> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Failed to create payment order" }
    }

    return {
      success: true,
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
      paymentId: data.paymentId,
      key: data.key,
    }
  } catch (error) {
    console.error("Create payment order error:", error)
    return { error: "Server error while creating payment order" }
  }
}

export async function verifyPaymentAction(
  payload: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }
): Promise<{ success: true } | { error: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Payment verification failed" }
    }

    return { success: true }
  } catch (error) {
    console.error("Verify payment error:", error)
    return { error: "Server error while verifying payment" }
  }
}

export async function refundPaymentAction(
  bookingId: number
): Promise<{ success: true } | { error: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) return { error: "Unauthorized" }

    const res = await fetch(`${BASE_URL}/payments/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || "Refund failed" }
    }

    return { success: true }
  } catch (error) {
    console.error("Refund payment error:", error)
    return { error: "Server error while processing refund" }
  }
}
