<div align="center">

<img src="public/Logo.png" alt="Floresca Floricultura" width="400" />

### E-commerce completo para floricultura

**Next.js 16** · **React 19** · **Prisma 8** · **PostgreSQL** · **Mercado Pago**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-8-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![License](https://img.shields.io/badge/license-private-red?style=flat-square)](#)

</div>

---

## Screenshots

<div align="center">

| Home | Produto | Carrinho |
|:---:|:---:|:---:|
| <img src="public/floresca /Tela inicio.png" width="400" alt="Tela Inicio"> | <img src="public/floresca /tela fechar produto.png" width="400" alt="Tela Produto"> | <img src="public/floresca /carrinho.png" width="400" alt="Carrinho"> |

| Checkout | Admin Panel | Cadastro Produto |
|:---:|:---:|:---:|
| <img src="public/floresca /download.png" width="400" alt="Checkout"> | <img src="public/floresca /painal adm.png" width="400" alt="Painel Admin"> | <img src="public/floresca /cadastro produto.png" width="400" alt="Cadastro Produto"> |

</div>


## Funcionalidades

### Loja Virtual
- **Carousel de banners** com promoções e destaques
- **Busca inteligente** por produtos
- **7 categorias** — Arranjos, Bouquets, Cestas, Girassóis, Mix, Orquídeas, Ramos
- **Favoritos** salvos no navegador
- **Carrinho de compras** com cálculo automático de frete (grátis acima de R$ 100)
- **Checkout completo** com formulário de dados e endereço de entrega

### Pagamento Integrado
- **Pix** via Mercado Pago (redirecionamento)
- **Cartão de crédito** até 12x sem juros (Brick embutido)
- **Webhook** para atualização automática de status
- **Email de confirmação** automático via Resend

### Painel Administrativo
- **Dashboard** com métricas (produtos, categorias, estoque, valor total)
- **CRUD completo** — Produtos, Funcionários, Vendas
- **Upload de imagens** com validação de tipo e tamanho
- **Autenticação** via Google OAuth (NextAuth)

---

## Tech Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router) | 16.3.4 |
| UI | React | 19.2.8 |
| Estilo | Tailwind CSS + shadcn/ui | 4 |
| Linguagem | TypeScript | 5 |
| ORM | Prisma (Composer) | 8.0.0-rc.13 |
| Banco | PostgreSQL | 15+ |
| Pagamento | Mercado Pago SDK | 3.6.0 |
| Email | Resend + React Email | 6.27.0 |
| Auth | NextAuth (Google OAuth) | 5.0.0-beta.32 |
| Validação | Zod | 4.5.4 |

---

## Database Model (UML)

<div align="center">

<svg width="1000" height="700" viewBox="0 0 1000 700" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1000" height="700" rx="12" fill="#FAFAFA"/>
  
  <!-- Title -->
  <text x="500" y="32" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1F2937" text-anchor="middle">Database Model — AstahUML Style</text>
  
  <!-- ==================== TABLES ==================== -->
  
  <!-- TipoProduto -->
  <g transform="translate(20, 60)">
    <rect width="180" height="120" rx="4" fill="#FFFFFF" stroke="#6D28D9" stroke-width="2"/>
    <rect width="180" height="28" rx="4" fill="#6D28D9"/>
    <text x="90" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">TipoProduto</text>
    <line x1="0" y1="28" x2="180" y2="28" stroke="#6D28D9" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idCategoria: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   categoria: VarChar(50)</text>
    <line x1="0" y1="78" x2="180" y2="78" stroke="#E5E7EB" stroke-width="1"/>
    <text x="10" y="96" font-family="Arial, sans-serif" font-size="9" fill="#9CA3AF">produtos: Produto[]</text>
  </g>
  
  <!-- Produto -->
  <g transform="translate(250, 60)">
    <rect width="220" height="180" rx="4" fill="#FFFFFF" stroke="#7C3AED" stroke-width="2"/>
    <rect width="220" height="28" rx="4" fill="#7C3AED"/>
    <text x="110" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Produto</text>
    <line x1="0" y1="28" x2="220" y2="28" stroke="#7C3AED" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idProduto: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   codBarras: Decimal</text>
    <text x="10" y="84" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   descricao: VarChar(50)</text>
    <text x="10" y="102" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   categoria: VarChar(50)</text>
    <text x="10" y="120" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   quantidade: Int</text>
    <text x="10" y="138" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   preco: Float</text>
    <text x="10" y="156" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   precoOriginal: Float?</text>
    <text x="10" y="174" font-family="Arial, sans-serif" font-size="10" fill="#7C3AED">   idCategoria: Int (FK)</text>
  </g>
  
  <!-- Funcionario -->
  <g transform="translate(520, 60)">
    <rect width="220" height="180" rx="4" fill="#FFFFFF" stroke="#0891B2" stroke-width="2"/>
    <rect width="220" height="28" rx="4" fill="#0891B2"/>
    <text x="110" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Funcionario</text>
    <line x1="0" y1="28" x2="220" y2="28" stroke="#0891B2" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idFuncionario: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   nome: VarChar(50)</text>
    <text x="10" y="84" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   cpf: VarChar(50)</text>
    <text x="10" y="102" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   telefone: VarChar(15)</text>
    <text x="10" y="120" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   email: VarChar(50)</text>
    <text x="10" y="138" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   dataAdmissao: Date?</text>
    <text x="10" y="156" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   salario: Float?</text>
    <text x="10" y="174" font-family="Arial, sans-serif" font-size="10" fill="#0891B2">   idUsuario: Int (FK)</text>
  </g>
  
  <!-- Login -->
  <g transform="translate(780, 60)">
    <rect width="190" height="100" rx="4" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
    <rect width="190" height="28" rx="4" fill="#0D9488"/>
    <text x="95" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Login</text>
    <line x1="0" y1="28" x2="190" y2="28" stroke="#0D9488" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; iditemUsuario: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   descricao: VarChar(50)</text>
    <line x1="0" y1="78" x2="190" y2="78" stroke="#E5E7EB" stroke-width="1"/>
    <text x="10" y="96" font-family="Arial, sans-serif" font-size="9" fill="#9CA3AF">funcionarios: Funcionario[]</text>
  </g>
  
  <!-- Cliente -->
  <g transform="translate(20, 280)">
    <rect width="200" height="140" rx="4" fill="#FFFFFF" stroke="#D97706" stroke-width="2"/>
    <rect width="200" height="28" rx="4" fill="#D97706"/>
    <text x="100" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Cliente</text>
    <line x1="0" y1="28" x2="200" y2="28" stroke="#D97706" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idCliente: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   nome: VarChar(50)</text>
    <text x="10" y="84" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   cpf: VarChar(15)</text>
    <text x="10" y="102" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   telefone: VarChar(15)</text>
    <text x="10" y="120" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   endereco: VarChar(50)</text>
    <text x="10" y="138" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   email: VarChar(50)?</text>
  </g>
  
  <!-- FormaPagto -->
  <g transform="translate(20, 480)">
    <rect width="180" height="100" rx="4" fill="#FFFFFF" stroke="#DC2626" stroke-width="2"/>
    <rect width="180" height="28" rx="4" fill="#DC2626"/>
    <text x="90" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">FormaPagto</text>
    <line x1="0" y1="28" x2="180" y2="28" stroke="#DC2626" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idFormaPgto: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   descricao: VarChar(50)</text>
    <line x1="0" y1="78" x2="180" y2="78" stroke="#E5E7EB" stroke-width="1"/>
    <text x="10" y="96" font-family="Arial, sans-serif" font-size="9" fill="#9CA3AF">vendas: Venda[]</text>
  </g>
  
  <!-- Venda (Central) -->
  <g transform="translate(280, 300)">
    <rect width="360" height="220" rx="4" fill="#FFFFFF" stroke="#6D28D9" stroke-width="3"/>
    <rect width="360" height="28" rx="4" fill="#6D28D9"/>
    <text x="180" y="19" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Venda</text>
    <line x1="0" y1="28" x2="360" y2="28" stroke="#6D28D9" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#1F2937">&#128273; idVenda: Int</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   dataVenda: Date</text>
    <text x="10" y="84" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   produto: VarChar(50)</text>
    <text x="10" y="102" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   quantidade: Int</text>
    <text x="10" y="120" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   preco: Float</text>
    <text x="10" y="138" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   totalVenda: Float</text>
    <text x="10" y="156" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   status: String</text>
    <text x="10" y="174" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   dadosCliente: String?</text>
    <text x="10" y="192" font-family="Arial, sans-serif" font-size="10" fill="#D97706">   idCliente: Int? (FK)</text>
    <text x="10" y="210" font-family="Arial, sans-serif" font-size="10" fill="#0891B2">   idFuncionario: Int? (FK)</text>
    <text x="190" y="192" font-family="Arial, sans-serif" font-size="10" fill="#DC2626">   idFormaPgto: Int (FK)</text>
    <text x="190" y="210" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">   itens: ItemVenda[]</text>
  </g>
  
  <!-- ItemVenda -->
  <g transform="translate(700, 380)">
    <rect width="220" height="100" rx="4" fill="#FFFFFF" stroke="#9333EA" stroke-width="2"/>
    <rect width="220" height="28" rx="4" fill="#9333EA"/>
    <text x="110" y="19" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ItemVenda</text>
    <line x1="0" y1="28" x2="220" y2="28" stroke="#9333EA" stroke-width="1"/>
    <text x="10" y="48" font-family="Arial, sans-serif" font-size="10" fill="#9333EA">&#128273; idVenda: Int (PK, FK)</text>
    <text x="10" y="66" font-family="Arial, sans-serif" font-size="10" fill="#9333EA">&#128273; idProduto: Int (PK, FK)</text>
    <line x1="0" y1="78" x2="220" y2="78" stroke="#E5E7EB" stroke-width="1"/>
    <text x="10" y="96" font-family="Arial, sans-serif" font-size="9" fill="#9CA3AF">venda: Venda · produto: Produto</text>
  </g>
  
  <!-- ==================== RELATIONSHIPS ==================== -->
  
  <!-- TipoProduto 1 ──── N Produto -->
  <line x1="200" y1="130" x2="250" y2="130" stroke="#6D28D9" stroke-width="2"/>
  <text x="210" y="122" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#6D28D9">1</text>
  <text x="240" y="122" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#6D28D9">N</text>
  <text x="225" y="145" font-family="Arial, sans-serif" font-size="8" fill="#6B7280" text-anchor="middle">FK_idCategoria</text>
  
  <!-- Funcionario N ──── 1 Login -->
  <line x1="740" y1="150" x2="780" y2="150" stroke="#0891B2" stroke-width="2"/>
  <text x="748" y="142" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0891B2">N</text>
  <text x="772" y="142" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0891B2">1</text>
  
  <!-- Cliente 1 ──── N Venda -->
  <line x1="120" y1="420" x2="120" y2="460" stroke="#D97706" stroke-width="2" stroke-dasharray="6 3"/>
  <line x1="120" y1="460" x2="350" y2="460" stroke="#D97706" stroke-width="2"/>
  <text x="128" y="455" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#D97706">1</text>
  <text x="340" y="455" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#D97706">N</text>
  <text x="235" y="478" font-family="Arial, sans-serif" font-size="8" fill="#6B7280" text-anchor="middle">FK_idCliente</text>
  
  <!-- Funcionario 1 ──── N Venda -->
  <line x1="630" y1="240" x2="630" y2="280" stroke="#0891B2" stroke-width="2" stroke-dasharray="6 3"/>
  <line x1="630" y1="280" x2="500" y2="280" stroke="#0891B2" stroke-width="2"/>
  <line x1="500" y1="280" x2="500" y2="300" stroke="#0891B2" stroke-width="2"/>
  <text x="638" y="275" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0891B2">1</text>
  <text x="492" y="295" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0891B2">N</text>
  <text x="570" y="275" font-family="Arial, sans-serif" font-size="8" fill="#6B7280" text-anchor="middle">FK_idFuncionario</text>
  
  <!-- FormaPagto 1 ──── N Venda -->
  <line x1="110" y1="580" x2="110" y2="600" stroke="#DC2626" stroke-width="2" stroke-dasharray="6 3"/>
  <line x1="110" y1="600" x2="350" y2="600" stroke="#DC2626" stroke-width="2"/>
  <line x1="350" y1="600" x2="350" y2="520" stroke="#DC2626" stroke-width="2"/>
  <text x="118" y="595" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#DC2626">1</text>
  <text x="342" y="530" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#DC2626">N</text>
  <text x="235" y="615" font-family="Arial, sans-serif" font-size="8" fill="#6B7280" text-anchor="middle">FK_idFormaPgto</text>
  
  <!-- Venda 1 ──── N ItemVenda -->
  <line x1="640" y1="520" x2="640" y2="550" stroke="#9333EA" stroke-width="2"/>
  <line x1="640" y1="550" x2="750" y2="550" stroke="#9333EA" stroke-width="2"/>
  <line x1="750" y1="550" x2="750" y2="480" stroke="#9333EA" stroke-width="2"/>
  <text x="648" y="545" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#9333EA">1</text>
  <text x="742" y="490" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#9333EA">N</text>
  
  <!-- ItemVenda N ──── 1 Produto -->
  <line x1="810" y1="380" x2="810" y2="340" stroke="#9333EA" stroke-width="2" stroke-dasharray="6 3"/>
  <line x1="810" y1="340" x2="600" y2="340" stroke="#9333EA" stroke-width="2"/>
  <line x1="600" y1="340" x2="600" y2="240" stroke="#9333EA" stroke-width="2"/>
  <text x="818" y="350" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#9333EA">N</text>
  <text x="608" y="250" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#9333EA">1</text>
  
  <!-- Legend -->
  <rect x="20" y="640" width="960" height="50" rx="8" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
  <text x="40" y="660" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#6B7280">LEGEND:</text>
  
  <rect x="140" y="648" width="12" height="12" rx="2" fill="#6D28D9"/>
  <text x="158" y="658" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Primary</text>
  
  <rect x="220" y="648" width="12" height="12" rx="2" fill="#D97706"/>
  <text x="238" y="658" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Customer</text>
  
  <rect x="310" y="648" width="12" height="12" rx="2" fill="#0891B2"/>
  <text x="328" y="658" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Employee</text>
  
  <rect x="400" y="648" width="12" height="12" rx="2" fill="#DC2626"/>
  <text x="418" y="658" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Payment</text>
  
  <rect x="490" y="648" width="12" height="12" rx="2" fill="#9333EA"/>
  <text x="508" y="658" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Junction</text>
  
  <text x="600" y="660" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">&#128273; = PK · FK = Foreign Key · 1:N = One-to-Many · N:M = Many-to-Many</text>
</svg>

</div>

---

### Relacionamentos

```
TipoProduto ──1:N──▶ Produto
Cliente ──1:N──▶ Venda
Funcionario ──1:N──▶ Venda
Funcionario ◀──N:1── Login
FormaPagto ──1:N──▶ Venda
Venda ──1:N──▶ ItemVenda
Produto ◀──N:1── ItemVenda
```

---

## Estrutura do Projeto

```
floresca-floricultura/
├── app/
│   ├── _components/        # Componentes React
│   │   ├── checkout/       # Formulários de checkout
│   │   ├── admin/          # Componentes do painel admin
│   │   ├── ui/             # shadcn/ui components
│   │   ├── header.tsx      # Cabeçalho responsivo
│   │   ├── footer.tsx      # Rodapé
│   │   └── product-grid.tsx # Grid de produtos
│   ├── _lib/
│   │   └── actions/        # Server Actions (auth, products, payments)
│   ├── api/                # API Routes
│   │   └── webhooks/       # Webhook Mercado Pago
│   ├── admin/              # Painel administrativo
│   ├── carrinho/           # Carrinho de compras
│   ├── checkout/           # Finalização de pedido
│   ├── login/              # Autenticação
│   └── produto/            # Detalhe do produto
├── src/prisma/             # Schema, migrations e conexão
├── public/                 # Assets estáticos
└── migrations/             # Histórico de migrações
```

---

<div align="center">

**Floresca Floricultura** · Desenvolvido com Next.js 16 e Prisma 8

</div>
