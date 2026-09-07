'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ShoppingCartIcon } from 'lucide-react'

function getCartCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const stored = localStorage.getItem('floresca-cart')
    if (!stored) return 0
    const cart = JSON.parse(stored)
    return cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
  } catch {
    return 0
  }
}

export default function CartButton() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(getCartCount())

    const interval = setInterval(() => {
      setCount(getCartCount())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Link href="/carrinho">
      <Button variant="ghost" size="icon" className="relative shrink-0">
        <ShoppingCartIcon className="size-5 text-purple-700" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-purple-700 text-[10px] text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </Button>
    </Link>
  )
}
