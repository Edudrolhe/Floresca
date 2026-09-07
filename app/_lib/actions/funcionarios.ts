'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db, connectDatabase } from '@/src/prisma/db'

export type FuncionarioInput = {
  nome: string
  cpf: string
  telefone: string
  email: string
  dataAdmissao: string
  salario: number
}

export async function getFuncionarios() {
  await connectDatabase()
  return db.orm.public.Funcionario.all() as any
}

export async function getFuncionario(id: number) {
  await connectDatabase()
  return db.orm.public.Funcionario.where({ idFunconario: id } as any).first() as any
}

export async function createFuncionario(data: FuncionarioInput) {
  await connectDatabase()

  const all = await db.orm.public.Funcionario.all()
  const nextId = all.length > 0 ? Math.max(...all.map((f: any) => f.idFunconario)) + 1 : 1

  await db.orm.public.Funcionario.create({
    idFunconario: nextId,
    nome: data.nome,
    cpf: data.cpf,
    telefone: data.telefone,
    email: data.email,
    dataAdmissao: new Date(data.dataAdmissao),
    salario: data.salario,
  } as any)

  redirect('/admin/funcionarios')
}

export async function updateFuncionario(id: number, data: FuncionarioInput) {
  await connectDatabase()

  await db.orm.public.Funcionario.where({ idFunconario: id } as any).update({
    nome: data.nome,
    cpf: data.cpf,
    telefone: data.telefone,
    email: data.email,
    dataAdmissao: new Date(data.dataAdmissao),
    salario: data.salario,
  } as any)

  redirect('/admin/funcionarios')
}

export async function deleteFuncionario(id: number) {
  await connectDatabase()
  await db.orm.public.Funcionario.where({ idFunconario: id } as any).delete()
  revalidatePath('/admin/funcionarios')
}
