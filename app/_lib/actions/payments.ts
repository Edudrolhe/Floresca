'use server'

import { z } from 'zod'
import { db, connectDatabase } from '@/src/prisma/db'
import { CheckoutSchema } from '@/app/_lib/validations'
import { toPlainDate } from '@/app/_lib/utils'
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'
import { sendOrderConfirmation } from '@/app/_lib/actions/email'

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

type CardData = {
  token: string
  paymentMethodId: string
  issuerId: string
  installments: number
}

function calculateTotal(cartItems: CartItem[]) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const frete = subtotal >= 100 ? 0 : 15
  return subtotal + frete
}

function buildDadosCliente(validated: any) {
  return JSON.stringify({
    nome: validated.nome,
    telefone: validated.telefone,
    email: validated.email || null,
    cpf: validated.cpf || null,
    endereco: `${validated.rua}, ${validated.numero}${validated.complemento ? ' - ' + validated.complemento : ''}, ${validated.bairro}, ${validated.cidade} - ${validated.cep}`,
  })
}

async function createVendaRecord(validated: any, cartItems: CartItem[], total: number, dadosCliente: string, idFormaPgto: number) {
  await connectDatabase()

  const result = await db.transaction(async (tx: any) => {
    const idResult = await tx.unsafe('SELECT COALESCE(MAX("idVenda"), 0) + 1 AS next_id FROM "Venda" FOR UPDATE')
    const nextId = idResult.rows[0].next_id

    const produtoStr = cartItems.map((i) => i.name).join(', ')
    const quantidadeTotal = cartItems.reduce((sum, i) => sum + i.quantity, 0)

    await tx.orm.public.Venda.create({
      idVenda: nextId,
      dataVenda: toPlainDate(new Date().toISOString().split('T')[0]),
      produto: produtoStr,
      quantidade: quantidadeTotal,
      preco: cartItems[0]?.price || 0,
      totalVenda: total,
      idFormaPgto: idFormaPgto,
      status: 'pendente',
      dadosCliente: dadosCliente,
    } as any)

    for (const item of cartItems) {
      await tx.orm.public.ItemVenda.create({
        idVenda: nextId,
        idProduto: item.id,
      } as any)
    }

    return nextId
  })

  return result
}

export async function createPayment(
  data: z.infer<typeof CheckoutSchema>,
  cartItems: CartItem[]
) {
  const validated = CheckoutSchema.parse(data)
  const total = calculateTotal(cartItems)
  const dadosCliente = buildDadosCliente(validated)
  const idFormaPgto = 5

  const venda = await createVendaRecord(validated, cartItems, total, dadosCliente, idFormaPgto)

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
      phone: { number: validated.telefone },
      address: { zip_code: validated.cep, street_name: validated.rua, street_number: validated.numero },
    },
    payment_methods: { installments: 12 },
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
    await tx.orm.public.Venda.where({ idVenda: venda } as any).update({
      idPagamentoExterno: String(response.id),
    } as any)
  })

  const endereco = `${validated.rua}, ${validated.numero}${validated.complemento ? ' - ' + validated.complemento : ''}, ${validated.bairro}, ${validated.cidade} - ${validated.cep}`

  sendOrderConfirmation({
    email: validated.email || '',
    nome: validated.nome,
    vendaId: venda,
    itens: cartItems,
    total,
    metodoPagamento: 'pix',
    endereco,
    status: 'pendente',
  }).catch((err) => console.error('[Email] Failed to send Pix order email:', err))

  return {
    redirectUrl: response.sandbox_init_point || response.init_point,
    preferenceId: response.id,
    vendaId: venda,
  }
}

export async function processCardPayment(
  data: z.infer<typeof CheckoutSchema>,
  cartItems: CartItem[],
  cardData: CardData,
  total: number
) {
  try {
    const dataWithDefaults = { ...data, email: data.email || '' }
    const validated = CheckoutSchema.parse(dataWithDefaults)
    const dadosCliente = buildDadosCliente(validated)
    const idFormaPgto = 1

    const venda = await createVendaRecord(validated, cartItems, total, dadosCliente, idFormaPgto)

    const payerEmail = validated.email || `${validated.nome.toLowerCase().replace(/\s/g, '.')}@floresca.com`

    const paymentClient = new Payment(client)
    console.log('[processCardPayment] Processing payment for order', venda)

    const paymentResponse = await paymentClient.create({
      body: {
        transaction_amount: total,
        token: cardData.token,
        description: `Pedido Floresca #${venda}`,
        installments: cardData.installments,
        payment_method_id: cardData.paymentMethodId,
        issuer_id: Number(cardData.issuerId),
        payer: {
          email: payerEmail,
          identification: {
            type: 'CPF',
            number: validated.cpf.replace(/\D/g, ''),
          },
        },
        external_reference: String(venda),
      },
    })

    console.log('[processCardPayment] MP response:', {
      id: (paymentResponse as any).id,
      status: (paymentResponse as any).status,
      status_detail: (paymentResponse as any).status_detail,
    })

    const paymentStatus = (paymentResponse as any).status
    const mercadoPagoId = String((paymentResponse as any).id)

    let statusVenda = 'pendente'
    if (paymentStatus === 'approved') statusVenda = 'pago'
    else if (paymentStatus === 'rejected') statusVenda = 'cancelado'
    else if (paymentStatus === 'pending') statusVenda = 'pendente'

    await db.transaction(async (tx: any) => {
      await tx.orm.public.Venda.where({ idVenda: venda } as any).update({
        status: statusVenda,
        idPagamentoExterno: mercadoPagoId,
      } as any)
    })

    if (paymentStatus === 'approved') {
      const endereco = `${validated.rua}, ${validated.numero}${validated.complemento ? ' - ' + validated.complemento : ''}, ${validated.bairro}, ${validated.cidade} - ${validated.cep}`

      sendOrderConfirmation({
        email: validated.email || '',
        nome: validated.nome,
        vendaId: venda,
        itens: cartItems,
        total,
        metodoPagamento: 'credit_card',
        endereco,
        status: 'pago',
      }).catch((err) => console.error('[Email] Failed to send card order email:', err))

      return { success: true, vendaId: venda }
    } else if (paymentStatus === 'rejected') {
      const statusDetail = (paymentResponse as any).status_detail
      console.error('[processCardPayment] Payment rejected:', {
        status: paymentStatus,
        status_detail: statusDetail,
      })
      return { success: false, error: `Pagamento recusado (${statusDetail || paymentStatus}). Verifique os dados do cartão.` }
    } else {
      return { success: true, vendaId: venda }
    }
  } catch (err: any) {
    console.error('[processCardPayment] Error:', err)
    return { success: false, error: err.message || 'Erro ao processar pagamento' }
  }
}
