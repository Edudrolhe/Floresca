'use server'

import { Resend } from 'resend'
import { OrderConfirmationEmail } from '@/app/_emails/order-confirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

type SendOrderEmailParams = {
  email: string
  nome: string
  vendaId: number
  itens: CartItem[]
  total: number
  metodoPagamento: string
  endereco: string
  status: string
}

export async function sendOrderConfirmation(params: SendOrderEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not configured, skipping email')
    return { sent: false, reason: 'no_api_key' }
  }

  if (!params.email || !params.email.includes('@')) {
    console.warn('[Email] No valid email provided for order', params.vendaId)
    return { sent: false, reason: 'no_email' }
  }

  try {
    const html = OrderConfirmationEmail({
      nome: params.nome,
      vendaId: params.vendaId,
      itens: params.itens,
      total: params.total,
      metodoPagamento: params.metodoPagamento,
      endereco: params.endereco,
      status: params.status,
    })

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Floresca <pedido@resend.dev>',
      to: params.email,
      subject: `Pedido #${params.vendaId} confirmado — Floresca`,
      html,
    })

    if (error) {
      console.error('[Email] Resend error:', error)
      return { sent: false, reason: error.message || 'Resend API error' }
    }

    console.log('[Email] Order confirmation sent to', params.email, 'for order', params.vendaId, 'id:', data?.id)
    return { sent: true, id: data?.id }
  } catch (err: any) {
    console.error('[Email] Failed to send order confirmation:', err.message)
    return { sent: false, reason: err.message }
  }
}
