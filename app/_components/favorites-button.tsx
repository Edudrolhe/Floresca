'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'

function getFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('floresca-favorites')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function FavoritesButton() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(getFavorites().length)

    function handleStorage() {
      setCount(getFavorites().length)
    }

    window.addEventListener('storage', handleStorage)
    const interval = setInterval(() => {
      setCount(getFavorites().length)
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [])

  return (
    <Link href="/favoritos">
      <Button variant="ghost" size="icon" className="relative shrink-0">
        <HeartIcon className="size-5 text-purple-700" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-purple-700 text-[10px] text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </Button>
    </Link>
  )
}
