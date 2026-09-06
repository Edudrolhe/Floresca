'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { createProduct, updateProduct, type ProductInput } from '@/app/_lib/actions/products'

type Category = {
  idCategoria: number
  categoria: string
}

type ProductFormProps = {
  initialData?: {
    idProduto: number
    descricao: string
    preco: number
    precoOriginal: number | null
    parcelas: number | null
    categoria: string
    quantidade: number
    codBarras: number
    idCategoria: number | null
  }
  categorias: Category[]
}

export function ProductForm({ initialData, categorias }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    const data: ProductInput = {
      descricao: formData.get('descricao') as string,
      preco: Number(formData.get('preco')),
      precoOriginal: formData.get('precoOriginal') ? Number(formData.get('precoOriginal')) : null,
      parcelas: formData.get('parcelas') ? Number(formData.get('parcelas')) : 1,
      categoria: formData.get('categoria') as string,
      quantidade: Number(formData.get('quantidade')),
      codBarras: Number(formData.get('codBarras')),
      idCategoria: formData.get('idCategoria') ? Number(formData.get('idCategoria')) : null,
    }

    try {
      if (initialData) {
        await updateProduct(initialData.idProduto, data)
      } else {
        await createProduct(data)
      }
    } catch {
      setError('Erro ao salvar produto. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="descricao">Nome do Produto *</Label>
          <Input id="descricao" name="descricao" required defaultValue={initialData?.descricao} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria *</Label>
          <Input id="categoria" name="categoria" required defaultValue={initialData?.categoria} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idCategoria">Tipo de Produto</Label>
          <select
            id="idCategoria"
            name="idCategoria"
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
            defaultValue={initialData?.idCategoria ?? ''}
          >
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preco">Preço (R$) *</Label>
          <Input
            id="preco"
            name="preco"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={initialData?.preco}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="precoOriginal">Preço Original (R$)</Label>
          <Input
            id="precoOriginal"
            name="precoOriginal"
            type="number"
            step="0.01"
            min="0"
            defaultValue={initialData?.precoOriginal ?? ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="parcelas">Parcelas</Label>
          <Input
            id="parcelas"
            name="parcelas"
            type="number"
            min="1"
            defaultValue={initialData?.parcelas ?? 1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantidade">Quantidade (Estoque) *</Label>
          <Input
            id="quantidade"
            name="quantidade"
            type="number"
            min="0"
            required
            defaultValue={initialData?.quantidade}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codBarras">Código de Barras *</Label>
          <Input
            id="codBarras"
            name="codBarras"
            type="number"
            required
            defaultValue={initialData?.codBarras}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Criar Produto'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
