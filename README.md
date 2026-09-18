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

<svg width="1100" height="800" viewBox="0 0 1100 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E8EDF2" stroke-width="0.5"/>
    </pattern>
    <!-- Open arrowhead (association) -->
    <marker id="assoc" markerWidth="12" markerHeight="10" refX="11" refY="5" orient="auto">
      <path d="M0,1 L11,5 L0,9" fill="none" stroke="#333" stroke-width="1"/>
    </marker>
    <!-- Diamond (composition - filled) -->
    <marker id="comp" markerWidth="16" markerHeight="12" refX="0" refY="6" orient="auto">
      <path d="M8,0 L16,6 L8,12 L0,6 Z" fill="#333" stroke="#333" stroke-width="0.8"/>
    </marker>
    <!-- Open diamond (aggregation) -->
    <marker id="agg" markerWidth="16" markerHeight="12" refX="0" refY="6" orient="auto">
      <path d="M8,0 L16,6 L8,12 L0,6 Z" fill="#FFFDE7" stroke="#333" stroke-width="0.8"/>
    </marker>
  </defs>

  <!-- Background with grid -->
  <rect width="1100" height="800" fill="#FAFCFF"/>
  <rect width="1100" height="800" fill="url(#grid)"/>

  <!-- Package tag -->
  <path d="M0,8 L0,0 L80,0 L80,16 L68,16" fill="#E8EDF2" stroke="#999" stroke-width="0.8"/>
  <text x="40" y="11" font-family="Arial, sans-serif" font-size="9" fill="#555" text-anchor="middle">pkg Floresca</text>

  <!-- ==================== CLASSES ==================== -->

  <!-- Login (top right) -->
  <g transform="translate(880, 50)">
    <rect width="180" height="100" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="90" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Login</text>
    <line x1="0" y1="22" x2="180" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-iditemUsuario : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <line x1="0" y1="60" x2="180" y2="60" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="74" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="88" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+setDescricao(desc:String):void</text>
  </g>

  <!-- TipoProduto (top left) -->
  <g transform="translate(20, 50)">
    <rect width="170" height="110" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="85" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">TipoProduto</text>
    <line x1="0" y1="22" x2="170" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCategoria : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-categoria : String</text>
    <line x1="0" y1="62" x2="170" y2="62" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCategoria() : String</text>
    <text x="8" y="90" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getProdutos() : Produto[]</text>
    <text x="8" y="104" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+create(cat:String):TipoProduto</text>
  </g>

  <!-- Produto (mid-left) -->
  <g transform="translate(230, 50)">
    <rect width="240" height="230" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="120" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Produto</text>
    <line x1="0" y1="22" x2="240" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="37" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idProduto : int</text>
    <text x="8" y="50" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-codBarras : Decimal</text>
    <text x="8" y="63" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-categoria : String</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-quantidade : int</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-preco : float</text>
    <text x="8" y="115" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-precoOriginal : float?</text>
    <text x="8" y="128" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-parcelas : int?</text>
    <text x="8" y="141" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCategoria : int?</text>
    <line x1="0" y1="150" x2="240" y2="150" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="164" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getPreco() : float</text>
    <text x="8" y="177" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="190" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getTipoProduto():TipoProduto</text>
    <text x="8" y="203" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+isDisponivel() : bool</text>
    <text x="8" y="216" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+updateEstoque(qtd:int):void</text>
  </g>

  <!-- Funcionario (mid-right) -->
  <g transform="translate(580, 50)">
    <rect width="250" height="230" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="125" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Funcionario</text>
    <line x1="0" y1="22" x2="250" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="37" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFuncionario : int</text>
    <text x="8" y="50" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-nome : String</text>
    <text x="8" y="63" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-cpf : String</text>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-telefone : String</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-email : String</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-dataAdmissao : Date?</text>
    <text x="8" y="115" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-salario : float?</text>
    <text x="8" y="128" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idUsuario : int?</text>
    <line x1="0" y1="137" x2="250" y2="137" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="151" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getNome() : String</text>
    <text x="8" y="164" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCpf() : String</text>
    <text x="8" y="177" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
    <text x="8" y="190" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getLogin() : Login</text>
    <text x="8" y="203" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+createVenda(v:Venda):Venda</text>
    <text x="8" y="216" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getSalario() : float</text>
  </g>

  <!-- Cliente (left) -->
  <g transform="translate(20, 340)">
    <rect width="200" height="170" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="100" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">Cliente</text>
    <line x1="0" y1="22" x2="200" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idCliente : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-nome : String</text>
    <text x="8" y="66" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-cpf : String</text>
    <text x="8" y="80" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-telefone : String</text>
    <text x="8" y="94" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-endereco : String</text>
    <text x="8" y="108" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-email : String?</text>
    <line x1="0" y1="118" x2="200" y2="118" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="132" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getNome() : String</text>
    <text x="8" y="145" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
    <text x="8" y="158" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+create(nome:String):Cliente</text>
  </g>

  <!-- FormaPagto (bottom left) -->
  <g transform="translate(20, 590)">
    <rect width="180" height="100" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="90" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">FormaPagto</text>
    <line x1="0" y1="22" x2="180" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idFormaPgto : int</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-descricao : String</text>
    <line x1="0" y1="62" x2="180" y2="62" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getDescricao() : String</text>
    <text x="8" y="90" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVendas() : Venda[]</text>
  </g>

  <!-- Venda (center) -->
  <g transform="translate(300, 420)">
    <rect width="360" height="300" fill="#FFFDE7" stroke="#333" stroke-width="1.2"/>
    <text x="180" y="18" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333" text-anchor="middle">Venda</text>
    <line x1="0" y1="25" x2="360" y2="25" stroke="#333" stroke-width="0.6"/>
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
    <line x1="0" y1="220" x2="360" y2="220" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="234" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+calcularTotal() : float</text>
    <text x="8" y="247" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+finalizarVenda() : void</text>
    <text x="8" y="260" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getCliente() : Cliente</text>
    <text x="8" y="273" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getItens() : ItemVenda[]</text>
    <text x="8" y="286" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getFormaPagto():FormaPagto</text>
  </g>

  <!-- ItemVenda (right) -->
  <g transform="translate(760, 370)">
    <rect width="220" height="130" fill="#FFFDE7" stroke="#333" stroke-width="1"/>
    <text x="110" y="16" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">ItemVenda</text>
    <line x1="0" y1="22" x2="220" y2="22" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="38" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idVenda : int (PK,FK)</text>
    <text x="8" y="52" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">-idProduto : int (PK,FK)</text>
    <line x1="0" y1="62" x2="220" y2="62" stroke="#333" stroke-width="0.6"/>
    <text x="8" y="76" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getSubtotal() : float</text>
    <text x="8" y="89" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getProduto() : Produto</text>
    <text x="8" y="102" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+getVenda() : Venda</text>
    <text x="8" y="115" font-family="Consolas, Menlo, monospace" font-size="9" fill="#333">+updateQtd(qtd:int):void</text>
  </g>

  <!-- ==================== RELATIONSHIPS with labels ==================== -->

  <!-- TipoProduto "cadastra" Produto -->
  <line x1="190" y1="115" x2="230" y2="115" stroke="#333" stroke-width="1"/>
  <text x="195" y="108" font-family="Arial, sans-serif" font-size="8" fill="#333">cadastra</text>
  <text x="194" y="130" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="220" y="108" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- Login "gerencia" Funcionario -->
  <line x1="880" y1="120" x2="830" y2="120" stroke="#333" stroke-width="1"/>
  <text x="842" y="113" font-family="Arial, sans-serif" font-size="8" fill="#333">gerencia</text>
  <text x="872" y="135" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="838" y="135" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- Cliente "realiza" Venda -->
  <path d="M120,510 L120,540 L370,540 L370,580" stroke="#333" stroke-width="1" fill="none"/>
  <text x="128" y="535" font-family="Arial, sans-serif" font-size="8" fill="#333">realiza</text>
  <text x="128" y="555" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="358" y="575" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- Funcionario "efetua" Venda -->
  <path d="M705,280 L705,320 L520,320 L520,420" stroke="#333" stroke-width="1" fill="none"/>
  <text x="660" y="315" font-family="Arial, sans-serif" font-size="8" fill="#333">efetua</text>
  <text x="713" y="315" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="508" y="415" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- FormaPagto "pagamento" Venda -->
  <path d="M110,690 L110,730 L480,730 L480,720" stroke="#333" stroke-width="1" fill="none"/>
  <text x="200" y="725" font-family="Arial, sans-serif" font-size="8" fill="#333">pagamento</text>
  <text x="118" y="725" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="468" y="715" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- Venda "contem" ItemVenda (composition) -->
  <line x1="660" y1="570" x2="760" y2="500" stroke="#333" stroke-width="1" marker-start="url(#comp)"/>
  <text x="675" y="525" font-family="Arial, sans-serif" font-size="8" fill="#333">contem</text>
  <text x="648" y="565" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>
  <text x="748" y="495" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>

  <!-- ItemVenda "referencia" Produto -->
  <path d="M870,370 L870,300 L600,300 L600,280" stroke="#333" stroke-width="1" fill="none"/>
  <text x="710" y="295" font-family="Arial, sans-serif" font-size="8" fill="#333">referencia</text>
  <text x="878" y="310" font-family="Arial, sans-serif" font-size="8" fill="#555">0..*</text>
  <text x="608" y="278" font-family="Arial, sans-serif" font-size="8" fill="#555">1</text>

  <!-- ==================== LEGEND ==================== -->
  <g transform="translate(20, 740)">
    <rect width="1060" height="50" rx="3" fill="#FFFDE7" stroke="#CCC" stroke-width="0.8"/>
    <text x="16" y="16" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#333">LEGENDA</text>
    <!-- Composition -->
    <path d="M20,34 L28,28 L36,34 L28,40 Z" fill="#333" stroke="#333" stroke-width="0.8"/>
    <text x="42" y="38" font-family="Arial, sans-serif" font-size="8" fill="#555">Composicao</text>
    <!-- Aggregation -->
    <path d="M120,34 L128,28 L136,34 L128,40 Z" fill="#FFFDE7" stroke="#333" stroke-width="0.8"/>
    <text x="142" y="38" font-family="Arial, sans-serif" font-size="8" fill="#555">Agregacao</text>
    <!-- Association -->
    <line x1="220" y1="34" x2="250" y2="34" stroke="#333" stroke-width="1"/>
    <path d="M244,30 L254,34 L244,38" fill="none" stroke="#333" stroke-width="1"/>
    <text x="260" y="38" font-family="Arial, sans-serif" font-size="8" fill="#555">Associacao</text>
    <!-- Multiplicity -->
    <text x="360" y="38" font-family="Arial, sans-serif" font-size="8" fill="#555">1 = Um | 0..* = Zero ou Mais</text>
    <!-- Stereotypes -->
    <text x="560" y="38" font-family="Arial, sans-serif" font-size="8" fill="#888">«create» «override» = Estereotipos</text>
    <!-- Notation -->
    <text x="800" y="38" font-family="Arial, sans-serif" font-size="8" fill="#888">Notacao: AstahUML Class Diagram</text>
  </g>
</svg>

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
