'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/pesquisa?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="Pesquisar flores, buquês, arranjos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 text-black"
      />
      <Button type="submit" className="shrink-0">
        <SearchIcon className="size-4" />
      </Button>
    </form>
  )
}
