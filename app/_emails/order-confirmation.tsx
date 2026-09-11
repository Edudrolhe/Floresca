type OrderEmailProps = {
  nome: string
  vendaId: number
  itens: Array<{ name: string; price: number; quantity: number }>
  total: number
  metodoPagamento: string
  endereco: string
  status: string
}

export function OrderConfirmationEmail({
  nome,
  vendaId,
  itens,
  total,
  metodoPagamento,
  endereco,
  status,
}: OrderEmailProps) {
  const subtotal = itens.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const frete = subtotal >= 100 ? 0 : 15

  const itensHtml = itens
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;">
          ${item.name}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;text-align:center;">
          ${item.quantity}x
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;text-align:right;">
          R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
        </td>
      </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pedido Confirmado - Floresca</title>
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
                🌸 Floresca
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                Floricultura
              </p>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="padding:32px 24px 16px;text-align:center;">
              <div style="display:inline-block;background-color:#ecfdf5;border-radius:50%;width:64px;height:64px;line-height:64px;text-align:center;font-size:32px;">
                ✅
              </div>
              <h2 style="margin:16px 0 4px;color:#111827;font-size:22px;font-weight:700;">
                Pedido #${vendaId} Confirmado!
              </h2>
              <p style="margin:0;color:#6b7280;font-size:14px;">
                Olá <strong>${nome}</strong>, recebemos seu pedido.
              </p>
            </td>
          </tr>

          <!-- Status -->
          <tr>
            <td style="padding:0 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;">
                <tr>
                  <td style="padding:16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#6b7280;">Status do Pedido</td>
                        <td style="font-size:13px;color:#7c3aed;font-weight:600;text-align:right;text-transform:capitalize;">
                          ${status}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b7280;padding-top:8px;">Forma de Pagamento</td>
                        <td style="font-size:13px;color:#374151;font-weight:600;text-align:right;padding-top:8px;">
                          ${metodoPagamento === 'pix' ? 'Pix' : 'Cartão de Crédito'}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b7280;padding-top:8px;">Data</td>
                        <td style="font-size:13px;color:#374151;text-align:right;padding-top:8px;">
                          ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Products -->
          <tr>
            <td style="padding:0 24px 24px;">
              <h3 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:600;">
                Itens do Pedido
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <thead>
                  <tr style="background-color:#f9fafb;">
                    <th style="padding:10px 12px;font-size:12px;color:#6b7280;text-align:left;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">
                      Produto
                    </th>
                    <th style="padding:10px 12px;font-size:12px;color:#6b7280;text-align:center;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">
                      Qtd
                    </th>
                    <th style="padding:10px 12px;font-size:12px;color:#6b7280;text-align:right;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">
                      Preço
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${itensHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding:0 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#6b7280;">Subtotal</td>
                  <td style="padding:6px 0;font-size:14px;color:#374151;text-align:right;">
                    R$ ${subtotal.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#6b7280;">Frete</td>
                  <td style="padding:6px 0;font-size:14px;color:${frete === 0 ? '#16a34a' : '#374151'};text-align:right;font-weight:${frete === 0 ? '600' : '400'};">
                    ${frete === 0 ? 'Grátis' : 'R$ ' + frete.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;font-size:16px;color:#111827;font-weight:700;border-top:2px solid #e5e7eb;">Total</td>
                  <td style="padding:12px 0 0;font-size:16px;color:#7c3aed;font-weight:700;text-align:right;border-top:2px solid #e5e7eb;">
                    R$ ${total.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Address -->
          <tr>
            <td style="padding:0 24px 32px;">
              <h3 style="margin:0 0 8px;color:#111827;font-size:16px;font-weight:600;">
                Endereço de Entrega
              </h3>
              <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
                ${endereco}
              </p>
            </td>
          </tr>

          <!-- CTA -->
          ${metodoPagamento === 'pix' ? `
          <tr>
            <td style="padding:0 24px 32px;text-align:center;">
              <p style="margin:0 0 16px;color:#374151;font-size:14px;">
                Acesse o link abaixo para concluir o pagamento via Pix:
              </p>
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">
                Floresca Floricultura — Flores que encantam
              </p>
              <p style="margin:0;color:#9ca3af;font-size:11px;">
                Se você tem alguma dúvida, responda este email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
