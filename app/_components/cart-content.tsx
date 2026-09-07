'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  ArrowLeftIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  parcelas: number
  image: string
}

type CartItem = {
  id: number
  quantity: number
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('floresca-cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem('floresca-cart', JSON.stringify(cart))
}

export default function CartContent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedCart = getCart()
    setCart(savedCart)

    fetch('/api/produtos')
      .then((res) => res.json())
      .then((allProducts: Product[]) => {
        setProducts(allProducts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function getProduct(id: number) {
    return products.find((p) => p.id === id)
  }

  function updateQuantity(id: number, delta: number) {
    setCart((prev) => {
      const newCart = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
      saveCart(newCart)
      return newCart
    })
  }

  function removeItem(id: number) {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id)
      saveCart(newCart)
      return newCart
    })
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.id)
      return sum + (product?.price ?? 0) * item.quantity
    }, 0)
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const subtotal = getSubtotal()
  const shipping = subtotal >= 100 ? 0 : 15
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <p className="text-gray-500">Carregando carrinho...</p>
        </div>
      </div>
    )
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Carrinho</h1>
          <p className="text-sm text-gray-500">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-12 text-center">
          <ShoppingBagIcon className="mx-auto size-12 text-gray-300" />
          <p className="mt-4 text-gray-500">Seu carrinho está vazio.</p>
          <Link href="/" className="mt-4 inline-block">
            <Button variant="outline">Ver produtos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => {
              const product = getProduct(item.id)
              if (!product) return null
              return (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link href={`/produto/${product.id}`} className="shrink-0">
                        <div className="relative size-20 overflow-hidden rounded-lg bg-gray-100 sm:size-24">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/produto/${product.id}`}>
                            <h3 className="font-medium text-gray-900 hover:text-purple-700">
                              {product.name}
                            </h3>
                          </Link>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-xs text-gray-400 line-through">
                              {formatCurrency(product.originalPrice)}
                            </p>
                          )}
                          <p className="text-sm font-bold text-purple-700">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-lg border p-1 hover:bg-gray-100"
                            >
                              <MinusIcon className="size-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-lg border p-1 hover:bg-gray-100"
                            >
                              <PlusIcon className="size-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-gray-900">
                              {formatCurrency(product.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <TrashIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Resumo do Pedido</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({getTotalItems()} itens)</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frete</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Frete grátis para compras acima de R$ 100,00
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-base font-bold text-purple-700">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="mt-6 w-full gap-2 bg-purple-700 hover:bg-purple-800" size="lg">
                  <CreditCardIcon className="size-5" />
                  Finalizar Pedido
                </Button>

                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="size-4 text-purple-700" />
                    <span>Entrega em até 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="size-4 text-purple-700" />
                    <span>Compra 100% segura</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
