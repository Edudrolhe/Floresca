import { notFound } from 'next/navigation'
import { FuncionarioForm } from '@/app/_components/admin/funcionario-form'
import { getFuncionario } from '@/app/_lib/actions/funcionarios'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditFuncionarioPage({ params }: Props) {
  const { id } = await params
  const funcionarioId = Number(id)

  if (isNaN(funcionarioId)) notFound()

  const funcionario = await getFuncionario(funcionarioId)

  if (!funcionario) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Funcionário</h1>
        <p className="text-sm text-gray-500">Altere os dados do funcionário</p>
      </div>

      <FuncionarioForm
        initialData={{
          idFuncionario: funcionario.idFuncionario,
          nome: String(funcionario.nome),
          cpf: String(funcionario.cpf),
          telefone: String(funcionario.telefone),
          email: String(funcionario.email),
          dataAdmissao: funcionario.dataAdmissao?.toString() ?? null,
          salario: funcionario.salario,
        }}
      />
    </div>
  )
}
