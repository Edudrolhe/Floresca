'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Estoque</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.idProduto}
                className="border-b transition-colors last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={`/produtos/${String(product.idProduto).padStart(2, '0')}.avif`}
                        alt={product.descricao}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.descricao}</p>
                      {product.precoOriginal && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.precoOriginal)}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {product.categoria}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-purple-700">{formatCurrency(product.preco)}</p>
                  {product.parcelas && product.parcelas > 1 && (
                    <p className="text-xs text-gray-500">em {product.parcelas}x</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={product.quantidade > 0 ? 'default' : 'destructive'}
                    className={product.quantidade > 0 ? 'bg-green-100 text-green-700' : ''}
                  >
                    {product.quantidade} un.
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/produtos/${product.idProduto}/editar`}>
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
                      onClick={() => handleDeleteClick(product.idProduto, product.descricao)}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
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
