import Header from './_components/header'
import Footer from './_components/footer'
import BannerCarousel from './_components/banner-carousel'
import { Input } from './_components/ui/input'
import { Button } from './_components/ui/button'
import { Card, CardContent } from './_components/ui/card'
import { Badge } from './_components/ui/badge'
import { SearchIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { db, connectDatabase } from '@/src/prisma/db'

type Product = {
  id: number
  name: string
  price: number
  originalPrice: number | null
  parcelas: number
  image: string
  badge: string
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

const getInstallmentText = (price: number, parcelas: number): string => {
  if (parcelas <= 1) return ''
  const installmentValue = price / parcelas
  return `${parcelas}x de ${formatCurrency(installmentValue)} sem juros`
}

export default async function Home() {
  await connectDatabase()
  const produtos = await db.orm.public.Produto.all()
  const products: Product[] = produtos.map((p) => ({
    id: p.idProduto,
    name: p.descricao,
    price: p.preco,
    originalPrice: p.precoOriginal,
    parcelas: p.parcelas ?? 1,
    image: `/produtos/${String(p.idProduto).padStart(2, '0')}.avif`,
    badge: '',
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-black sm:text-2xl">Olá, mundo!</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Domingo, 07 de setembro de 2026
          </p>

          <div className="mt-4 flex items-center gap-2 sm:mt-6">
            <Input placeholder="Pesquisar..." className="flex-1" />
            <Button className="shrink-0">
              <SearchIcon className="size-4" />
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-2 overflow-x-auto">
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/arranjo.svg" alt="arranjo" width={16} height={16} />
              Arranjos
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/bouquet.svg" alt="bouquet" width={16} height={16} />
              Bouquets
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/cesta.svg" alt="cesta" width={16} height={16} />
              Cestas
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/girassol.svg" alt="girassol" width={16} height={16} />
              Girassóis
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/mix.svg" alt="mix" width={16} height={16} />
              Mix
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/orquidia.svg" alt="orquidia" width={16} height={16} />
              Orquídias
            </Button>
            <Button className="shrink-0 gap-2" variant="secondary">
              <Image src="/svg/ramo.svg" alt="ramo" width={16} height={16} />
              Ramos
            </Button>
          </div>

          <BannerCarousel />

          <section className="mt-6 sm:mt-8">
            <h3 className="font-bold text-black sm:text-xl">Produtos</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover"
                      />
                      <button className="absolute top-1 left-1 rounded-full bg-white/80 p-1 transition-colors hover:bg-white sm:top-2 sm:left-2 sm:p-1.5">
                        <HeartIcon className="size-4 text-purple-700 sm:size-5" />
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
