'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:5001";

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    })

    const responseJson = await res.json()

    if (!res.ok || responseJson.status !== 'success') {
      return { error: responseJson.error || 'Login failed' }
    }

    const token = responseJson.token
    const userRole = responseJson.data?.user?.role?.toLowerCase()

    if (!token) return { error: "No token received from server." }

    await setAuthCookies(token, userRole)

    return { success: true, role: userRole }
  } catch (error) {
    return { error: "Connection failed. Is the backend running?" }
  }
}

// --- SIGNUP ACTION ---
export async function signupAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      cache: 'no-store'
    })

    const responseJson = await res.json()

    if (!res.ok || responseJson.status !== 'success') {
      return { error: responseJson.error || 'Registration failed' }
    }

    const token = responseJson.token
    const userRole = responseJson.data?.user?.role?.toLowerCase() || 'user'

    if (!token) return { error: "No token received from server." }

    await setAuthCookies(token, userRole)

    return { success: true, role: userRole }
  } catch (error) {
    return { error: "Connection failed. Is the backend running?" }
  }
}

// --- HELPER: Set Cookies ---
async function setAuthCookies(token: string, role: string) {
  const cookieStore = await cookies()
  
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  cookieStore.set('user_role', role, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function logoutAction() {
  const cookieStore = await cookies()
  
  cookieStore.delete('session_token')
  cookieStore.delete('user_role')
  
  redirect('/login')
}