'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db, connectDatabase } from '@/src/prisma/db'
import { toPlainDate } from '@/app/_lib/utils'
import { requireAdmin } from '@/app/_lib/server-utils'
import { VendaSchema, type VendaInput } from '@/app/_lib/validations'

export type { VendaInput }

export async function getVendas() {
  await requireAdmin()
  await connectDatabase()
  const result = await db.transaction(async (tx: any) => {
    return tx.unsafe(`
      SELECT v.*, 
             f."nome" AS "funcionarioNome",
             c."nome" AS "clienteNome",
             fp."descricao" AS "formaPagtoNome"
      FROM "Venda" v
      LEFT JOIN "Funcionario" f ON v."idFuncionario" = f."idFunconario"
      LEFT JOIN "Cliente" c ON v."idCliente" = c."idCliente"
      LEFT JOIN "FormaPagto" fp ON v."idFormaPgto" = fp."idFormaPgto"
      ORDER BY v."idVenda" DESC
    `)
  })
  return result.rows
}

export async function getVenda(id: number) {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Venda.where({ idVenda: id } as any).first() as any
}

export async function getFuncionarios() {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Funcionario.all() as any
}

export async function getClientes() {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Cliente.all() as any
}

export async function getFormasPagto() {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.FormaPagto.all() as any
}

export async function getProdutos() {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Produto.all() as any
}

async function getNextId(tx: any): Promise<number> {
  const result = await tx.unsafe('SELECT COALESCE(MAX("idVenda"), 0) + 1 AS next_id FROM "Venda" FOR UPDATE')
  return result.rows[0].next_id
}

export async function createVenda(data: VendaInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = VendaSchema.parse(data)

  await db.transaction(async (tx: any) => {
    const nextId = await getNextId(tx)

    await tx.orm.public.Venda.create({
      idVenda: nextId,
      dataVenda: toPlainDate(parsed.dataVenda),
      produto: parsed.produto,
      quantidade: parsed.quantidade,
      preco: parsed.preco,
      totalVenda: parsed.totalVenda,
      idFormaPgto: parsed.idFormaPgto,
      idFuncionario: parsed.idFuncionario ?? null,
      idCliente: parsed.idCliente ?? null,
    } as any)

    for (const item of parsed.itens) {
      await tx.orm.public.ItemVenda.create({
        idVenda: nextId,
        idProduto: item.idProduto,
      } as any)
    }
  })

  redirect('/admin/vendas')
}

export async function updateVenda(id: number, data: VendaInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = VendaSchema.parse(data)

  await db.transaction(async (tx: any) => {
    await tx.orm.public.ItemVenda.where({ idVenda: id } as any).delete()

    await tx.orm.public.Venda.where({ idVenda: id } as any).update({
      dataVenda: toPlainDate(parsed.dataVenda),
      produto: parsed.produto,
      quantidade: parsed.quantidade,
      preco: parsed.preco,
      totalVenda: parsed.totalVenda,
      idFormaPgto: parsed.idFormaPgto,
      idFuncionario: parsed.idFuncionario ?? null,
      idCliente: parsed.idCliente ?? null,
    } as any)

    for (const item of parsed.itens) {
      await tx.orm.public.ItemVenda.create({
        idVenda: id,
        idProduto: item.idProduto,
      } as any)
    }
  })

  redirect('/admin/vendas')
}

export async function deleteVenda(id: number) {
  await requireAdmin()
  await connectDatabase()

  await db.transaction(async (tx: any) => {
    await tx.orm.public.ItemVenda.where({ idVenda: id } as any).delete()
    await tx.orm.public.Venda.where({ idVenda: id } as any).delete()
  })

  revalidatePath('/admin/vendas')
}
