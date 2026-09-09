'use server'

import { signOut } from '@/src/prisma/auth'

export async function adminSignOut() {
  await signOut({ redirectTo: '/' })
}
