'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon, ShoppingCartIcon, CheckIcon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  parcelas: number
  image: string
  badge: string
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function getInstallmentText(price: number, parcelas: number) {
  if (parcelas <= 1) return ''
  const installmentValue = price / parcelas
  return `${parcelas}x de ${formatCurrency(installmentValue)} sem juros`
}

function getFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('floresca-favorites')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveFavorites(favorites: number[]) {
  localStorage.setItem('floresca-favorites', JSON.stringify(favorites))
}

function getCart(): { id: number; quantity: number }[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('floresca-cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(cart: { id: number; quantity: number }[]) {
  localStorage.setItem('floresca-cart', JSON.stringify(cart))
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])
  const [addedId, setAddedId] = useState<number | null>(null)

  useEffect(() => {
    setFavorites(getFavorites())
    setCart(getCart())
  }, [])

  function toggleFavorite(e: React.MouseEvent, id: number) {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => {
      const newFavorites = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      saveFavorites(newFavorites)
      return newFavorites
    })
  }

  function addToCart(e: React.MouseEvent, id: number) {
    e.preventDefault()
    e.stopPropagation()
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      let newCart
      if (existing) {
        newCart = prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newCart = [...prev, { id, quantity: 1 }]
      }
      saveCart(newCart)
      return newCart
    })
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1500)
  }

  function isInCart(id: number) {
    return cart.some((item) => item.id === id)
  }

  return (
    <section className="mt-6 sm:mt-8">
      <h3 className="font-bold text-black sm:text-xl">Produtos</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const isFavorite = favorites.includes(product.id)
          const inCart = isInCart(product.id)
          const justAdded = addedId === product.id
          return (
            <Link key={product.id} href={`/produto/${product.id}`}>
              <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover"
                    />
                    <button
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className="absolute top-1 left-1 rounded-full bg-white/80 p-1 transition-colors hover:bg-white sm:top-2 sm:left-2 sm:p-1.5"
                    >
                      <HeartIcon
                        className={`size-4 sm:size-5 ${
                          isFavorite ? 'fill-purple-700 text-purple-700' : 'text-purple-700'
                        }`}
                      />
                    </button>
                    {product.badge && (
                      <Badge className="absolute top-1 right-1 text-[10px] text-white sm:top-2 sm:right-2 sm:text-xs">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-center text-xs font-medium sm:text-sm">{product.name}</p>
                    {product.originalPrice && (
                      <p className="text-center text-xs text-gray-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    )}
                    <p className="text-center text-xs font-bold text-purple-700 sm:text-sm">
                      Por {formatCurrency(product.price)}
                    </p>
                    {getInstallmentText(product.price, product.parcelas) && (
                      <p className="text-center text-[10px] text-gray-500 sm:text-xs">
                        em até {getInstallmentText(product.price, product.parcelas)}
                      </p>
                    )}
                    <div className="mt-2">
                      <Button
                        onClick={(e) => addToCart(e, product.id)}
                        className={`w-full gap-1.5 text-xs sm:text-sm ${
                          justAdded
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-purple-700 hover:bg-purple-800'
                        }`}
                        size="sm"
                      >
                        {justAdded ? (
                          <>
                            <CheckIcon className="size-3.5 sm:size-4" />
                            Adicionado!
                          </>
                        ) : inCart ? (
                          <>
                            <ShoppingCartIcon className="size-3.5 sm:size-4" />
                            No Carrinho
                          </>
                        ) : (
                          <>
                            <ShoppingCartIcon className="size-3.5 sm:size-4" />
                            Adicionar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
