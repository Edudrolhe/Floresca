import Link from 'next/link'
import { auth, signOut } from '@/src/prisma/auth'
import { Button } from '@/app/_components/ui/button'
import { LogOutIcon, HomeIcon } from 'lucide-react'
import AdminAccessDenied from './access-denied'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const userRole = (session?.user as any)?.role
  const isAdmin = userRole === 'admin' || userRole === 'employee'

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <AdminAccessDenied />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-purple-700 shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="text-lg font-bold text-white">
            Floresca - Admin
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-purple-600 hover:text-white"
                >
                  Produtos
                </Button>
              </Link>
              <Link href="/admin/funcionarios">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-purple-600 hover:text-white"
                >
                  Funcionários
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-purple-600 hover:text-white"
                >
                  <HomeIcon className="mr-1 size-4" />
                  Ver Loja
                </Button>
              </Link>
            </nav>
            {session?.user && (
              <div className="flex items-center gap-2 border-l border-purple-500 pl-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white">{session.user.name}</span>
                <form
                  action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/' })
                  }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    type="submit"
                    className="size-8 text-white hover:bg-purple-600 hover:text-white"
                  >
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
