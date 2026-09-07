import Header from './_components/header'
import Footer from './_components/footer'
import BannerCarousel from './_components/banner-carousel'
import CategoryBar from './_components/category-bar'
import ProductGrid, { type Product } from './_components/product-grid'
import SearchBar from './_components/search-bar'
import { db, connectDatabase } from '@/src/prisma/db'
import { auth } from '@/src/prisma/auth'

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]
const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function formatDate(date: Date) {
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const weekday = weekdays[date.getDay()]
  return `${weekday}, ${day} de ${month} de ${year}`
}

export default async function Home() {
  const session = await auth()
  await connectDatabase()
  const produtos = await db.orm.public.Produto.all()
  const products: Product[] = produtos.map((p) => ({
    id: p.idProduto,
    name: p.descricao,
    price: p.preco,
    originalPrice: p.precoOriginal,
    parcelas: p.parcelas ?? 1,
    image: `/produtos/${String(p.idProduto).padStart(2, '0')}.avif`,
    badge: p.precoOriginal && p.precoOriginal > p.preco ? 'Promoção' : '',
  }))

  const userName = session?.user?.name?.split(' ')[0] ?? 'mundo'
  const today = formatDate(new Date())

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-black sm:text-2xl">Olá, {userName}!</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{today}</p>

          <div className="mt-4 sm:mt-6">
            <SearchBar />
          </div>

          <CategoryBar />
          <BannerCarousel />
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
