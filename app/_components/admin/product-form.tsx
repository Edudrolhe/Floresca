'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent } from '../ui/card'
import { UploadIcon, XIcon, ImageIcon } from 'lucide-react'
import {
  createProduct,
  updateProduct,
  uploadProductImage,
  type ProductInput,
} from '@/app/_lib/actions/products'

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState(initialData?.descricao ?? '')
  const [preco, setPreco] = useState(initialData?.preco?.toString() ?? '')
  const [precoOriginal, setPrecoOriginal] = useState(initialData?.precoOriginal?.toString() ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.idProduto
      ? `/produtos/${String(initialData.idProduto).padStart(2, '0')}.avif`
      : null
  )

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const discount =
    precoOriginal && preco && Number(precoOriginal) > Number(preco)
      ? Math.round(((Number(precoOriginal) - Number(preco)) / Number(precoOriginal)) * 100)
      : 0

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem válido.')
      return
    }

    setImageFile(file)
    const preview = URL.createObjectURL(file)
    setImagePreview(preview)
    setError('')
  }

  function handleRemoveImage() {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
      let productId: number

      if (initialData) {
        await updateProduct(initialData.idProduto, data)
        productId = initialData.idProduto
      } else {
        const result = await createProduct(data)
        productId = result
      }

      if (imageFile && productId) {
        await uploadProductImage(productId, imageFile)
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Erro ao salvar produto. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
                Informações Básicas
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="descricao" className="text-sm font-medium">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="descricao"
                    name="descricao"
                    required
                    defaultValue={initialData?.descricao}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Buquê de Rosas Vermelhas"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria" className="text-sm font-medium">
                    Categoria *
                  </Label>
                  <Input
                    id="categoria"
                    name="categoria"
                    required
                    defaultValue={initialData?.categoria}
                    placeholder="Ex: FLORES"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idCategoria" className="text-sm font-medium">
                    Tipo de Produto
                  </Label>
                  <select
                    id="idCategoria"
                    name="idCategoria"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
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
                  <Label htmlFor="codBarras" className="text-sm font-medium">
                    Código de Barras *
                  </Label>
                  <Input
                    id="codBarras"
                    name="codBarras"
                    type="number"
                    required
                    defaultValue={initialData?.codBarras}
                    placeholder="0000000000000"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantidade" className="text-sm font-medium">
                    Estoque *
                  </Label>
                  <Input
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    min="0"
                    required
                    defaultValue={initialData?.quantidade}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">Preços</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="preco" className="text-sm font-medium">
                    Preço Atual (R$) *
                  </Label>
                  <Input
                    id="preco"
                    name="preco"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    defaultValue={initialData?.preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="0,00"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precoOriginal" className="text-sm font-medium">
                    Preço Original (R$)
                  </Label>
                  <Input
                    id="precoOriginal"
                    name="precoOriginal"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={initialData?.precoOriginal ?? ''}
                    onChange={(e) => setPrecoOriginal(e.target.value)}
                    placeholder="0,00"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parcelas" className="text-sm font-medium">
                    Parcelas
                  </Label>
                  <Input
                    id="parcelas"
                    name="parcelas"
                    type="number"
                    min="1"
                    defaultValue={initialData?.parcelas ?? 1}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
                Imagem do Produto
              </h3>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-lg border bg-gray-50">
                  <div className="relative aspect-square">
                    <Image
                      src={imagePreview}
                      alt={name || 'Produto'}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 p-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadIcon className="mr-1 size-4" />
                      Trocar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={handleRemoveImage}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-purple-400 hover:bg-purple-50"
                >
                  <div className="rounded-full bg-purple-100 p-3">
                    <ImageIcon className="size-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Clique para adicionar imagem
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG, WebP ou AVIF</p>
                  </div>
                </button>
              )}

              <div className="mt-4 overflow-hidden rounded-lg border bg-gray-50">
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-500">Pré-visualização</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {name || 'Nome do produto'}
                  </p>
                  {discount > 0 && precoOriginal && (
                    <p className="text-xs text-gray-400 line-through">
                      {formatCurrency(Number(precoOriginal))}
                    </p>
                  )}
                  <p className="text-sm font-bold text-purple-700">
                    {preco ? `Por ${formatCurrency(Number(preco))}` : 'R$ 0,00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="h-10 bg-purple-700 hover:bg-purple-800"
            >
              {loading ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Criar Produto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
              className="h-10"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
