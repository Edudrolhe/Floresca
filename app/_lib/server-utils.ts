import { auth } from '@/src/prisma/auth'

export async function requireAdmin() {
  const session = await auth()
  const role = session?.user?.role
  if (role !== 'admin' && role !== 'employee') {
    throw new Error('Acesso não autorizado')
  }
  return session!
}
