'use client'

import { Button } from './ui/button'
import { LogOutIcon } from 'lucide-react'
import { handleSignOut } from '@/app/_lib/actions/auth'

export default function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <Button variant="ghost" size="icon" type="submit" className="shrink-0">
        <LogOutIcon className="size-5 text-purple-700" />
      </Button>
    </form>
  )
}
