'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { DeleteFuncionarioDialog } from './delete-funcionario-dialog'

type Funcionario = {
  idFunconario: number
  nome: string
  cpf: string
  telefone: string
  email: string
  dataAdmissao: Date | null
  salario: number | null
}

function formatDate(date: Date | null) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

function formatCurrency(value: number | null) {
  if (!value) return '-'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function FuncionarioTable({ funcionarios }: { funcionarios: Funcionario[] }) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteName, setDeleteName] = useState('')

  function handleDeleteClick(id: number, name: string) {
    setDeleteId(id)
    setDeleteName(name)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">CPF</th>
              <th className="px-4 py-3 font-medium">Telefone</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Admissão</th>
              <th className="px-4 py-3 font-medium">Salário</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((func) => (
              <tr
                key={func.idFunconario}
                className="border-b transition-colors last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                      {func.nome.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-medium text-gray-900">{func.nome}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{func.cpf}</td>
                <td className="px-4 py-3 text-gray-600">{func.telefone}</td>
                <td className="px-4 py-3 text-gray-600">{func.email}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(func.dataAdmissao)}</td>
                <td className="px-4 py-3 font-bold text-purple-700">
                  {formatCurrency(func.salario)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/funcionarios/${func.idFunconario}/editar`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-purple-700"
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(func.idFunconario, func.nome)}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {funcionarios.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  Nenhum funcionário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <DeleteFuncionarioDialog
          funcionarioId={deleteId}
          funcionarioName={deleteName}
          open={!!deleteId}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteId(null)
              setDeleteName('')
            }
          }}
        />
      )}
    </>
  )
}
