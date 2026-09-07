import Link from 'next/link'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import ProductGrid, { type Product } from '@/app/_components/product-grid'
import SearchBar from '@/app/_components/search-bar'
import { Button } from '@/app/_components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { db, connectDatabase } from '@/src/prisma/db'

type Props = {
  searchParams: Promise<{ q?: string }>
}

const keywords: Record<string, string[]> = {
  flores: ['FLORES', 'FLOR', 'ROSAS', 'LÍRIO', 'LAVANDA'],
  buquês: ['BUQUÊ', 'BUQUE', 'BUQUÊS'],
  arranjos: ['ARRANJO', 'ARRANJOS', 'ARRANJO TROPICAL'],
  cestas: ['CESTA', 'CESTAS', 'CESTA COM FLORES', 'CESTA ROMÂNTICA'],
  orquídeas: ['ORQUÍDEA', 'ORQUÍDEAS', 'ORQUÍDEA BRANCA'],
  girassóis: ['GIRASSOL', 'GIRASSÓIS'],
  rosas: ['ROSAS', 'ROSAS VERMELHAS', 'BUQUÊ DE ROSAS'],
  presentes: ['PRESENT', 'PRESENTES', 'PRESENTES'],
  romantico: ['ROMÂNTIC', 'ROMANTICO', 'CESTA ROMÂNTICA'],
  perfume: ['PERFUME', 'PERFUMADA', 'LAVANDA PERFUMADA'],
  tropical: ['TROPICAL', 'ARRANJO TROPICAL'],
  mix: ['MIX', 'MIX DE FLORES'],
}

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function matchesQuery(descricao: string, query: string): boolean {
  const desc = normalize(descricao)
  const q = normalize(query)

  if (desc.includes(q)) return true

  const words = q.split(/\s+/)
  return words.every((word) => desc.includes(word))
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams

  await connectDatabase()
  const allProducts = await db.orm.public.Produto.all()

  let filtered = allProducts

  if (q.trim()) {
    const query = q.trim()
    const queryLower = query.toLowerCase()
    const expandedTerms = keywords[queryLower] || []

    filtered = allProducts.filter((p) => {
      const desc = p.descricao.toUpperCase()
      if (matchesQuery(p.descricao, query)) return true
      if (expandedTerms.some((term) => desc.includes(term.toUpperCase()))) return true
      if (desc.includes(query.toUpperCase())) return true
      return false
    })
  }

  const products: Product[] = filtered.map((p) => ({
    id: p.idProduto,
    name: p.descricao,
    price: p.preco,
    originalPrice: p.precoOriginal,
    parcelas: p.parcelas ?? 1,
    image: `/produtos/${String(p.idProduto).padStart(2, '0')}.avif`,
    badge: p.precoOriginal && p.precoOriginal > p.preco ? 'Promoção' : '',
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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
            <div className="flex-1">
              <SearchBar defaultValue={q} />
            </div>
          </div>

          {q.trim() && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? 'resultado' : 'resultados'} para{' '}
                <span className="font-medium text-gray-900">&quot;{q}&quot;</span>
              </p>
            </div>
          )}

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">Nenhum produto encontrado para &quot;{q}&quot;.</p>
              <p className="mt-2 text-sm text-gray-400">
                Tente buscar por: flores, buquês, arranjos, cestas, orquídeas, rosas
              </p>
              <Link href="/" className="mt-4 inline-block">
                <Button variant="outline">Ver todos os produtos</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
