export { auth as middleware } from '@/src/prisma/auth'

export const config = {
  matcher: ['/admin/:path*'],
}
