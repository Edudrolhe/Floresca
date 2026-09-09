import { notFound } from 'next/navigation'
import { VendaForm } from '@/app/_components/admin/venda-form'
import { getVenda, getFuncionarios, getClientes, getFormasPagto, getProdutos } from '@/app/_lib/actions/vendas'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditVendaPage({ params }: Props) {
  const { id } = await params
  const vendaId = Number(id)

  if (isNaN(vendaId)) notFound()

  const [venda, funcionarios, clientes, formasPagto, produtos] = await Promise.all([
    getVenda(vendaId),
    getFuncionarios(),
    getClientes(),
    getFormasPagto(),
    getProdutos(),
  ])

  if (!venda) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Venda #{vendaId}</h1>
        <p className="text-sm text-gray-500">Altere os dados da venda</p>
      </div>

      <VendaForm
        initialData={{
          idVenda: venda.idVenda,
          dataVenda: venda.dataVenda?.toString() ?? '',
          produto: venda.produto,
          quantidade: venda.quantidade,
          preco: venda.preco,
          totalVenda: venda.totalVenda,
          idFormaPgto: venda.idFormaPgto,
          idFuncionario: venda.idFuncionario,
          idCliente: venda.idCliente,
        }}
        funcionarios={funcionarios}
        clientes={clientes}
        formasPagto={formasPagto}
        produtos={produtos}
      />
    </div>
  )
}
