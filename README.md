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

<svg width="1100" height="780" viewBox="0 0 1100 780" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E8EDF2" stroke-width="0.5"/>
    </pattern>
    <!-- Open arrowhead (association) -->
    <marker id="assoc" markerWidth="12" markerHeight="10" refX="11" refY="5" orient="auto">
      <path d="M0,1 L11,5 L0,9" fill="none" stroke="#333" stroke-width="1"/>
    </marker>
    <!-- Diamond (composition) -->
    <marker id="comp" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto">
      <path d="M7,0 L14,5 L7,10 L0,5 Z" fill="#333" stroke="#333" stroke-width="0.8"/>
    </marker>
    <!-- Open diamond (aggregation) -->
    <marker id="agg" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto">
      <path d="M7,0 L14,5 L7,10 L0,5 Z" fill="#FFFFFF" stroke="#333" stroke-width="0.8"/>
    </marker>
  </defs>

  <!-- Background with grid -->
  <rect width="1100" height="780" fill="#FAFCFF"/>
  <rect width="1100" height="780" fill="url(#grid)"/>

  <!-- Package tag -->
  <path d="M0,8 L0,0 L80,0 L80,16 L68,16" fill="#E8EDF2" stroke="#999" stroke-width="0.8"/>
  <text x="40" y="11" font-family="Arial, sans-serif" font-size="9" fill="#555" text-anchor="middle">pkg Floresca</text>

  <!-- ==================== CLASSES ==================== -->

  <!-- Login -->
  <g transform="translate(900, 50)">
    <rect width="160" height="100" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <!-- Name -->
    <text x="80" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Login</text>
    <line x1="0" y1="22" x2="160" y2="22" stroke="#333" stroke-width="0.6"/>
    <!-- Attributes -->
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-iditemUsuario : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#333" stroke-width="0.6"/>
    <!-- Methods -->
    <text x="8" y="74" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="88" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+setDescricao(desc : String) : void</text>
  </g>

  <!-- TipoProduto -->
  <g transform="translate(20, 50)">
    <rect width="160" height="100" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="80" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">TipoProduto</text>
    <line x1="0" y1="22" x2="160" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCategoria : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-categoria : String</text>
    <line x1="0" y1="60" x2="160" y2="60" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="74" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCategoria() : String</text>
    <text x="8" y="88" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getProdutos() : Produto[]</text>
  </g>

  <!-- Produto -->
  <g transform="translate(260, 50)">
    <rect width="230" height="210" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="115" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Produto</text>
    <line x1="0" y1="22" x2="230" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="37" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idProduto : int</text>
    <text x="8" y="50" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-codBarras : Decimal</text>
    <text x="8" y="63" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-categoria : String</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-quantidade : int</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-preco : float</text>
    <text x="8" y="115" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-precoOriginal : float?</text>
    <text x="8" y="128" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-parcelas : int?</text>
    <text x="8" y="141" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCategoria : int?</text>
    <line x1="0" y1="150" x2="230" y2="150" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="165" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getPreco() : float</text>
    <text x="8" y="178" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="191" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getTipoProduto() : TipoProduto</text>
    <text x="8" y="204" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+isDisponivel() : bool</text>
  </g>

  <!-- Funcionario -->
  <g transform="translate(570, 50)">
    <rect width="240" height="210" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="120" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Funcionario</text>
    <line x1="0" y1="22" x2="240" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="37" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFuncionario : int</text>
    <text x="8" y="50" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-nome : String</text>
    <text x="8" y="63" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-cpf : String</text>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-telefone : String</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-email : String</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-dataAdmissao : Date?</text>
    <text x="8" y="115" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-salario : float?</text>
    <text x="8" y="128" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idUsuario : int?</text>
    <line x1="0" y1="137" x2="240" y2="137" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="152" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getNome() : String</text>
    <text x="8" y="165" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCpf() : String</text>
    <text x="8" y="178" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
    <text x="8" y="191" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getLogin() : Login</text>
    <text x="8" y="204" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+createVenda(v : Venda) : Venda</text>
  </g>

  <!-- Cliente -->
  <g transform="translate(20, 310)">
    <rect width="200" height="160" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="100" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Cliente</text>
    <line x1="0" y1="22" x2="200" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCliente : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-nome : String</text>
    <text x="8" y="66" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-cpf : String</text>
    <text x="8" y="80" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-telefone : String</text>
    <text x="8" y="94" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-endereco : String</text>
    <text x="8" y="108" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-email : String?</text>
    <line x1="0" y1="118" x2="200" y2="118" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="133" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getNome() : String</text>
    <text x="8" y="146" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
  </g>

  <!-- FormaPagto -->
  <g transform="translate(20, 560)">
    <rect width="170" height="100" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="85" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">FormaPagto</text>
    <line x1="0" y1="22" x2="170" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFormaPgto : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <line x1="0" y1="62" x2="170" y2="62" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="90" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
  </g>

  <!-- Venda (Central) -->
  <g transform="translate(300, 340)">
    <rect width="340" height="280" fill="#FFFDE7" stroke="#333" stroke-width="1.2"/>
    <text x="170" y="18" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333" text-anchor="middle">Venda</text>
    <line x1="0" y1="25" x2="340" y2="25" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="42" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idVenda : int</text>
    <text x="8" y="55" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-dataVenda : Date</text>
    <text x="8" y="68" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-produto : String</text>
    <text x="8" y="81" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-quantidade : int</text>
    <text x="8" y="94" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-preco : float</text>
    <text x="8" y="107" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-totalVenda : float</text>
    <text x="8" y="120" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-status : String</text>
    <text x="8" y="133" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-dadosCliente : String?</text>
    <text x="8" y="146" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-observacoes : String?</text>
    <text x="8" y="159" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idPagamentoExterno : String?</text>
    <text x="8" y="172" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-linkPagamento : String?</text>
    <text x="8" y="185" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCliente : int?</text>
    <text x="8" y="198" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFuncionario : int?</text>
    <text x="8" y="211" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFormaPgto : int</text>
    <line x1="0" y1="220" x2="340" y2="220" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="235" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+calcularTotal() : float</text>
    <text x="8" y="248" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+finalizarVenda() : void</text>
    <text x="8" y="261" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCliente() : Cliente</text>
    <text x="8" y="274" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getItens() : ItemVenda[]</text>
  </g>

  <!-- ItemVenda -->
  <g transform="translate(760, 420)">
    <rect width="210" height="110" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="105" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">ItemVenda</text>
    <line x1="0" y1="22" x2="210" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idVenda : int (PK,FK)</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idProduto : int (PK,FK)</text>
    <line x1="0" y1="62" x2="210" y2="62" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getSubtotal() : float</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getProduto() : Produto</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVenda() : Venda</text>
  </g>

  <!-- ==================== RELATIONSHIPS ==================== -->

  <!-- TipoProduto 1 ── 0..* Produto -->
  <line x1="180" y1="110" x2="260" y2="110" stroke="#333" stroke-width="1" marker-end="url(#assoc)"/>
  <text x="185" y="104" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="248" y="104" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- Login 1 ── 0..* Funcionario -->
  <line x1="900" y1="120" x2="810" y2="120" stroke="#333" stroke-width="1" marker-start="url(#assoc)"/>
  <text x="894" y="114" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="818" y="114" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- Cliente 1 ── 0..* Venda -->
  <path d="M120,470 L120,490 L370,490 L370,560" stroke="#333" stroke-width="1" fill="none" marker-end="url(#assoc)"/>
  <text x="128" y="486" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="358" y="555" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- Funcionario 1 ── 0..* Venda -->
  <path d="M690,260 L690,290 L510,290 L510,340" stroke="#333" stroke-width="1" fill="none" marker-end="url(#assoc)"/>
  <text x="698" y="286" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="498" y="335" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- FormaPagto 1 ── 0..* Venda -->
  <path d="M105,660 L105,690 L460,690 L460,620" stroke="#333" stroke-width="1" fill="none" marker-end="url(#assoc)"/>
  <text x="113" y="686" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="448" y="615" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- Venda 1 ── 0..* ItemVenda -->
  <path d="M640,620 L640,650 L810,650 L810,580" stroke="#333" stroke-width="1" fill="none" marker-end="url(#assoc)"/>
  <text x="648" y="646" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>
  <text x="798" y="575" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>

  <!-- ItemVenda 0..* ── 1 Produto -->
  <path d="M865,420 L865,380 L640,380 L640,260" stroke="#333" stroke-width="1" fill="none" marker-end="url(#assoc)"/>
  <text x="873" y="390" font-family="Arial, sans-serif" font-size="9" fill="#555">0..*</text>
  <text x="648" y="270" font-family="Arial, sans-serif" font-size="9" fill="#555">1</text>

  <!-- ==================== LEGEND ==================== -->
  <g transform="translate(20, 710)">
    <rect width="1060" height="55" rx="3" fill="#FFFDE7" stroke="#CCC" stroke-width="0.8"/>
    <text x="16" y="18" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#333">LEGENDA</text>
    <!-- Association -->
    <line x1="20" y1="36" x2="50" y2="36" stroke="#333" stroke-width="1"/>
    <path d="M44,32 L54,36 L44,40" fill="none" stroke="#333" stroke-width="1"/>
    <text x="60" y="40" font-family="Arial, sans-serif" font-size="9" fill="#555">Associacao</text>
    <!-- Composition -->
    <path d="M140,36 L148,30 L156,36 L148,42 Z" fill="#333" stroke="#333" stroke-width="0.8"/>
    <text x="164" y="40" font-family="Arial, sans-serif" font-size="9" fill="#555">Composicao</text>
    <!-- Aggregation -->
    <path d="M260,36 L268,30 L276,36 L268,42 Z" fill="#FFFDE7" stroke="#333" stroke-width="0.8"/>
    <text x="284" y="40" font-family="Arial, sans-serif" font-size="9" fill="#555">Agregacao</text>
    <!-- Multiplicity -->
    <text x="390" y="40" font-family="Arial, sans-serif" font-size="9" fill="#555">1 = Um | 0..* = Zero ou Mais | 1..* = Um ou Mais</text>
    <!-- Notation -->
    <text x="700" y="40" font-family="Arial, sans-serif" font-size="9" fill="#888">Notacao: AstahUML Class Diagram</text>
  </g>
</svg>

</div>

---

### Relacionamentos

| De | Cardinalidade | Para | FK |
|----|:---:|------|-----|
| TipoProduto | 1 : 0..* | Produto | `idCategoria` |
| Login | 1 : 0..* | Funcionario | `idUsuario` |
| Cliente | 1 : 0..* | Venda | `idCliente` |
| Funcionario | 1 : 0..* | Venda | `idFuncionario` |
| FormaPagto | 1 : 0..* | Venda | `idFormaPgto` |
| Venda | 1 : 0..* | ItemVenda | `idVenda` + `idProduto` |
| Produto | 1 : 0..* | ItemVenda | `idProduto` |

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
