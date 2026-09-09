import { NextRequest, NextResponse } from 'next/server'
import { db, connectDatabase } from '@/src/prisma/db'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import crypto from 'crypto'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.type !== 'payment') {
      return NextResponse.json({ received: true })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ error: 'No payment ID' }, { status: 400 })
    }

    const payment = new Payment(client)
    const paymentData = await payment.get({ id: paymentId })

    const vendaId = paymentData.external_reference
    if (!vendaId) {
      return NextResponse.json({ error: 'No external reference' }, { status: 400 })
    }

    await connectDatabase()

    let status: string
    switch (paymentData.status) {
      case 'approved':
        status = 'aprovado'
        break
      case 'pending':
      case 'in_process':
        status = 'pendente'
        break
      case 'authorized':
        status = 'aprovado'
        break
      case 'cancelled':
      case 'expired':
      case 'rejected':
        status = 'cancelado'
        break
      case 'refunded':
      case 'charged_back':
        status = 'reembolsado'
        break
      default:
        status = 'pendente'
    }

    await db.transaction(async (tx: any) => {
      await tx.unsafe(
        `UPDATE "Venda" SET "status" = $1 WHERE "idVenda" = $2`,
        [status, Number(vendaId)]
      )
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
