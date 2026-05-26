// Shared types inferred from Prisma schema

export type Role = "USER" | "TURF_ADMIN" | "SUPER_ADMIN"

export type SportType =
  | "FOOTBALL"
  | "CRICKET"
  | "BASKETBALL"
  | "BADMINTON"
  | "TENNIS"
  | "VOLLEYBALL"
  | "OTHER"

export type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "REFUNDED"

export type BookingType = "SELF" | "GROUP" | "FULL"

export type PaymentStatus = "CREATED" | "SUCCESS" | "FAILED" | "REFUNDED"

export type PaymentProvider = "RAZORPAY" | "STRIPE" | "CASH"

export interface User {
  id: number
  name: string
  email: string
  password?: string | null
  googleId?: string | null
  role: Role
  isBanned: boolean
  resetToken?: string | null
  resetTokenExpiry?: string | null
  refreshToken?: string | null
  createdAt: string
  updatedAt: string
}

export interface Turf {
  id: number
  name: string
  location: string
  pricePerHr: number
  capacity: number
  isActive: boolean
  sports: SportType[]
  adminId: number
  createdAt: string
  updatedAt: string
}

export interface TimeSlot {
  id: number
  turfId: number
  startTime: string
  endTime: string
  priceOverride?: number | null
}

export interface Booking {
  id: number
  userId: number
  turfId: number
  timeSlotId: number
  bookingType: BookingType
  playersCount: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

export interface Review {
  id: number
  userId: number
  turfId: number
  bookingId: number
  rating: number
  comment?: string | null
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  bookingId: number
  provider: PaymentProvider
  providerOrderId: string
  providerPaymentId?: string | null
  amount: number
  currency: string
  status: PaymentStatus
  createdAt: string
  updatedAt: string
}
