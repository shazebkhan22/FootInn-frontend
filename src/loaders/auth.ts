import { cookies } from 'next/headers'

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) return null

  return { isAuthenticated: true }
}
