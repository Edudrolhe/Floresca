import Link from 'next/link'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import ProductGrid, { type Product } from '@/app/_components/product-grid'
import { Button } from '@/app/_components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { db, connectDatabase } from '@/src/prisma/db'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const categoryName = decodeURIComponent(slug)

  await connectDatabase()
  const allProducts = await db.orm.public.Produto.all()

  const products: Product[] = allProducts
    .filter((p) => p.categoria.toUpperCase() === categoryName.toUpperCase())
    .map((p) => ({
      id: p.idProduto,
      name: p.descricao,
      price: p.preco,
      originalPrice: p.precoOriginal,
      parcelas: p.parcelas ?? 1,
      image: `/produtos/${String(p.idProduto).padStart(2, '0')}.avif`,
      badge: p.precoOriginal && p.precoOriginal > p.preco ? 'Promoção' : '',
    }))

  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              >
                <ArrowLeftIcon className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? 'produto' : 'produtos'} encontrado
                {products.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
              <Link href="/" className="mt-4 inline-block">
                <Button variant="outline">Ver todos os produtos</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
