import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Badge } from '@/app/_components/ui/badge'
import { PlusIcon, PackageIcon, TagIcon, DollarSignIcon, ShoppingBagIcon } from 'lucide-react'
import { ProductTable } from '@/app/_components/admin/product-table'
import { getProducts, getCategorias } from '@/app/_lib/actions/products'

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function AdminPage() {
  const [products, categorias] = await Promise.all([getProducts(), getCategorias()])

  const totalProducts = products.length
  const totalCategories = categorias.length
  const totalStock = products.reduce((sum, p) => sum + p.quantidade, 0)
  const totalValue = products.reduce((sum, p) => sum + p.preco * p.quantidade, 0)

  const stats = [
    {
      label: 'Produtos',
      value: totalProducts,
      icon: PackageIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Categorias',
      value: totalCategories,
      icon: TagIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Em Estoque',
      value: totalStock,
      icon: ShoppingBagIcon,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Valor Total',
      value: formatCurrency(totalValue),
      icon: DollarSignIcon,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
          <p className="text-sm text-gray-500">Gerencie os produtos da floricultura</p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <PlusIcon className="mr-2 size-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`rounded-lg p-3 ${stat.bg}`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductTable products={products} />
    </div>
  )
}
