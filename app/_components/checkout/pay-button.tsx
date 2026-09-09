'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/_components/ui/button'
import { createPayment } from '@/app/_lib/actions/payments'

type PayButtonProps = {
  formData: Record<string, string>
  cartItems: Array<{ id: number; name: string; price: number; quantity: number; image: string }>
  metodoPagamento: 'pix' | 'credit_card' | null
  isDisabled: boolean
}

export default function PayButton({ formData, cartItems, metodoPagamento, isDisabled }: PayButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePay = async () => {
    if (!metodoPagamento) {
      setError('Selecione uma forma de pagamento')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createPayment(
        {
          ...formData,
          metodoPagamento,
        } as any,
        cartItems
      )

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else {
        router.push('/obrigado?venda=' + result.vendaId)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento')
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-base text-red-700">{error}</div>
      )}
      <Button
        onClick={handlePay}
        disabled={isDisabled || loading}
        className="w-full h-14 text-lg font-bold bg-purple-700 text-white hover:bg-purple-800"
        size="lg"
      >
        {loading ? 'Processando...' : 'Pagar Agora'}
      </Button>
    </div>
  )
}
