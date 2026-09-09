'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MenuIcon, LogOutIcon, HomeIcon, PackageIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody } from '../ui/sheet'
import { adminSignOut } from '@/app/_lib/actions/auth'

type AdminHeaderProps = {
  userName: string | null
  userInitial: string
}

const navItems = [
  { label: 'Produtos', href: '/admin', icon: PackageIcon },
  { label: 'Vendas', href: '/admin/vendas', icon: ShoppingCartIcon },
  { label: 'Funcionários', href: '/admin/funcionarios', icon: UsersIcon },
  { label: 'Ver Loja', href: '/', icon: HomeIcon },
]

export function AdminHeader({ userName, userInitial }: AdminHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b bg-purple-700 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="text-lg font-bold text-white">
          Floresca - Admin
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-purple-600 hover:text-white">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          {userName && (
            <div className="hidden items-center gap-2 border-l border-purple-500 pl-4 md:flex">
              <div className="flex size-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                {userInitial}
              </div>
              <span className="text-sm font-medium text-white">{userName}</span>
              <form action={adminSignOut}>
                <Button variant="ghost" size="icon" type="submit" className="size-8 text-white hover:bg-purple-600 hover:text-white">
                  <LogOutIcon className="size-4" />
                </Button>
              </form>
            </div>
          )}
          <Button variant="ghost" size="icon" className="size-10 text-white hover:bg-purple-600 hover:text-white md:hidden" onClick={() => setOpen(true)}>
            <MenuIcon className="size-5" />
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader onClose={() => setOpen(false)}>
            <SheetTitle>Floresca - Admin</SheetTitle>
          </SheetHeader>
          <SheetBody className="p-0">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetBody>
          {userName && (
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                  {userInitial}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                </div>
                <form action={adminSignOut}>
                  <Button variant="ghost" size="icon" type="submit" className="size-9 text-gray-500 hover:text-red-600">
                    <LogOutIcon className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  )
}
