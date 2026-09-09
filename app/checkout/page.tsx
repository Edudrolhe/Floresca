'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import OrderSummary from '@/app/_components/checkout/order-summary'
import CustomerForm from '@/app/_components/checkout/customer-form'
import PaymentMethodSelector from '@/app/_components/checkout/payment-method-selector'
import PayButton from '@/app/_components/checkout/pay-button'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'credit_card' | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('floresca-cart')
    if (saved) {
      const basicCart: { id: number; quantity: number }[] = JSON.parse(saved)
      fetch('/api/produtos')
        .then((res) => res.json())
        .then((products) => {
          const items = basicCart.map((ci) => {
            const product = products.find((p: any) => p.id === ci.id)
            return {
              id: ci.id,
              name: product?.name || '',
              price: product?.price || 0,
              quantity: ci.quantity,
              image: product?.image || '',
            }
          })
          setCartItems(items)
        })
    }
  }, [])

  const isFormValid =
    formData.nome &&
    formData.telefone &&
    formData.rua &&
    formData.numero &&
    formData.bairro &&
    formData.cidade &&
    formData.cep?.length === 8 &&
    metodoPagamento

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Finalizar Pedido</h1>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <CustomerForm onFormChange={setFormData} />
              <PaymentMethodSelector selected={metodoPagamento} onSelect={setMetodoPagamento} />
            </div>
            <div className="space-y-6">
              <OrderSummary items={cartItems} />
              <PayButton
                formData={formData}
                cartItems={cartItems}
                metodoPagamento={metodoPagamento}
                isDisabled={!isFormValid}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
