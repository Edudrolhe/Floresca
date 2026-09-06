import { ProductForm } from '@/app/_components/admin/product-form'
import { getCategorias } from '@/app/_lib/actions/products'

export default async function NewProductPage() {
  const categorias = await getCategorias()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Novo Produto</h1>
        <p className="text-sm text-gray-500">Preencha os dados para criar um novo produto</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <ProductForm
          categorias={categorias.map((c) => ({
            idCategoria: Number(c.idCategoria),
            categoria: String(c.categoria),
          }))}
        />
      </div>
    </div>
  )
}
