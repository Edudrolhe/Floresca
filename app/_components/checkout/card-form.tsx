'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { processCardPayment } from '@/app/_lib/actions/payments'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

type CardFormProps = {
  amount: number
  formData: Record<string, string>
  cartItems: CartItem[]
}

export default function CardForm({ amount, formData, cartItems }: CardFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const brickControllerRef = useRef<any>(null)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!containerRef.current || brickControllerRef.current) return

    const timer = setTimeout(() => {
      const win = window as any
      if (!win.MercadoPago) return

      const mp = new win.MercadoPago(
        process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
        { locale: 'pt-BR' }
      )
      const bricksBuilder = mp.bricks()

      const settings = {
        initialization: {
          amount: amount,
        },
        customization: {
          visual: {
            style: {
              theme: 'default',
            },
          },
        },
        callbacks: {
          onReady: () => {},
          onSubmit: async (cardFormData: any) => {
            setProcessing(true)
            setError(null)

            try {
              const result = await processCardPayment(
                { ...formData, metodoPagamento: 'credit_card' } as any,
                cartItems,
                {
                  token: cardFormData.token,
                  paymentMethodId: cardFormData.payment_method_id,
                  issuerId: String(cardFormData.issuer_id),
                  installments: cardFormData.installments,
                },
                amount
              )

              if (result.success) {
                router.push('/obrigado?venda=' + result.vendaId)
              } else {
                setError(result.error || 'Erro ao processar pagamento')
                setProcessing(false)
                resetBrick()
              }
            } catch (err: any) {
              setError(err.message || 'Erro ao processar pagamento')
              setProcessing(false)
              resetBrick()
            }
          },
          onError: (error: any) => {
            console.error('[CardForm] Brick error:', error)
            setProcessing(false)
          },
        },
      }

      bricksBuilder
        .create('cardPayment', 'cardPaymentBrick_container', settings)
        .then((controller: any) => {
          brickControllerRef.current = controller
        })
        .catch((err: any) => {
          console.error('[CardForm] Brick create error:', err)
        })
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (brickControllerRef.current) {
        brickControllerRef.current.unmount()
        brickControllerRef.current = null
      }
    }
  }, [amount, formData, cartItems, router])

  const resetBrick = () => {
    if (brickControllerRef.current) {
      brickControllerRef.current.unmount()
      brickControllerRef.current = null
    }
    setTimeout(() => {
      const win = window as any
      if (!win.MercadoPago || !containerRef.current) return

      const mp = new win.MercadoPago(
        process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
        { locale: 'pt-BR' }
      )
      const bricksBuilder = mp.bricks()

      bricksBuilder
        .create('cardPayment', 'cardPaymentBrick_container', {
          initialization: { amount },
          customization: { visual: { style: { theme: 'default' } } },
          callbacks: {
            onReady: () => {},
            onSubmit: async (cardFormData: any) => {
              setProcessing(true)
              setError(null)

              try {
                const result = await processCardPayment(
                  { ...formData, metodoPagamento: 'credit_card' } as any,
                  cartItems,
                  {
                    token: cardFormData.token,
                    paymentMethodId: cardFormData.payment_method_id,
                    issuerId: String(cardFormData.issuer_id),
                    installments: cardFormData.installments,
                  },
                  amount
                )

                if (result.success) {
                  router.push('/obrigado?venda=' + result.vendaId)
                } else {
                  setError(result.error || 'Erro ao processar pagamento')
                  setProcessing(false)
                  resetBrick()
                }
              } catch (err: any) {
                setError(err.message || 'Erro ao processar pagamento')
                setProcessing(false)
                resetBrick()
              }
            },
            onError: (error: any) => {
              console.error('[CardForm] Brick error:', error)
              setProcessing(false)
            },
          },
        })
        .then((controller: any) => {
          brickControllerRef.current = controller
        })
    }, 500)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 border-b border-purple-200 pb-3 text-xl font-bold text-purple-800">
        Dados do Cartão
      </h2>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-base text-red-700">{error}</div>
      )}
      {processing && (
        <div className="mb-4 rounded-md bg-blue-50 p-4 text-base text-blue-700">
          Processando pagamento...
        </div>
      )}
      <div id="cardPaymentBrick_container" ref={containerRef} />
    </div>
  )
}
