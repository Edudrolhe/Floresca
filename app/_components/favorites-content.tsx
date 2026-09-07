'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductGrid, { type Product } from '@/app/_components/product-grid'
import { Button } from '@/app/_components/ui/button'
import { ArrowLeftIcon, HeartIcon } from 'lucide-react'

function getFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('floresca-favorites')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function FavoritesContent() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ids = getFavorites()
    setFavoriteIds(ids)

    fetch('/api/produtos')
      .then((res) => res.json())
      .then((allProducts: Product[]) => {
        const filtered = allProducts.filter((p) => ids.includes(p.id))
        setProducts(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
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
          <h1 className="text-2xl font-bold text-gray-900">Favoritos</h1>
          <p className="text-sm text-gray-500">
            {favoriteIds.length} {favoriteIds.length === 1 ? 'produto' : 'produtos'} favoritado
            {favoriteIds.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="py-12 text-center">
          <HeartIcon className="mx-auto size-12 text-gray-300" />
          <p className="mt-4 text-gray-500">Nenhum produto favoritado ainda.</p>
          <p className="mt-1 text-sm text-gray-400">
            Clique no coração dos produtos para adicioná-los aos favoritos.
          </p>
          <Link href="/" className="mt-4 inline-block">
            <Button variant="outline">Ver produtos</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
