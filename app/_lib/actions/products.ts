'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { db, connectDatabase } from '@/src/prisma/db'
import { requireAdmin } from '@/app/_lib/server-utils'
import { ProductSchema, type ProductInput } from '@/app/_lib/validations'

export type { ProductInput }

export async function getProducts() {
  await connectDatabase()
  return db.orm.public.Produto.all()
}

export async function getProduct(id: number) {
  await connectDatabase()
  return db.orm.public.Produto.where({ idProduto: id }).first()
}

export async function createProduct(data: ProductInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = ProductSchema.parse(data)

  const all = await db.orm.public.Produto.all()
  const nextId = all.length > 0 ? Math.max(...all.map((p) => p.idProduto)) + 1 : 1

  await db.orm.public.Produto.create({
    idProduto: nextId,
    codBarras: parsed.codBarras,
    descricao: parsed.descricao,
    categoria: parsed.categoria,
    quantidade: parsed.quantidade,
    preco: parsed.preco,
    precoOriginal: parsed.precoOriginal ?? null,
    parcelas: parsed.parcelas ?? 1,
    idCategoria: parsed.idCategoria ?? null,
  } as any)

  return nextId
}

export async function updateProduct(id: number, data: ProductInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = ProductSchema.parse(data)

  await db.orm.public.Produto.where({ idProduto: id }).update({
    codBarras: parsed.codBarras,
    descricao: parsed.descricao,
    categoria: parsed.categoria,
    quantidade: parsed.quantidade,
    preco: parsed.preco,
    precoOriginal: parsed.precoOriginal ?? null,
    parcelas: parsed.parcelas ?? 1,
    idCategoria: parsed.idCategoria ?? null,
  } as any)

  redirect('/admin')
}

export async function deleteProduct(id: number) {
  await requireAdmin()
  await connectDatabase()

  await db.transaction(async (tx: any) => {
    await tx.orm.public.ItemVenda.where({ idProduto: id } as any).delete()
    await tx.orm.public.Produto.where({ idProduto: id }).delete()
  })

  await deleteProductImage(id)
  revalidatePath('/admin')
}

export async function getCategorias() {
  await connectDatabase()
  return db.orm.public.TipoProduto.all()
}

export async function uploadProductImage(productId: number, file: File) {
  await requireAdmin()
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
    } catch (error: any) {
      if (error.code !== 'ENOENT') throw error
    }
  }
  revalidatePath('/admin')
}
