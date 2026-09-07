'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  HeartIcon,
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  parcelas: number
  image: string
  category: string
  stock: number
  barcode: number
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter()
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setFavorites(getFavorites())
    setCart(getCart())
  }, [])

  const isFavorite = favorites.includes(product.id)
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  function toggleFavorite() {
    setFavorites((prev) => {
      const newFavorites = prev.includes(product.id)
        ? prev.filter((f) => f !== product.id)
        : [...prev, product.id]
      saveFavorites(newFavorites)
      return newFavorites
    })
  }

  function addToCart() {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      let newCart
      if (existing) {
        newCart = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        newCart = [...prev, { id: product.id, quantity }]
      }
      saveCart(newCart)
      return newCart
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function buyNow() {
    addToCart()
    router.push('/carrinho')
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-700 hover:bg-purple-50 hover:text-purple-800"
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <Badge className="absolute top-4 right-4 bg-red-500 px-3 py-1 text-sm text-white">
              -{discount}%
            </Badge>
          )}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 left-4 rounded-full bg-white/80 p-2.5 transition-colors hover:bg-white"
          >
            <HeartIcon
              className={`size-6 ${isFavorite ? 'fill-purple-700 text-purple-700' : 'text-purple-700'}`}
            />
          </button>
        </div>

        <div className="flex flex-col">
          <Badge variant="secondary" className="mb-2 w-fit bg-purple-100 text-purple-700">
            {product.category}
          </Badge>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

          <div className="mt-4">
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-lg text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl font-bold text-purple-700 sm:text-4xl">
              {formatCurrency(product.price)}
            </p>
            {product.parcelas > 1 && (
              <p className="mt-1 text-sm text-gray-500">
                ou {product.parcelas}x de {formatCurrency(product.price / product.parcelas)} sem
                juros
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-gray-500">Quantidade:</span>
            <div className="flex items-center rounded-lg border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <MinusIcon className="size-4" />
              </button>
              <span className="min-w-[3rem] text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <PlusIcon className="size-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              ({product.stock} {product.stock === 1 ? 'unidade' : 'unidades'} disponível)
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`h-12 flex-1 gap-2 text-base ${
                added ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              {added ? (
                <>
                  <CheckIcon className="size-5" />
                  Adicionado!
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="size-5" />
                  Adicionar ao Carrinho
                </>
              )}
            </Button>
            <Button
              onClick={buyNow}
              disabled={product.stock === 0}
              className="h-12 flex-1 gap-2 bg-green-600 text-base text-white hover:bg-green-700"
            >
              Comprar Agora
            </Button>
          </div>

          <div className="mt-6 space-y-3 rounded-xl border bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <TruckIcon className="size-5 text-purple-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Frete grátis</p>
                <p className="text-xs text-gray-500">Acima de R$ 100,00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="size-5 text-purple-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Garantia de frescor</p>
                <p className="text-xs text-gray-500">Flores frescas por 7 dias</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Código:</span> {product.barcode}
            </p>
            <p>
              <span className="font-medium text-gray-700">Categoria:</span> {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
