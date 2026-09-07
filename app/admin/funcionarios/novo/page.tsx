import { FuncionarioForm } from '@/app/_components/admin/funcionario-form'

export default function NewFuncionarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Novo Funcionário</h1>
        <p className="text-sm text-gray-500">
          Preencha os dados para cadastrar um novo funcionário
        </p>
      </div>

      <FuncionarioForm />
    </div>
  )
}
