import Link from 'next/link'
import { auth } from '@/src/prisma/auth'
import { Button } from '@/app/_components/ui/button'
import { ShieldOffIcon } from 'lucide-react'

export default async function AdminAccessDenied() {
  const session = await auth()
  const userRole = session?.user?.role

  if (userRole === 'admin' || userRole === 'employee') {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ShieldOffIcon className="mb-4 size-16 text-gray-300" />
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Acesso Restrito</h1>
      <p className="mb-6 max-w-md text-gray-500">
        Esta área é exclusiva para funcionários e administradores da floricultura.
      </p>
      <Link href="/">
        <Button className="bg-purple-700 hover:bg-purple-800">Voltar para a Loja</Button>
      </Link>
    </div>
  )
}
