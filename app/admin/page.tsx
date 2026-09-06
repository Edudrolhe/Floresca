import Link from 'next/link'
import { Button } from '@/app/_components/ui/button'
import { PlusIcon } from 'lucide-react'
import { ProductTable } from '@/app/_components/admin/product-table'
import { getProducts } from '@/app/_lib/actions/products'

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500">Gerencie os produtos da floricultura</p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  )
}
