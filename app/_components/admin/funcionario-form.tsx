'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent } from '../ui/card'
import {
  createFuncionario,
  updateFuncionario,
  type FuncionarioInput,
} from '@/app/_lib/actions/funcionarios'

type FuncionarioFormProps = {
  initialData?: {
    idFunconario: number
    nome: string
    cpf: string
    telefone: string
    email: string
    dataAdmissao: Date | null
    salario: number | null
  }
}

function formatDateForInput(date: Date | null): string {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

export function FuncionarioForm({ initialData }: FuncionarioFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    const data: FuncionarioInput = {
      nome: formData.get('nome') as string,
      cpf: formData.get('cpf') as string,
      telefone: formData.get('telefone') as string,
      email: formData.get('email') as string,
      dataAdmissao: formData.get('dataAdmissao') as string,
      salario: Number(formData.get('salario')),
    }

    try {
      if (initialData) {
        await updateFuncionario(initialData.idFunconario, data)
      } else {
        await createFuncionario(data)
      }
    } catch {
      setError('Erro ao salvar funcionário. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">Dados Pessoais</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                name="nome"
                required
                defaultValue={initialData?.nome}
                placeholder="Ex: Maria Silva"
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium">
                CPF *
              </Label>
              <Input
                id="cpf"
                name="cpf"
                required
                defaultValue={initialData?.cpf}
                placeholder="000.000.000-00"
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-sm font-medium">
                Telefone *
              </Label>
              <Input
                id="telefone"
                name="telefone"
                required
                defaultValue={initialData?.telefone}
                placeholder="(00) 00000-0000"
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={initialData?.email}
                placeholder="funcionario@email.com"
                className="h-10 text-black"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
            Dados Profissionais
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dataAdmissao" className="text-sm font-medium">
                Data de Admissão *
              </Label>
              <Input
                id="dataAdmissao"
                name="dataAdmissao"
                type="date"
                required
                defaultValue={formatDateForInput(initialData?.dataAdmissao ?? null)}
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salario" className="text-sm font-medium">
                Salário (R$) *
              </Label>
              <Input
                id="salario"
                name="salario"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={initialData?.salario ?? ''}
                placeholder="0,00"
                className="h-10 text-black"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={loading} className="h-10 bg-purple-700 hover:bg-purple-800">
          {loading ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Cadastrar Funcionário'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/funcionarios')}
          className="h-10"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
