import Link from 'next/link'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { PlusIcon, UsersIcon } from 'lucide-react'
import { FuncionarioTable } from '@/app/_components/admin/funcionario-table'
import { getFuncionarios } from '@/app/_lib/actions/funcionarios'

export default async function FuncionariosPage() {
  const funcionarios = await getFuncionarios()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funcionários</h1>
          <p className="text-sm text-gray-500">Gerencie os funcionários da floricultura</p>
        </div>
        <Link href="/admin/funcionarios/novo">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <PlusIcon className="mr-2 size-4" />
            Novo Funcionário
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="rounded-lg bg-purple-50 p-3">
            <UsersIcon className="size-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Funcionários</p>
            <p className="text-xl font-bold text-gray-900">{funcionarios.length}</p>
          </div>
        </CardContent>
      </Card>

      <FuncionarioTable funcionarios={funcionarios.map((f: any) => ({
        ...f,
        dataAdmissao: f.dataAdmissao?.toString() ?? null,
      }))} />
    </div>
  )
}
