import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data } = await supabase.auth.getUser()

  const isLoggedIn = !!data.user
  const url = req.nextUrl.pathname

  // Jika sudah login, redirect dari /login dan /register ke /dashboard
  if (isLoggedIn && (url === '/login' || url === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

// Aktifkan middleware hanya di path tertentu
export const config = {
  matcher: ['/login', '/register'],
}