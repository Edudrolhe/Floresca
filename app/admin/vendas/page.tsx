import Link from 'next/link'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { PlusIcon, ShoppingCartIcon } from 'lucide-react'
import { VendaTable } from '@/app/_components/admin/venda-table'
import { getVendas, getFuncionarios, getClientes, getFormasPagto } from '@/app/_lib/actions/vendas'

export default async function VendasPage() {
  const [vendasRaw, funcionarios, clientes, formasPagto] = await Promise.all([
    getVendas(),
    getFuncionarios(),
    getClientes(),
    getFormasPagto(),
  ])

  const vendas = vendasRaw.map((v: any) => ({
    ...v,
    funcionarioNome: v.idFuncionario
      ? funcionarios.find((f: any) => f.idFuncionario === v.idFuncionario)?.nome || null
      : null,
    clienteNome: v.idCliente
      ? clientes.find((c: any) => c.idCliente === v.idCliente)?.nome || null
      : null,
    formaPagtoNome: formasPagto.find((f: any) => f.idFormaPgto === v.idFormaPgto)?.descricao || null,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
          <p className="text-sm text-gray-500">Gerencie as vendas da floricultura</p>
        </div>
        <Link href="/admin/vendas/novo">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <PlusIcon className="mr-2 size-4" />
            Nova Venda
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="rounded-lg bg-purple-50 p-3">
            <ShoppingCartIcon className="size-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Vendas</p>
            <p className="text-xl font-bold text-gray-900">{vendas.length}</p>
          </div>
        </CardContent>
      </Card>

      <VendaTable vendas={vendas} />
    </div>
  )
}
