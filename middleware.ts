import { NextResponse } from 'next/server'
import { auth } from '@/src/prisma/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role
  const isAdmin = userRole === 'admin' || userRole === 'employee'

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
