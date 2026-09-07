'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { deleteFuncionario } from '@/app/_lib/actions/funcionarios'

type DeleteFuncionarioDialogProps = {
  funcionarioId: number
  funcionarioName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteFuncionarioDialog({
  funcionarioId,
  funcionarioName,
  open,
  onOpenChange,
}: DeleteFuncionarioDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteFuncionario(funcionarioId)
      onOpenChange(false)
    } catch {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900">Excluir Funcionário</h3>
        <p className="mt-2 text-sm text-gray-500">
          Tem certeza que deseja excluir <strong>{funcionarioName}</strong>? Esta ação não pode ser
          desfeita.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </div>
    </div>
  )
}
