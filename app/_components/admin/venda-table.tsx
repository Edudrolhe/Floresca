'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { DeleteVendaDialog } from './delete-venda-dialog'
import PaymentStatusBadge from './payment-status-badge'
import { formatDate, formatCurrency } from '@/app/_lib/utils'

type Venda = {
  idVenda: number
  dataVenda: string
  produto: string
  quantidade: number
  preco: number
  totalVenda: number
  idFormaPgto: number
  idFuncionario: number | null
  idCliente: number | null
  status?: string
  dadosCliente?: string | null
  funcionarioNome?: string | null
  clienteNome?: string | null
  formaPagtoNome?: string | null
}

export function VendaTable({ vendas }: { vendas: Venda[] }) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteName, setDeleteName] = useState('')

  function handleDeleteClick(id: number, produto: string) {
    setDeleteId(id)
    setDeleteName(produto)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Qtd</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pagamento</th>
              <th className="px-4 py-3 font-medium">Vendedor</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr
                key={venda.idVenda}
                className="border-b transition-colors last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-600">#{venda.idVenda}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(venda.dataVenda)}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{venda.produto}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{venda.quantidade}</td>
                <td className="px-4 py-3 font-bold text-purple-700">
                  {formatCurrency(venda.totalVenda)}
                </td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={(venda.status as any) || 'pendente'} />
                </td>
                <td className="px-4 py-3 text-gray-600">{venda.formaPagtoNome || '-'}</td>
                <td className="px-4 py-3">
                  {venda.funcionarioNome ? (
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {venda.funcionarioNome}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {venda.clienteNome ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {venda.clienteNome}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/vendas/${venda.idVenda}/editar`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-purple-700"
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(venda.idVenda, venda.produto)}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {vendas.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                  Nenhuma venda registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <DeleteVendaDialog
          vendaId={deleteId}
          vendaProduto={deleteName}
          open={!!deleteId}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteId(null)
              setDeleteName('')
            }
          }}
        />
      )}
    </>
  )
}
