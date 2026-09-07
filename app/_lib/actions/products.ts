'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { db, connectDatabase } from '@/src/prisma/db'

export type ProductInput = {
  descricao: string
  preco: number
  precoOriginal?: number | null
  parcelas?: number
  categoria: string
  quantidade: number
  codBarras: number
  idCategoria?: number | null
}

export async function getProducts() {
  await connectDatabase()
  return db.orm.public.Produto.all()
}

export async function getProduct(id: number) {
  await connectDatabase()
  return db.orm.public.Produto.where({ idProduto: id }).first()
}

export async function createProduct(data: ProductInput) {
  await connectDatabase()

  const all = await db.orm.public.Produto.all()
  const nextId = all.length > 0 ? Math.max(...all.map((p) => p.idProduto)) + 1 : 1

  await db.orm.public.Produto.create({
    idProduto: nextId,
    codBarras: data.codBarras,
    descricao: data.descricao,
    categoria: data.categoria,
    quantidade: data.quantidade,
    preco: data.preco,
    precoOriginal: data.precoOriginal ?? null,
    parcelas: data.parcelas ?? 1,
    idCategoria: data.idCategoria ?? null,
  } as any)

  return nextId
}

export async function updateProduct(id: number, data: ProductInput) {
  await connectDatabase()

  await db.orm.public.Produto.where({ idProduto: id }).update({
    codBarras: data.codBarras,
    descricao: data.descricao,
    categoria: data.categoria,
    quantidade: data.quantidade,
    preco: data.preco,
    precoOriginal: data.precoOriginal ?? null,
    parcelas: data.parcelas ?? 1,
    idCategoria: data.idCategoria ?? null,
  } as any)

  redirect('/admin')
}

export async function deleteProduct(id: number) {
  await connectDatabase()
  await db.orm.public.Produto.where({ idProduto: id }).delete()
  revalidatePath('/admin')
}

export async function getCategorias() {
  await connectDatabase()
  return db.orm.public.TipoProduto.all()
}

export async function uploadProductImage(productId: number, file: File) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name) || '.avif'
  const filename = `${String(productId).padStart(2, '0')}${ext}`
  const filepath = path.join(process.cwd(), 'public/produtos', filename)

  await writeFile(filepath, buffer)
  revalidatePath('/admin')
  return `/produtos/${filename}`
}

export async function deleteProductImage(productId: number) {
  const extensions = ['.avif', '.jpg', '.jpeg', '.png', '.webp']
  for (const ext of extensions) {
    const filepath = path.join(
      process.cwd(),
      'public/produtos',
      `${String(productId).padStart(2, '0')}${ext}`
    )
    try {
      await unlink(filepath)
    } catch {}
  }
  revalidatePath('/admin')
}
