import { auth } from '@/src/prisma/auth'
import { AdminHeader } from '@/app/_components/admin/admin-header'
import AdminAccessDenied from './access-denied'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const userRole = session?.user?.role
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
      <AdminHeader
        userName={session?.user?.name ?? null}
        userInitial={session?.user?.name?.charAt(0).toUpperCase() ?? '?'}
      />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
