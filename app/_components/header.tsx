'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { MenuIcon, TruckIcon, LogInIcon, ShieldIcon, HeartIcon, ShoppingCartIcon, LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody } from './ui/sheet'
import { adminSignOut } from '@/app/_lib/actions/auth'

const categories = [
  { name: 'Arranjos', slug: 'ARRANJOS', icon: '/svg/arranjo.svg' },
  { name: 'Bouquets', slug: 'BUQUÊS', icon: '/svg/bouquet.svg' },
  { name: 'Cestas', slug: 'CESTAS', icon: '/svg/cesta.svg' },
  { name: 'Girassóis', slug: 'GIRASSÓIS', icon: '/svg/girassol.svg' },
  { name: 'Mix', slug: 'MIX', icon: '/svg/mix.svg' },
  { name: 'Orquídeas', slug: 'ORQUÍDEAS', icon: '/svg/orquidia.svg' },
  { name: 'Ramos', slug: 'RAMOS', icon: '/svg/ramo.svg' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const isLoggedIn = !!session

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

        {/* Desktop only */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="hidden gap-1.5 text-xs lg:flex">
            <TruckIcon className="size-4 text-purple-700" />
            <span className="text-black">Acompanhar Pedido</span>
          </Button>

          <Link href="/favoritos">
            <Button variant="ghost" size="icon" className="shrink-0">
              <HeartIcon className="size-5 text-purple-700" />
            </Button>
          </Link>

          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ShoppingCartIcon className="size-5 text-purple-700" />
            </Button>
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ShieldIcon className="size-5 text-purple-700" />
                </Button>
              </Link>
              <form action={adminSignOut}>
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
        </div>

        {/* Mobile: only hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="size-6 text-purple-700" />
        </Button>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader onClose={() => setOpen(false)}>
            <SheetTitle>
              <Image
                src="/Logo.png"
                alt="Floresca Floricultura"
                width={200}
                height={50}
                className="h-auto w-32"
              />
            </SheetTitle>
          </SheetHeader>
          <SheetBody className="p-0">
            {/* Categorias */}
            <div className="border-b">
              <p className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-gray-400">
                Categorias
              </p>
              <nav className="flex flex-col">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <Image src={cat.icon} alt={cat.name} width={20} height={20} />
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Links */}
            <nav className="flex flex-col">
              <Link
                href="/favoritos"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <HeartIcon className="size-5" />
                Favoritos
              </Link>
              <Link
                href="/carrinho"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <ShoppingCartIcon className="size-5" />
                Carrinho
              </Link>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <TruckIcon className="size-5" />
                Acompanhar Pedido
              </Link>
            </nav>
          </SheetBody>

          {/* Footer */}
          <div className="border-t p-4">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link href="/admin" onClick={() => setOpen(false)}>
                  <Button className="w-full justify-start gap-2 bg-purple-700 text-white hover:bg-purple-800">
                    <ShieldIcon className="size-4" />
                    Painel Admin
                  </Button>
                </Link>
                <form action={adminSignOut}>
                  <Button variant="destructive" type="submit" className="w-full">
                    <LogOutIcon className="mr-2 size-4" />
                    Sair
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full bg-purple-700 hover:bg-purple-800">
                  <LogInIcon className="mr-2 size-4" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
