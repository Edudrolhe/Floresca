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

## Database Model (UML — AstahUML Class Diagram)

<div align="center">

<img src="public/database-diagram.svg" alt="Database Diagram - AstahUML Class Diagram" width="100%"/>

</div>

---

### Relacionamentos

| De | Cardinalidade | Relacionamento | Para | FK |
|----|:---:|------|------|-----|
| TipoProduto | 1 : 0..* | cadastra | Produto | `idCategoria` |
| Login | 1 : 0..* | gerencia | Funcionario | `idUsuario` |
| Cliente | 1 : 0..* | realiza | Venda | `idCliente` |
| Funcionario | 1 : 0..* | efetua | Venda | `idFuncionario` |
| FormaPagto | 1 : 0..* | pagamento | Venda | `idFormaPgto` |
| Venda | 1 : 0..* | contem | ItemVenda | `idVenda` + `idProduto` |
| Produto | 1 : 0..* | referencia | ItemVenda | `idProduto` |

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
