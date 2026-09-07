import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import ProductDetail from '@/app/_components/product-detail'
import { db, connectDatabase } from '@/src/prisma/db'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const productId = Number(id)

  if (isNaN(productId)) notFound()

  await connectDatabase()
  const product = await db.orm.public.Produto.where({ idProduto: productId }).first()

  if (!product) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail
          product={{
            id: product.idProduto,
            name: product.descricao,
            price: product.preco,
            originalPrice: product.precoOriginal,
            parcelas: product.parcelas ?? 1,
            image: `/produtos/${String(product.idProduto).padStart(2, '0')}.avif`,
            category: product.categoria,
            stock: product.quantidade,
            barcode: Number(product.codBarras),
          }}
        />
      </main>
      <Footer />
    </div>
  )
}
