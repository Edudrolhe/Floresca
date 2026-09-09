import { VendaForm } from '@/app/_components/admin/venda-form'
import { getFuncionarios, getClientes, getFormasPagto, getProdutos } from '@/app/_lib/actions/vendas'

export default async function NovaVendaPage() {
  const [funcionarios, clientes, formasPagto, produtos] = await Promise.all([
    getFuncionarios(),
    getClientes(),
    getFormasPagto(),
    getProdutos(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nova Venda</h1>
        <p className="text-sm text-gray-500">Registre uma nova venda</p>
      </div>

      <VendaForm
        funcionarios={funcionarios}
        clientes={clientes}
        formasPagto={formasPagto}
        produtos={produtos}
      />
    </div>
  )
}
