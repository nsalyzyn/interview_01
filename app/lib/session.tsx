import 'server-only'
import { cookies } from 'next/headers'
 
export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  const cookieStore = await cookies()
 
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSessionToken() : Promise<string> {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value || ''
}