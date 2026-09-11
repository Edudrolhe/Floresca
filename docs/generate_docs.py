#!/usr/bin/env python3
"""
Gerador de Documentação Técnica — Floresca Floricultura
Gera documento Word (.docx) com documentação completa do projeto.
"""

import os
from datetime import datetime
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.style import WD_STYLE_TYPE

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'generated')
OUTPUT_DOCX = os.path.join(OUTPUT_DIR, 'documentacao-tecnica-floresca.docx')

os.makedirs(OUTPUT_DIR, exist_ok=True)

doc = Document()

# === ESTILOS ===
style = doc.styles['Normal']
font = style.font
font.name = 'Calibri'
font.size = Pt(11)
font.color.rgb = RGBColor(0x37, 0x41, 0x51)

for level in range(1, 4):
    heading_style = doc.styles[f'Heading {level}']
    heading_style.font.color.rgb = RGBColor(0x1e, 0x1b, 0x4b)

def add_table(doc, headers, rows, col_widths=None):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        hdr_cells[i].text = header
        for paragraph in hdr_cells[i].paragraphs:
            for run in paragraph.runs:
                run.bold = True
                run.font.size = Pt(10)
    for row_data in rows:
        row_cells = table.add_row().cells
        for i, cell_text in enumerate(row_data):
            row_cells[i].text = str(cell_text)
            for paragraph in row_cells[i].paragraphs:
                for run in paragraph.runs:
                    run.font.size = Pt(10)
    return table

def add_code_block(doc, code, language=''):
    p = doc.add_paragraph()
    p.style = doc.styles['Normal']
    p.paragraph_format.left_indent = Cm(1)
    run = p.add_run(code)
    run.font.name = 'Courier New'
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x1f, 0x29, 0x37)

# === CAPA ===
doc.add_paragraph()
doc.add_paragraph()
title = doc.add_heading('Documentação Técnica', level=0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
subtitle = doc.add_heading('Floresca Floricultura', level=1)
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_paragraph()
p = doc.add_paragraph('Sistema de E-Commerce para Floricultura')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.runs[0].font.size = Pt(14)
p.runs[0].font.color.rgb = RGBColor(0x6b, 0x72, 0x80)
doc.add_paragraph()
p = doc.add_paragraph(f'Data: {datetime.now().strftime("%d/%m/%Y")}')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p = doc.add_paragraph('Versão: 1.0')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p = doc.add_paragraph('Autor: Equipe de Desenvolvimento Floresca')
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_page_break()

# === SUMÁRIO ===
doc.add_heading('Sumário', level=1)
toc_items = [
    '1. Visão Geral do Projeto',
    '2. Estrutura de Diretórios',
    '3. Banco de Dados',
    '4. Autenticação e Segurança',
    '5. API e Server Actions',
    '6. Frontend',
    '7. Integrações Externas',
    '8. Deploy e Configuração',
    '9. Guia de Desenvolvimento',
    '10. Roadmap e Melhorias',
    '11. Referências',
]
for item in toc_items:
    p = doc.add_paragraph(item)
    p.paragraph_format.space_after = Pt(4)
doc.add_page_break()

# === 1. VISÃO GERAL ===
doc.add_heading('1. Visão Geral do Projeto', level=1)

doc.add_heading('1.1 Descrição do Projeto', level=2)
doc.add_paragraph(
    'O Floresca Floricultura é um sistema de e-commerce completo desenvolvido para '
    'gerenciamento e venda de produtos de floricultura. O sistema permite a gestão de '
    'produtos, funcionários, vendas e integração com meios de pagamento digitais.'
)

doc.add_heading('1.2 Stack Tecnológica', level=2)
add_table(doc,
    ['Componente', 'Tecnologia', 'Versão'],
    [
        ['Framework', 'Next.js (App Router, Turbopack)', '16.3.4'],
        ['Linguagem', 'TypeScript', '5.x'],
        ['ORM/DB', 'Prisma Composer + raw SQL', 'PostgreSQL (Neon)'],
        ['Autenticação', 'NextAuth v5', 'JWT strategy'],
        ['Frontend', 'React + Tailwind CSS', '19.2.8 / 4.x'],
        ['Componentes', 'shadcn/ui', '4.21.0'],
        ['Pagamentos', 'Mercado Pago SDK', '3.6.0'],
        ['Email', 'Resend + React Email', '6.27.0'],
        ['Validação', 'Zod', '4.5.4'],
        ['Deploy', 'Vercel', '-'],
    ]
)

doc.add_heading('1.3 Diagrama de Arquitetura', level=2)
doc.add_paragraph(
    'O sistema segue a arquitetura do Next.js App Router com Server Components e Server Actions.'
)
add_code_block(doc, '''
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Produtos │  │ Checkout │  │  Admin   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │          │
├───────┼──────────────┼──────────────┼──────────────┼──────────┤
│       └──────────────┴──────┬───────┴──────────────┘          │
│                             │                                 │
│                    ┌────────▼────────┐                       │
│                    │ Server Actions  │                       │
│                    │ (app/_lib/)     │                       │
│                    └────────┬────────┘                       │
│                             │                                 │
├─────────────────────────────┼─────────────────────────────────┤
│                    ┌────────▼────────┐                       │
│                    │   Database      │                       │
│                    │   (Neon PG)     │                       │
│                    └─────────────────┘                       │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐                    │
│  │  Mercado Pago   │  │     Resend      │                    │
│  │  (Pagamentos)   │  │    (Emails)     │                    │
│  └─────────────────┘  └─────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
''')
doc.add_page_break()

# === 2. ESTRUTURA DE DIRETÓRIOS ===
doc.add_heading('2. Estrutura de Diretórios', level=1)

doc.add_heading('2.1 Mapa do Projeto', level=2)
add_code_block(doc, '''
floresca-floricultura/
├── app/                        # App Router (Next.js 16)
│   ├── _components/            # Componentes React
│   │   ├── checkout/           # Componentes do checkout
│   │   │   ├── card-form.tsx
│   │   │   ├── customer-form.tsx
│   │   │   ├── order-summary.tsx
│   │   │   ├── pay-button.tsx
│   │   │   └── payment-method-selector.tsx
│   │   └── ui/                 # Componentes genéricos (shadcn)
│   ├── _emails/                # Templates de email
│   │   └── order-confirmation.tsx
│   ├── _lib/                   # Utilitários e ações
│   │   ├── actions/            # Server Actions
│   │   │   ├── payments.ts
│   │   │   ├── products.ts
│   │   │   ├── vendas.ts
│   │   │   ├── funcionarios.ts
│   │   │   └── email.ts
│   │   ├── validations.ts      # Schemas Zod
│   │   ├── utils.ts            # Funções auxiliares
│   │   └── server-utils.ts     # requireAdmin()
│   ├── admin/                  # Painel administrativo
│   ├── api/                    # Rotas de API
│   │   └── webhooks/
│   │       └── mercadopago/
│   ├── checkout/               # Página de checkout
│   ├── obrigado/               # Confirmação de pedido
│   └── layout.tsx              # Layout principal
├── src/prisma/                 # Configuração do banco
│   ├── auth.ts                 # NextAuth config
│   └── db.ts                   # Conexão DB
├── public/                     # Arquivos estáticos
├── docs/                       # Documentação
└── migrations/                 # Migrações do banco
''')

doc.add_heading('2.2 Descrição dos Diretórios', level=2)
add_table(doc,
    ['Diretório', 'Propósito', 'Arquivos Principais'],
    [
        ['app/_components/', 'Componentes React reutilizáveis', 'checkout/, ui/'],
        ['app/_lib/actions/', 'Server Actions (mutações)', 'payments.ts, products.ts'],
        ['app/_lib/', 'Utilitários e validações', 'validations.ts, utils.ts'],
        ['app/admin/', 'Rotas do painel admin', 'page.tsx, vendas/, funcionarios/'],
        ['app/api/', 'Rotas de API HTTP', 'webhooks/mercadopago/'],
        ['src/prisma/', 'Configuração do banco', 'auth.ts, db.ts'],
        ['public/', 'Arquivos estáticos', 'produtos/, images/'],
    ]
)
doc.add_page_break()

# === 3. BANCO DE DADOS ===
doc.add_heading('3. Banco de Dados', level=1)

doc.add_heading('3.1 Schema Completo', level=2)
doc.add_paragraph(
    'O banco de dados PostgreSQL (Neon) contém as seguintes tabelas:'
)

doc.add_heading('3.2 Tabela: Cliente', level=3)
add_table(doc,
    ['Coluna', 'Tipo', 'Descrição'],
    [
        ['idCliente', 'INTEGER (PK)', 'Identificador único do cliente'],
        ['nome', 'VARCHAR(50)', 'Nome completo'],
        ['cpf', 'VARCHAR(15)', 'CPF do cliente'],
        ['telefone', 'VARCHAR(15)', 'Telefone de contato'],
        ['endereco', 'VARCHAR(50)', 'Endereço completo'],
        ['email', 'VARCHAR(50)', 'Email (opcional)'],
    ]
)

doc.add_heading('3.3 Tabela: Produto', level=3)
add_table(doc,
    ['Coluna', 'Tipo', 'Descrição'],
    [
        ['idProduto', 'INTEGER (PK)', 'Identificador único do produto'],
        ['codBarras', 'DECIMAL', 'Código de barras'],
        ['descricao', 'VARCHAR(50)', 'Descrição do produto'],
        ['categoria', 'VARCHAR(50)', 'Categoria do produto'],
        ['quantidade', 'INTEGER', 'Quantidade em estoque'],
        ['preco', 'FLOAT', 'Preço atual'],
        ['precoOriginal', 'FLOAT', 'Preço original (opcional)'],
        ['parcelas', 'INTEGER', 'Número de parcelas (default 1)'],
        ['idCategoria', 'INTEGER (FK)', 'Referência à categoria'],
    ]
)

doc.add_heading('3.4 Tabela: Venda', level=3)
add_table(doc,
    ['Coluna', 'Tipo', 'Descrição'],
    [
        ['idVenda', 'INTEGER (PK)', 'Identificador único da venda'],
        ['dataVenda', 'DATE', 'Data da venda'],
        ['produto', 'VARCHAR(50)', 'Descrição dos produtos'],
        ['quantidade', 'INTEGER', 'Quantidade total'],
        ['preco', 'FLOAT', 'Preço unitário'],
        ['totalVenda', 'FLOAT', 'Valor total da venda'],
        ['idFormaPgto', 'INTEGER (FK)', 'Forma de pagamento'],
        ['idFuncionario', 'INTEGER (FK)', 'Funcionário responsável'],
        ['idCliente', 'INTEGER (FK)', 'Cliente que realizou a compra'],
        ['status', 'TEXT', 'Status (pendente/aprovado/cancelado)'],
        ['dadosCliente', 'JSONB', 'Dados do cliente (JSON)'],
        ['linkPagamento', 'TEXT', 'Link do Mercado Pago'],
        ['idPagamentoExterno', 'TEXT', 'ID do pagamento no MP'],
        ['observacoes', 'TEXT', 'Observações'],
    ]
)

doc.add_heading('3.5 Tabela: Funcionario', level=3)
add_table(doc,
    ['Coluna', 'Tipo', 'Descrição'],
    [
        ['idFuncionario', 'INTEGER (PK)', 'Identificador único'],
        ['nome', 'VARCHAR(50)', 'Nome completo'],
        ['cpf', 'VARCHAR(50)', 'CPF do funcionário'],
        ['telefone', 'VARCHAR(15)', 'Telefone'],
        ['email', 'VARCHAR(50)', 'Email'],
        ['dataAdmissao', 'DATE', 'Data de admissão'],
        ['salario', 'FLOAT', 'Salário'],
        ['idUsuario', 'INTEGER (FK)', 'Referência ao login'],
    ]
)

doc.add_heading('3.6 Tabelas Auxiliares', level=3)
add_table(doc,
    ['Tabela', 'Colunas', 'Descrição'],
    [
        ['TipoProduto', 'idCategoria (PK), categoria', 'Categorias de produtos'],
        ['FormaPagto', 'idFormaPgto (PK), descricao', 'Formas de pagamento'],
        ['ItemVenda', 'idVenda (PK/FK), idProduto (PK/FK)', 'Itens de cada venda'],
        ['Login', 'iditemUsuario (PK), descricao', 'Tipos de usuário'],
    ]
)

doc.add_heading('3.7 Relacionamentos', level=3)
add_code_block(doc, '''
Cliente ──< Venda (1:N)          via idCliente
Funcionario ──< Venda (1:N)      via idFuncionario
TipoProduto ──< Produto (1:N)    via idCategoria
Venda ──< ItemVenda (1:N)        via idVenda
ItemVenda >── Produto (N:1)      via idProduto
Venda >── FormaPagto (N:1)       via idFormaPgto
''')
doc.add_page_break()

# === 4. AUTENTICAÇÃO ===
doc.add_heading('4. Autenticação e Segurança', level=1)

doc.add_heading('4.1 Fluxo de Autenticação', level=2)
doc.add_paragraph(
    'O sistema utiliza NextAuth v5 com JWT strategy para gerenciamento de sessão.'
)
doc.add_paragraph('Providers disponíveis:')
p = doc.add_paragraph('Google OAuth — Login social com conta Google', style='List Bullet')
p = doc.add_paragraph('Credentials — Login com email e senha (bcryptjs)', style='List Bullet')

doc.add_heading('4.2 Configuração do Auth', level=2)
add_code_block(doc, '''
// src/prisma/auth.ts
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        // Validação com bcryptjs
        // Busca no banco via pg Pool
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    signIn: async ({ user, account }) => { /* findOrCreate user */ },
    jwt: async ({ token, user }) => { /* attach role */ },
    session: async ({ session, token }) => { /* expose id, role */ },
  }
}
''')

doc.add_heading('4.3 Controle de Acesso', level=2)
doc.add_paragraph(
    'O middleware protege todas as rotas /admin, exigindo sessão válida com role admin ou employee.'
)
add_code_block(doc, '''
// middleware.ts
export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!isLoggedIn) return redirect('/login')
    if (!isAdmin) return redirect('/')
  }
})
''')

doc.add_heading('4.4 requireAdmin()', level=2)
doc.add_paragraph(
    'Todas as Server Actions administrativas chamam requireAdmin() no início.'
)
add_code_block(doc, '''
// app/_lib/server-utils.ts
export async function requireAdmin(): Promise<Session> {
  const session = await auth()
  if (!session) throw new Error('Não autenticado')
  if (role !== 'admin' && role !== 'employee') throw new Error('Sem permissão')
  return session
}
''')
doc.add_page_break()

# === 5. API E SERVER ACTIONS ===
doc.add_heading('5. API e Server Actions', level=1)

doc.add_heading('5.1 Server Actions', level=2)

doc.add_heading('payments.ts', level=3)
add_table(doc,
    ['Função', 'Parâmetros', 'Retorno', 'Descrição'],
    [
        ['createPayment', 'data: CheckoutInput, cartItems: CartItem[]', '{ redirectUrl, preferenceId, vendaId }', 'Cria pagamento Pix'],
        ['processCardPayment', 'data, cartItems, cardData, total', '{ success, vendaId?, error? }', 'Processa cartão de crédito'],
    ]
)

doc.add_heading('products.ts', level=3)
add_table(doc,
    ['Função', 'Parâmetros', 'Retorno', 'Descrição'],
    [
        ['getProducts', '-', 'Produto[]', 'Lista todos os produtos'],
        ['getProduct', 'id: number', 'Produto | null', 'Busca produto por ID'],
        ['createProduct', 'data: ProductInput', 'number (novo ID)', 'Cria novo produto'],
        ['updateProduct', 'id, data', 'void', 'Atualiza produto'],
        ['deleteProduct', 'id', 'void', 'Remove produto'],
        ['uploadProductImage', 'productId, file', 'string (URL)', 'Upload de imagem'],
        ['getCategorias', '-', 'TipoProduto[]', 'Lista categorias'],
    ]
)

doc.add_heading('vendas.ts', level=3)
add_table(doc,
    ['Função', 'Parâmetros', 'Retorno', 'Descrição'],
    [
        ['getVendas', '-', 'Venda[] (com JOINs)', 'Lista vendas'],
        ['getVenda', 'id', 'Venda | null', 'Busca venda'],
        ['createVenda', 'data: VendaInput', 'void', 'Cria venda'],
        ['updateVenda', 'id, data', 'void', 'Atualiza venda'],
        ['deleteVenda', 'id', 'void', 'Remove venda'],
    ]
)

doc.add_heading('funcionarios.ts', level=3)
add_table(doc,
    ['Função', 'Parâmetros', 'Retorno', 'Descrição'],
    [
        ['getFuncionarios', '-', 'Funcionario[]', 'Lista funcionários'],
        ['getFuncionario', 'id', 'Funcionario | null', 'Busca funcionário'],
        ['createFuncionario', 'data', 'void', 'Cria funcionário'],
        ['updateFuncionario', 'id, data', 'void', 'Atualiza funcionário'],
        ['deleteFuncionario', 'id', 'void', 'Remove funcionário'],
    ]
)

doc.add_heading('email.ts', level=3)
add_table(doc,
    ['Função', 'Parâmetros', 'Retorno', 'Descrição'],
    [
        ['sendOrderConfirmation', 'SendOrderEmailParams', '{ sent, id?, reason? }', 'Envia email de confirmação'],
    ]
)

doc.add_heading('5.2 Rotas de API', level=2)
add_table(doc,
    ['Rota', 'Método', 'Descrição'],
    [
        ['/api/webhooks/mercadopago', 'POST', 'Webhook do Mercado Pago'],
        ['/api/produtos', 'GET', 'Lista produtos para o frontend'],
    ]
)

doc.add_heading('5.3 Validações (Zod)', level=2)
add_code_block(doc, '''
// CheckoutSchema
{
  nome: z.string().min(3),
  telefone: z.string().min(10),
  email: z.string().email(),
  cpf: z.string().min(11).max(14),
  rua: z.string().min(3),
  numero: z.string().min(1),
  complemento: z.string().optional(),
  bairro: z.string().min(3),
  cidade: z.string().min(3),
  cep: z.string().length(8),
  metodoPagamento: z.enum(['pix', 'credit_card']),
}
''')
doc.add_page_break()

# === 6. FRONTEND ===
doc.add_heading('6. Frontend', level=1)

doc.add_heading('6.1 Páginas Principais', level=2)
add_table(doc,
    ['Rota', 'Descrição'],
    [
        ['/', 'Página inicial com produtos em destaque'],
        ['/login', 'Página de login'],
        ['/produto/[id]', 'Detalhe do produto'],
        ['/categoria/[slug]', 'Produtos por categoria'],
        ['/pesquisa', 'Busca de produtos'],
        ['/favoritos', 'Lista de favoritos'],
        ['/carrinho', 'Carrinho de compras'],
        ['/checkout', 'Finalização da compra'],
        ['/obrigado', 'Confirmação do pedido'],
        ['/admin', 'Painel administrativo'],
        ['/admin/funcionarios', 'Gestão de funcionários'],
        ['/admin/vendas', 'Gestão de vendas'],
    ]
)

doc.add_heading('6.2 Componentes do Checkout', level=2)

doc.add_heading('CustomerForm', level=3)
doc.add_paragraph(
    'Formulário de dados pessoais e endereço de entrega. '
    'Campos: Nome, Telefone, Email, CPF, Rua, Número, Complemento, Bairro, Cidade, CEP.'
)

doc.add_heading('PaymentMethodSelector', level=3)
doc.add_paragraph(
    'Seletor de método de pagamento com duas opções: Pix e Cartão de Crédito. '
    'Renderiza CardForm quando cartão é selecionado.'
)

doc.add_heading('CardForm', level=3)
doc.add_paragraph(
    'Integração com Card Payment Brick do Mercado Pago. '
    'Processa pagamento diretamente no callback onSubmit.'
)

doc.add_heading('PayButton', level=3)
doc.add_paragraph(
    'Botão para pagamento Pix. Chama createPayment() e redireciona para o Mercado Pago.'
)

doc.add_heading('OrderSummary', level=3)
doc.add_paragraph(
    'Resumo do pedido com lista de itens, subtotal, frete (grátis acima de R$100) e total.'
)

doc.add_heading('6.3 Tipos de Dados', level=2)
add_code_block(doc, '''
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
''')
doc.add_page_break()

# === 7. INTEGRAÇÕES ===
doc.add_heading('7. Integrações Externas', level=1)

doc.add_heading('7.1 Mercado Pago', level=2)
doc.add_paragraph(
    'O sistema integra com o Mercado Pago para processamento de pagamentos via Pix e Cartão de Crédito.'
)

doc.add_heading('Fluxo Pix', level=3)
doc.add_paragraph('1. Cliente seleciona Pix no checkout')
doc.add_paragraph('2. createPayment() cria uma Preference no Mercado Pago')
doc.add_paragraph('3. Sistema retorna link de pagamento (init_point)')
doc.add_paragraph('4. Cliente é redirecionado para página de pagamento')
doc.add_paragraph('5. Webhook notifica confirmação do pagamento')

doc.add_heading('Fluxo Cartão de Crédito', level=3)
doc.add_paragraph('1. Cliente preenche dados no Card Payment Brick')
doc.add_paragraph('2. Brick gera token seguro (single-use)')
doc.add_paragraph('3. processCardPayment() envia para API do Mercado Pago')
doc.add_paragraph('4. Webhook notifica status do pagamento')

doc.add_heading('Configuração', level=3)
add_code_block(doc, '''
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})
''')

doc.add_heading('7.2 Resend (Email)', level=2)
doc.add_paragraph(
    'Envio de emails de confirmação de pedido usando Resend SDK.'
)
add_code_block(doc, '''
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

// Envio automático após pagamento aprovado
await resend.emails.send({
  from: 'Floresca <onboarding@resend.dev>',
  to: email,
  subject: 'Pedido #123 confirmado!',
  html: OrderConfirmationEmail({ ... }),
})
''')

doc.add_heading('7.3 Neon (PostgreSQL)', level=2)
doc.add_paragraph(
    'Banco de dados PostgreSQL serverless via Neon. '
    'Conexão via Prisma Composer com fallback para pg driver.'
)
add_code_block(doc, '''
// src/prisma/db.ts
import { connect } from '@prisma/orm-postgres/runtime'

let connection: any
export async function connectDatabase() {
  if (!connection) {
    connection = await connect({ connectionString: process.env.DATABASE_URL })
  }
  return connection
}
''')
doc.add_page_break()

# === 8. DEPLOY ===
doc.add_heading('8. Deploy e Configuração', level=1)

doc.add_heading('8.1 Variáveis de Ambiente', level=2)
add_table(doc,
    ['Variável', 'Descrição', 'Obrigatória'],
    [
        ['DATABASE_URL', 'URL de conexão com Neon PostgreSQL', 'Sim'],
        ['AUTH_SECRET', 'Secret para NextAuth v5', 'Sim'],
        ['GOOGLE_CLIENT_ID', 'Client ID do Google OAuth', 'Sim'],
        ['GOOGLE_CLIENT_SECRET', 'Client Secret do Google', 'Sim'],
        ['MERCADO_PAGO_ACCESS_TOKEN', 'Token de acesso Mercado Pago', 'Sim'],
        ['MERCADO_PAGO_PUBLIC_KEY', 'Chave pública Mercado Pago', 'Sim'],
        ['MERCADO_PAGO_WEBHOOK_SECRET', 'Secret para verificação de webhook', 'Não'],
        ['RESEND_API_KEY', 'Chave da API Resend', 'Sim'],
        ['NEXT_PUBLIC_BASE_URL', 'URL base da aplicação', 'Sim'],
    ]
)

doc.add_heading('8.2 Deploy no Vercel', level=2)
doc.add_paragraph('1. Conectar repositório GitHub ao Vercel')
doc.add_paragraph('2. Configurar variáveis de ambiente no painel')
doc.add_paragraph('3. Build automático a cada push')
doc.add_paragraph('4. Configurar domínio personalizado (opcional)')

doc.add_heading('8.3 Configuração do Mercado Pago', level=2)
doc.add_paragraph('1. Criar aplicação no painel do Mercado Pago')
doc.add_paragraph('2. Configurar credenciais de teste')
doc.add_paragraph('3. Configurar webhook URL')
doc.add_paragraph('4. Ativar credenciais de produção')
doc.add_page_break()

# === 9. GUIA DE DESENVOLVIMENTO ===
doc.add_heading('9. Guia de Desenvolvimento', level=1)

doc.add_heading('9.1 Pré-requisitos', level=2)
doc.add_paragraph('Node.js 18+')
doc.add_paragraph('npm ou yarn')
doc.add_paragraph('Conta no Neon (banco de dados)')
doc.add_paragraph('Conta no Mercado Pago (pagamentos)')
doc.add_paragraph('Conta no Resend (emails)')

doc.add_heading('9.2 Setup Local', level=2)
add_code_block(doc, '''
# 1. Clonar repositório
git clone <url>

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 4. Iniciar banco de dados (Docker)
docker-compose up -d

# 5. Rodar migrações
npx prisma migrate dev

# 6. Iniciar servidor de desenvolvimento
npm run dev
''')

doc.add_heading('9.3 Comandos Úteis', level=2)
add_table(doc,
    ['Comando', 'Descrição'],
    [
        ['npm run dev', 'Inicia servidor de desenvolvimento'],
        ['npm run build', 'Build de produção'],
        ['npm run lint', 'Verifica código com ESLint'],
        ['npx prisma migrate dev', 'Roda migrações do banco'],
        ['npx prisma db push', 'Sincroniza schema com banco'],
        ['docker-compose up -d', 'Inicia banco PostgreSQL local'],
    ]
)

doc.add_heading('9.4 Padrões de Código', level=2)
doc.add_paragraph('Usar Server Actions para todas as mutações de dados')
doc.add_paragraph('Validação com Zod em todas as entradas de dados')
doc.add_paragraph('Tratamento de erros com try/catch')
doc.add_paragraph('requireAdmin() em todas as ações administrativas')
doc.add_paragraph('Usar toPlainDate() para manipulação de datas')
doc.add_paragraph('Parameterized queries para SQL (não interpolação)')
doc.add_page_break()

# === 10. ROADMAP ===
doc.add_heading('10. Roadmap e Melhorias', level=1)

doc.add_heading('10.1 Prioridades', level=2)
add_table(doc,
    ['Prioridade', 'Item', 'Status'],
    [
        ['P1', 'Validação de CPF no checkout', '✅ Concluído'],
        ['P1', 'Remoção de logs sensíveis', '✅ Concluído'],
        ['P2', 'Verificação de webhook', '✅ Concluído'],
        ['P2', 'Rate limiting no login', '⏳ Pendente'],
        ['P2', 'Validação de uploads', '✅ Concluído'],
        ['P3', 'Row-Level Security', '⏳ Pendente'],
        ['P3', 'Migração para Prisma ORM', '⏳ Pendente'],
    ]
)

doc.add_heading('10.2 Funcionalidades Futuras', level=2)
doc.add_paragraph('Sistema de cupons de desconto', style='List Bullet')
doc.add_paragraph('Programa de fidelidade', style='List Bullet')
doc.add_paragraph('App mobile', style='List Bullet')
doc.add_paragraph('Integração com transportadoras', style='List Bullet')
doc.add_paragraph('Relatórios avançados de vendas', style='List Bullet')
doc.add_paragraph('Sistema de avaliações de produtos', style='List Bullet')
doc.add_page_break()

# === 11. REFERÊNCIAS ===
doc.add_heading('11. Referências', level=1)

doc.add_heading('11.1 Documentação Externa', level=2)
doc.add_paragraph('Next.js 16 Docs: https://nextjs.org/docs')
doc.add_paragraph('Prisma Composer Docs: https://www.prisma.io/docs')
doc.add_paragraph('Mercado Pago Docs: https://www.mercadopago.com.br/developers')
doc.add_paragraph('Resend Docs: https://resend.com/docs')
doc.add_paragraph('NextAuth v5 Docs: https://next-auth.js.org/')
doc.add_paragraph('Tailwind CSS: https://tailwindcss.com')
doc.add_paragraph('shadcn/ui: https://ui.shadcn.com')

doc.add_heading('11.2 Contato', level=2)
doc.add_paragraph('Suporte: contato@floresca.com.br')
doc.add_paragraph('Repositório: GitHub')

# === SALVAR ===
doc.save(OUTPUT_DOCX)
print(f"[OK] Documentação gerada: {OUTPUT_DOCX}")
print(f"     Seções: 11")
print(f"     Tabelas: 15+")
print(f"     Blocos de código: 10+")
