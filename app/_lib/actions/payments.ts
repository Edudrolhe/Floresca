'use server'

import { z } from 'zod'
import { db, connectDatabase } from '@/src/prisma/db'
import { CheckoutSchema } from '@/app/_lib/validations'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export async function createPayment(
  data: z.infer<typeof CheckoutSchema>,
  cartItems: CartItem[]
) {
  const validated = CheckoutSchema.parse(data)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const frete = subtotal >= 100 ? 0 : 15
  const total = subtotal + frete

  const endereco = `${validated.rua}, ${validated.numero}${validated.complemento ? ' - ' + validated.complemento : ''}, ${validated.bairro}, ${validated.cidade} - ${validated.cep}`

  const dadosCliente = JSON.stringify({
    nome: validated.nome,
    telefone: validated.telefone,
    email: validated.email || null,
    endereco,
  })

  const idFormaPgto = validated.metodoPagamento === 'pix' ? 5 : 1

  await connectDatabase()

  const venda = await db.transaction(async (tx: any) => {
    const result = await tx.unsafe('SELECT MAX("idVenda") as max_id FROM "Venda"')
    const nextId = (result.rows[0]?.max_id || 0) + 1

    const produtoStr = cartItems.map((i) => i.name).join(', ')
    const quantidadeTotal = cartItems.reduce((sum, i) => sum + i.quantity, 0)

    await tx.unsafe(
      `INSERT INTO "Venda" ("idVenda", "dataVenda", "produto", "quantidade", "preco", "Total_Venda", "idFormaPgto", "status", "dadosCliente")
       VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, 'pendente', $7)`,
      [nextId, produtoStr, quantidadeTotal, cartItems[0]?.price || 0, total, idFormaPgto, dadosCliente]
    )

    for (const item of cartItems) {
      await tx.unsafe(
        `INSERT INTO "item_venda" ("idVenda", "idProduto") VALUES ($1, $2)`,
        [nextId, item.id]
      )
    }

    return nextId
  })

  const description = `Pedido Floresca #${venda}`

  const payerEmail = validated.email || `${validated.nome.toLowerCase().replace(/\s/g, '.')}@floresca.com`

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const preferenceData = {
    items: cartItems.map((item) => ({
      id: String(item.id),
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'BRL',
    })),
    payer: {
      name: validated.nome.split(' ')[0],
      surname: validated.nome.split(' ').slice(1).join(' ') || validated.nome.split(' ')[0],
      email: payerEmail,
      phone: {
        number: validated.telefone,
      },
      address: {
        zip_code: validated.cep,
        street_name: validated.rua,
        street_number: validated.numero,
      },
    },
    back_urls: {
      success: `${baseUrl}/obrigado`,
      failure: `${baseUrl}/checkout`,
      pending: `${baseUrl}/obrigado`,
    },
    notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    statement_descriptor: 'FLORESCA',
    external_reference: String(venda),
  }

  const preference = new Preference(client)
  const response = await preference.create({ body: preferenceData })

  await db.transaction(async (tx: any) => {
    await tx.unsafe(
      `UPDATE "Venda" SET "idPagamentoExterno" = $1 WHERE "idVenda" = $2`,
      [response.id, venda]
    )
  })

  const redirectUrl = response.init_point

  return {
    redirectUrl,
    preferenceId: response.id,
    vendaId: venda,
  }
}
