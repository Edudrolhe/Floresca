import { notFound } from 'next/navigation'
import { ProductForm } from '@/app/_components/admin/product-form'
import { getProduct, getCategorias } from '@/app/_lib/actions/products'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const productId = Number(id)

  if (isNaN(productId)) notFound()

  const [product, categorias] = await Promise.all([getProduct(productId), getCategorias()])

  if (!product) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Produto</h1>
        <p className="text-sm text-gray-500">Altere os dados do produto</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <ProductForm
          initialData={{
            idProduto: product.idProduto,
            descricao: String(product.descricao),
            preco: Number(product.preco),
            precoOriginal: product.precoOriginal != null ? Number(product.precoOriginal) : null,
            parcelas: product.parcelas != null ? Number(product.parcelas) : null,
            categoria: String(product.categoria),
            quantidade: Number(product.quantidade),
            codBarras: Number(product.codBarras),
            idCategoria: product.idCategoria != null ? Number(product.idCategoria) : null,
          }}
          categorias={categorias.map((c) => ({
            idCategoria: Number(c.idCategoria),
            categoria: String(c.categoria),
          }))}
        />
      </div>
    </div>
  )
}
