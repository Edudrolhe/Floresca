import { MenuIcon, TruckIcon, LogInIcon, ShieldIcon } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/src/prisma/auth'
import FavoritesButton from './favorites-button'
import CartButton from './cart-button'
import SignOutButton from './sign-out-button'

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
          <FavoritesButton />
          <CartButton />

          {session ? (
            <>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ShieldIcon className="size-5 text-purple-700" />
                </Button>
              </Link>
              <SignOutButton />
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
