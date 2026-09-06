import { redirect } from 'next/navigation'
import { auth } from '@/src/prisma/auth'
import { LoginForm } from '@/app/_components/login-form'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/admin')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  )
}
