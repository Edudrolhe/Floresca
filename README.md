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

## Database Model (UML — AstahUML Style)

<div align="center">

<svg width="1100" height="760" viewBox="0 0 1100 760" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="boxShadow" x="-3%" y="-3%" width="106%" height="110%">
      <feDropShadow dx="1" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.12"/>
    </filter>
    <!-- Crow's foot (many) marker -->
    <marker id="crow" markerWidth="18" markerHeight="18" refX="0" refY="9" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,9 L10,0" stroke="#333" stroke-width="1.4" fill="none"/>
      <path d="M0,9 L10,18" stroke="#333" stroke-width="1.4" fill="none"/>
      <path d="M0,9 L10,9" stroke="#333" stroke-width="1.4" fill="none"/>
    </marker>
    <!-- One marker (circle) -->
    <marker id="oneCircle" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="4" fill="#FFFFFF" stroke="#333" stroke-width="1.4"/>
    </marker>
    <!-- Diamond (composition) -->
    <marker id="diamond" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M7,0 L14,7 L7,14 L0,7 Z" fill="#FFFFFF" stroke="#333" stroke-width="1.4"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="1100" height="760" fill="#FFFFFF"/>

  <!-- Title -->
  <text x="550" y="30" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Floresca — Diagrama de Classes (ER)</text>

  <!-- ==================== BALLOON CLASSES ==================== -->

  <!-- Login -->
  <g transform="translate(880, 60)" filter="url(#boxShadow)">
    <rect width="170" height="90" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <!-- Header -->
    <rect x="0.6" y="0.6" width="168.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="85" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Login</text>
    <!-- Separator -->
    <line x1="0" y1="27" x2="170" y2="27" stroke="#333" stroke-width="0.8"/>
    <!-- Attributes -->
    <text x="10" y="46" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+iditemUsuario: Int</text>
    <text x="10" y="62" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+descricao: VarChar</text>
    <!-- Separator -->
    <line x1="0" y1="72" x2="170" y2="72" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="86" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">funcionarios: Funcionario[]</text>
  </g>

  <!-- TipoProduto -->
  <g transform="translate(20, 60)" filter="url(#boxShadow)">
    <rect width="170" height="110" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="168.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="85" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">TipoProduto</text>
    <line x1="0" y1="27" x2="170" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="46" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idCategoria: Int</text>
    <text x="10" y="62" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+categoria: VarChar</text>
    <line x1="0" y1="72" x2="170" y2="72" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="88" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">produtos: Produto[]</text>
  </g>

  <!-- Produto -->
  <g transform="translate(260, 60)" filter="url(#boxShadow)">
    <rect width="230" height="190" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="228.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="115" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Produto</text>
    <line x1="0" y1="27" x2="230" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="44" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idProduto: Int</text>
    <text x="10" y="58" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+codBarras: Decimal</text>
    <text x="10" y="72" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+descricao: VarChar</text>
    <text x="10" y="86" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+categoria: VarChar</text>
    <text x="10" y="100" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+quantidade: Int</text>
    <text x="10" y="114" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+preco: Float</text>
    <text x="10" y="128" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+precoOriginal: Float?</text>
    <text x="10" y="142" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+parcelas: Int?</text>
    <line x1="0" y1="154" x2="230" y2="154" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="170" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#9333EA">-idCategoria: Int?</text>
    <text x="10" y="186" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">tipoProduto: TipoProduto?</text>
  </g>

  <!-- Funcionario -->
  <g transform="translate(560, 60)" filter="url(#boxShadow)">
    <rect width="240" height="190" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="238.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="120" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Funcionario</text>
    <line x1="0" y1="27" x2="240" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="44" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idFuncionario: Int</text>
    <text x="10" y="58" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+nome: VarChar</text>
    <text x="10" y="72" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+cpf: VarChar</text>
    <text x="10" y="86" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+telefone: VarChar</text>
    <text x="10" y="100" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+email: VarChar</text>
    <text x="10" y="114" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+dataAdmissao: Date?</text>
    <text x="10" y="128" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+salario: Float?</text>
    <line x1="0" y1="140" x2="240" y2="140" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="156" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#0891B2">-idUsuario: Int?</text>
    <text x="10" y="172" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">login: Login? · vendas: Venda[]</text>
  </g>

  <!-- Cliente -->
  <g transform="translate(20, 300)" filter="url(#boxShadow)">
    <rect width="200" height="150" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="198.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="100" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Cliente</text>
    <line x1="0" y1="27" x2="200" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="46" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idCliente: Int</text>
    <text x="10" y="62" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+nome: VarChar</text>
    <text x="10" y="78" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+cpf: VarChar</text>
    <text x="10" y="94" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+telefone: VarChar</text>
    <text x="10" y="110" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+endereco: VarChar</text>
    <text x="10" y="126" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+email: VarChar?</text>
    <line x1="0" y1="136" x2="200" y2="136" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="148" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">vendas: Venda[]</text>
  </g>

  <!-- FormaPagto -->
  <g transform="translate(20, 540)" filter="url(#boxShadow)">
    <rect width="170" height="90" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="168.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="85" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">FormaPagto</text>
    <line x1="0" y1="27" x2="170" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="46" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idFormaPgto: Int</text>
    <text x="10" y="62" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+descricao: VarChar</text>
    <line x1="0" y1="72" x2="170" y2="72" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="86" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">vendas: Venda[]</text>
  </g>

  <!-- Venda (Central) -->
  <g transform="translate(290, 330)" filter="url(#boxShadow)">
    <rect width="380" height="260" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.4"/>
    <rect x="0.6" y="0.6" width="378.8" height="28" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.8"/>
    <text x="190" y="19" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="bold" fill="#333" text-anchor="middle">Venda</text>
    <line x1="0" y1="29" x2="380" y2="29" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="48" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#333">+idVenda: Int</text>
    <text x="10" y="63" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+dataVenda: Date</text>
    <text x="10" y="78" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+produto: VarChar</text>
    <text x="10" y="93" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+quantidade: Int</text>
    <text x="10" y="108" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+preco: Float</text>
    <text x="10" y="123" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+totalVenda: Float</text>
    <text x="10" y="138" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+status: String</text>
    <text x="10" y="153" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+dadosCliente: String?</text>
    <text x="10" y="168" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+observacoes: String?</text>
    <text x="10" y="183" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+idPagamentoExterno: String?</text>
    <text x="10" y="198" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#555">+linkPagamento: String?</text>
    <line x1="0" y1="210" x2="380" y2="210" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="226" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#D97706">-idCliente: Int?</text>
    <text x="10" y="241" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#0891B2">-idFuncionario: Int?</text>
    <text x="200" y="226" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#DC2626">-idFormaPgto: Int</text>
    <text x="200" y="241" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">itens: ItemVenda[]</text>
  </g>

  <!-- ItemVenda -->
  <g transform="translate(750, 400)" filter="url(#boxShadow)">
    <rect width="210" height="100" rx="3" fill="#FFFFFF" stroke="#333" stroke-width="1.2"/>
    <rect x="0.6" y="0.6" width="208.8" height="26" rx="3" fill="#F0F4F8" stroke="#333" stroke-width="0.6"/>
    <text x="105" y="18" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">ItemVenda</text>
    <line x1="0" y1="27" x2="210" y2="27" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="46" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#9333EA">+idVenda: Int (PK,FK)</text>
    <text x="10" y="62" font-family="Consolas, Menlo, monospace" font-size="9.5" fill="#9333EA">+idProduto: Int (PK,FK)</text>
    <line x1="0" y1="72" x2="210" y2="72" stroke="#333" stroke-width="0.8"/>
    <text x="10" y="88" font-family="Arial, sans-serif" font-size="8" fill="#888" font-style="italic">venda: Venda · produto: Produto</text>
  </g>

  <!-- ==================== RELATIONSHIP LINES ==================== -->

  <!-- TipoProduto 1 ── N Produto -->
  <line x1="190" y1="120" x2="260" y2="120" stroke="#333" stroke-width="1.2" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- Login 1 ── N Funcionario -->
  <line x1="950" y1="150" x2="800" y2="150" stroke="#333" stroke-width="1.2" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- Cliente 1 ── N Venda -->
  <path d="M120,450 L120,470 L360,470 L360,530" stroke="#333" stroke-width="1.2" fill="none" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- Funcionario 1 ── N Venda -->
  <path d="M680,250 L680,280 L500,280 L500,330" stroke="#333" stroke-width="1.2" fill="none" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- FormaPagto 1 ── N Venda -->
  <path d="M105,630 L105,660 L440,660 L440,590" stroke="#333" stroke-width="1.2" fill="none" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- Venda 1 ── N ItemVenda -->
  <path d="M670,590 L670,620 L800,620 L800,560" stroke="#333" stroke-width="1.2" fill="none" marker-start="url(#oneCircle)" marker-end="url(#crow)"/>

  <!-- ItemVenda N ── 1 Produto -->
  <path d="M855,400 L855,360 L620,360 L620,250" stroke="#333" stroke-width="1.2" fill="none" marker-start="url(#crow)" marker-end="url(#oneCircle)"/>

  <!-- ==================== LEGEND ==================== -->
  <g transform="translate(20, 690)">
    <rect width="1060" height="55" rx="4" fill="#FFFFFF" stroke="#DDD" stroke-width="1"/>
    <text x="16" y="20" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#333">LEGENDA</text>
    <!-- One -->
    <circle cx="30" cy="38" r="4.5" fill="#FFFFFF" stroke="#333" stroke-width="1.4"/>
    <text x="42" y="42" font-family="Arial, sans-serif" font-size="9" fill="#555">1 (Um)</text>
    <!-- Many -->
    <path d="M88,32 L98,38 L88,44 M92,35 L98,38 L92,41" stroke="#333" stroke-width="1.3" fill="none"/>
    <text x="106" y="42" font-family="Arial, sans-serif" font-size="9" fill="#555">N (Muitos)</text>
    <!-- FK color -->
    <rect x="180" y="32" width="10" height="10" rx="2" fill="#9333EA"/>
    <text x="196" y="42" font-family="Arial, sans-serif" font-size="9" fill="#555">Chave Estrangeira (FK)</text>
    <!-- PK -->
    <text x="340" y="42" font-family="Arial, sans-serif" font-size="9" fill="#555">+atributo = publico · -atributo = privado</text>
    <!-- Notation -->
    <text x="640" y="42" font-family="Arial, sans-serif" font-size="9" fill="#888">Notacao: AstahUML Class Diagram</text>
  </g>
</svg>

</div>

---

### Relacionamentos

| De | Cardinalidade | Para | FK |
|----|:---:|------|-----|
| TipoProduto | 1:N | Produto | `idCategoria` |
| Login | 1:N | Funcionario | `idUsuario` |
| Cliente | 1:N | Venda | `idCliente` |
| Funcionario | 1:N | Venda | `idFuncionario` |
| FormaPagto | 1:N | Venda | `idFormaPgto` |
| Venda | 1:N | ItemVenda | `idVenda` + `idProduto` |
| Produto | 1:N | ItemVenda | `idProduto` |

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
