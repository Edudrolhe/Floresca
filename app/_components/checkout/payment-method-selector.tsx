'use client'

import { QrCodeIcon, CreditCardIcon } from 'lucide-react'
import { cn } from '@/app/_lib/utils'

type PaymentMethodSelectorProps = {
  selected: 'pix' | 'credit_card' | null
  onSelect: (method: 'pix' | 'credit_card') => void
}

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 border-b border-purple-200 pb-3 text-xl font-bold text-purple-800">Forma de Pagamento</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect('pix')}
          className={cn(
            'flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all',
            selected === 'pix'
              ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
              : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50/50'
          )}
        >
          <QrCodeIcon className="h-12 w-12" />
          <div className="text-center">
            <p className="text-lg font-bold">Pix</p>
            <p className="mt-1 text-sm font-medium text-gray-600">Pagamento instantâneo</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect('credit_card')}
          className={cn(
            'flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all',
            selected === 'credit_card'
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
              : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50/50'
          )}
        >
          <CreditCardIcon className="h-12 w-12" />
          <div className="text-center">
            <p className="text-lg font-bold">Cartão de Crédito</p>
            <p className="mt-1 text-sm font-medium text-gray-600">Até 12x sem juros</p>
          </div>
        </button>
      </div>
    </div>
  )
}
