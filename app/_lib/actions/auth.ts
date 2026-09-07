'use server'

import { signOut } from '@/src/prisma/auth'

export async function handleSignOut() {
  await signOut({ redirectTo: '/' })
}
