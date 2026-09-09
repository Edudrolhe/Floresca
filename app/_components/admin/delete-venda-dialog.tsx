'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { deleteVenda } from '@/app/_lib/actions/vendas'

type DeleteVendaDialogProps = {
  vendaId: number
  vendaProduto: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteVendaDialog({
  vendaId,
  vendaProduto,
  open,
  onOpenChange,
}: DeleteVendaDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    setError('')
    try {
      await deleteVenda(vendaId)
      onOpenChange(false)
      router.refresh()
    } catch (e: any) {
      setError(e?.message || 'Erro ao excluir venda. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Venda</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a venda <strong>#{vendaId}</strong> ({vendaProduto})? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
