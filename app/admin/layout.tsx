import Link from 'next/link'
import { auth, signOut } from '@/src/prisma/auth'
import { Button } from '@/app/_components/ui/button'
import { LogOutIcon } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-lg font-bold text-purple-700">
            Floresca - Admin
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <Link href="/admin" className="text-sm text-gray-600 hover:text-purple-700">
                Produtos
              </Link>
              <Link href="/" className="text-sm text-gray-600 hover:text-purple-700">
                Ver Loja
              </Link>
            </nav>
            {session?.user && (
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm text-gray-600">{session.user.name}</span>
                <form
                  action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/' })
                  }}
                >
                  <Button variant="ghost" size="icon" type="submit" className="size-8">
                    <LogOutIcon className="size-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
