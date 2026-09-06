'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { DeleteDialog } from './delete-dialog'

type Product = {
  idProduto: number
  descricao: string
  preco: number
  precoOriginal: number | null
  parcelas: number | null
  categoria: string
  quantidade: number
}

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function ProductTable({ products }: { products: Product[] }) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteName, setDeleteName] = useState('')

  function handleDeleteClick(id: number, name: string) {
    setDeleteId(id)
    setDeleteName(name)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Estoque</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.idProduto} className="border-b last:border-b-0">
                <td className="px-4 py-3 text-gray-500">{product.idProduto}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{product.descricao}</p>
                    {product.precoOriginal && (
                      <p className="text-xs text-gray-400 line-through">
                        {formatCurrency(product.precoOriginal)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{product.categoria}</Badge>
                </td>
                <td className="px-4 py-3 font-medium text-purple-700">
                  {formatCurrency(product.preco)}
                  {product.parcelas && product.parcelas > 1 && (
                    <p className="text-xs text-gray-500">em {product.parcelas}x</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={product.quantidade > 0 ? 'default' : 'destructive'}>
                    {product.quantidade}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/produtos/${product.idProduto}/editar`}>
                      <Button variant="ghost" size="icon">
                        <PencilIcon className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(product.idProduto, product.descricao)}
                    >
                      <TrashIcon className="size-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <DeleteDialog
          productId={deleteId}
          productName={deleteName}
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
