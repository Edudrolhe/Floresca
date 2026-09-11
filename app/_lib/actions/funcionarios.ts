'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db, connectDatabase } from '@/src/prisma/db'
import { toPlainDate } from '@/app/_lib/utils'
import { requireAdmin } from '@/app/_lib/server-utils'
import { FuncionarioSchema, type FuncionarioInput } from '@/app/_lib/validations'

export type { FuncionarioInput }

async function getNextId(table: string, idColumn: string, tx: any): Promise<number> {
  const result = await tx.unsafe(`SELECT COALESCE(MAX("${idColumn}"), 0) + 1 AS next_id FROM "${table}" FOR UPDATE`)
  return result.rows[0].next_id
}

export async function getFuncionarios() {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Funcionario.all() as any
}

export async function getFuncionario(id: number) {
  await requireAdmin()
  await connectDatabase()
  return db.orm.public.Funcionario.where({ idFuncionario: id } as any).first() as any
}

export async function createFuncionario(data: FuncionarioInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = FuncionarioSchema.parse(data)

  await db.transaction(async (tx: any) => {
    const nextId = await getNextId('Funcionario', 'idFunconario', tx)

    await tx.orm.public.Funcionario.create({
      idFunconario: nextId,
      nome: parsed.nome,
      cpf: parsed.cpf,
      telefone: parsed.telefone,
      email: parsed.email,
      dataAdmissao: toPlainDate(parsed.dataAdmissao),
      salario: parsed.salario,
    } as any)
  })

  redirect('/admin/funcionarios')
}

export async function updateFuncionario(id: number, data: FuncionarioInput) {
  await requireAdmin()
  await connectDatabase()

  const parsed = FuncionarioSchema.parse(data)

  await db.orm.public.Funcionario.where({ idFuncionario: id } as any).update({
    nome: parsed.nome,
    cpf: parsed.cpf,
    telefone: parsed.telefone,
    email: parsed.email,
    dataAdmissao: toPlainDate(parsed.dataAdmissao),
    salario: parsed.salario,
  } as any)

  redirect('/admin/funcionarios')
}

export async function deleteFuncionario(id: number) {
  await requireAdmin()
  await connectDatabase()

  await db.transaction(async (tx: any) => {
    const vendas = await tx.orm.public.Venda.where({ idFuncionario: id } as any).all() as any[]
    for (const venda of vendas) {
      await tx.orm.public.ItemVenda.where({ idVenda: venda.idVenda } as any).delete()
    }
    await tx.orm.public.Venda.where({ idFuncionario: id } as any).delete()
    await tx.orm.public.Funcionario.where({ idFuncionario: id } as any).delete()
  })

  revalidatePath('/admin/funcionarios')
}
