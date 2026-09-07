import { NextResponse } from 'next/server'
import { db, connectDatabase } from '@/src/prisma/db'

export async function GET() {
  await connectDatabase()
  const produtos = await db.orm.public.Produto.all()

  const products = produtos.map((p) => ({
    id: p.idProduto,
    name: p.descricao,
    price: p.preco,
    originalPrice: p.precoOriginal,
    parcelas: p.parcelas ?? 1,
    image: `/produtos/${String(p.idProduto).padStart(2, '0')}.avif`,
    badge: p.precoOriginal && p.precoOriginal > p.preco ? 'Promoção' : '',
  }))

  return NextResponse.json(products)
}
