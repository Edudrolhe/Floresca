'use client'

import Image from 'next/image'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

type OrderSummaryProps = {
  items: CartItem[]
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const frete = subtotal >= 100 ? 0 : 15
  const total = subtotal + frete

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 border-b border-purple-200 pb-3 text-xl font-bold text-purple-800">Resumo do Pedido</h2>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-200">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">{item.name}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">Qtd: {item.quantity}</p>
            </div>
            <p className="text-base font-bold text-gray-900">
              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base">
          <span className="font-medium text-gray-700">Subtotal</span>
          <span className="font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="font-medium text-gray-700">Frete</span>
          <span className="font-bold text-gray-900">
            {frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-purple-700">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  )
}
