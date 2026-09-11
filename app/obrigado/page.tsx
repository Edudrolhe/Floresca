'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import { CheckCircleIcon } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'

export default function ObrigadoPage() {
  useEffect(() => {
    localStorage.removeItem('floresca-cart')
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <div className="mx-auto max-w-md px-4 text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Pedido realizado com sucesso!
          </h1>
          <p className="mt-2 text-gray-600">
            Seu pedido foi registrado. Você receberá uma confirmação em breve.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Caso não tenha concluído o pagamento, acesse o link enviado no seu email.
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button className="bg-purple-700 text-white hover:bg-purple-800">
              Voltar para a Loja
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
