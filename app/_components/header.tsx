import {
  MenuIcon,
  TruckIcon,
  HeartIcon,
  ShoppingCartIcon,
  LogInIcon,
  LogOutIcon,
  ShieldIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { auth, signOut } from '@/src/prisma/auth'

const Header = async () => {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Image
          src="/Logo.png"
          alt="Floresca Floricultura"
          width={400}
          height={100}
          priority
          className="h-auto w-32 sm:w-48 md:w-64 lg:w-80"
        />
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="hidden gap-1.5 text-xs sm:flex">
            <TruckIcon className="size-4 text-purple-700" />
            <span className="hidden text-black md:inline">Acompanhar Pedido</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <HeartIcon className="size-5 text-purple-700" />
          </Button>
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <ShoppingCartIcon className="size-5 text-purple-700" />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-purple-700 text-[10px] text-white">
              0
            </span>
          </Button>

          {session ? (
            <>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ShieldIcon className="size-5 text-purple-700" />
                </Button>
              </Link>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <Button variant="ghost" size="icon" type="submit" className="shrink-0">
                  <LogOutIcon className="size-5 text-purple-700" />
                </Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="shrink-0">
                <LogInIcon className="size-5 text-purple-700" />
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="shrink-0">
            <MenuIcon className="size-5 text-purple-700 sm:size-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
