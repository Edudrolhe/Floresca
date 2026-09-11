# Prompt: Gerador de Documentação Técnica Completa — document-generator-mcp

## Contexto

Este prompt gera documentação técnica completa e profissional para o projeto **Floresca Floricultura** usando o MCP server `document-generator-mcp`. O documento será gerado em formato Word (.docx) e/ou PDF com formatação profissional, syntax highlighting e diagramas.

## Configuração do MCP Server

```json
{
  "mcpServers": {
    "document-generator": {
      "command": "npx",
      "args": ["--yes", "--cache", "/tmp/.npx-cache", "document-generator-mcp@latest"]
    }
  }
}
```

## Estrutura do Documento

O documento final deve conter as seguintes seções:

---

### CAPA
- Título: "Documentação Técnica — Floresca Floricultura"
- Subtítulo: "Sistema de E-Commerce para Floricultura"
- Data de geração
- Versão do documento
- Autor/Equipe

---

### SUMÁRIO
- Lista de todas as seções com números de página

---

### 1. VISÃO GERAL DO PROJETO

#### 1.1 Descrição do Projeto
- Objetivo do sistema
- Público-alvo
- Funcionalidades principais

#### 1.2 Stack Tecnológica
| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Framework | Next.js | 16 (App Router, Turbopack) |
| Linguagem | TypeScript | - |
| ORM/DB | Prisma Composer + raw SQL | Neon PostgreSQL |
| Autenticação | NextAuth v5 | JWT strategy |
| Frontend | React + Tailwind CSS | - |
| Pagamentos | Mercado Pago SDK | v3 |
| Email | Resend | React Email |
| Deploy | Vercel | - |

#### 1.3 Diagrama de Arquitetura
- Descrição do fluxo de dados
- Componentes do sistema
- Integrações externas

---

### 2. ESTRUTURA DE DIRETÓRIOS

#### 2.1 Mapa do Projeto
```
floresca-floricultura/
├── app/                    # App Router (Next.js 16)
│   ├── _components/        # Componentes React
│   │   ├── checkout/       # Componentes do checkout
│   │   ├── ui/             # Componentes genéricos (shadcn)
│   │   └── ...
│   ├── _emails/            # Templates de email (React Email)
│   ├── _lib/               # Utilitários e ações do servidor
│   │   ├── actions/        # Server Actions (payments, products, etc.)
│   │   ├── validations.ts  # Schemas Zod
│   │   └── utils.ts        # Funções auxiliares
│   ├── admin/              # Rotas do painel administrativo
│   ├── api/                # Rotas de API (webhooks, etc.)
│   ├── checkout/           # Página de checkout
│   ├── obrigado/           # Página de confirmação
│   └── layout.tsx          # Layout principal
├── src/prisma/             # Configuração do banco de dados
├── public/                 # Arquivos estáticos
├── docs/                   # Documentação
└── migrations/             # Migrações do banco
```

#### 2.2 Descrição de Cada Diretório
- Tabela com nome, propósito e arquivos principais

---

### 3. BANCO DE DADOS

#### 3.1 Schema Completo
- Tabelas principais: Venda, ItemVenda, Produto, Funcionario, Cliente, FormaPagto, TipoProduto
- Relacionamentos entre tabelas
- Tipos de dados de cada coluna

#### 3.2 Tabela: Venda
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| idVenda | INTEGER | PK, auto-incremento |
| dataVenda | DATE | Data da venda |
| produto | TEXT | Descrição dos produtos |
| quantidade | INTEGER | Quantidade total |
| preco | DECIMAL | Preço unitário |
| totalVenda | DECIMAL | Valor total |
| idFormaPgto | INTEGER | FK → FormaPagto |
| idFuncionario | INTEGER | FK → Funcionario |
| idCliente | INTEGER | FK → Cliente |
| status | TEXT | Status da venda |
| dadosCliente | JSONB | Dados do cliente |
| linkPagamento | TEXT | Link do Mercado Pago |
| idPagamentoExterno | TEXT | ID do pagamento externo |
| observacoes | TEXT | Observações |

#### 3.3 Queries Importantes
- Listagem de vendas com JOIN
- Cálculo de totais
- Relatórios por período

---

### 4. AUTENTICAÇÃO E SEGURANÇA

#### 4.1 Fluxo de Autenticação
- NextAuth v5 com JWT strategy
- Providers: Google OAuth + Credentials
- Gerenciamento de sessão

#### 4.2 Controle de Acesso
- Middleware de proteção de rotas
- Função `requireAdmin()`
- Verificação de role no banco

#### 4.3 Medidas de Segurança Implementadas
- Validação de输入 com Zod
- CSRF protection
- Rate limiting (pendente)
- Webhook signature verification

---

### 5. API E SERVER ACTIONS

#### 5.1 Server Actions (app/_lib/actions/)

##### payments.ts
| Função | Método | Descrição |
|--------|--------|-----------|
| `createPayment()` | POST | Cria pagamento Pix via Mercado Pago |
| `processCardPayment()` | POST | Processa pagamento com cartão |

##### products.ts
| Função | Método | Descrição |
|--------|--------|-----------|
| `getProducts()` | GET | Lista todos os produtos |
| `getProduct(id)` | GET | Busca produto por ID |
| `createProduct(data)` | POST | Cria novo produto |
| `updateProduct(id, data)` | PUT | Atualiza produto |
| `deleteProduct(id)` | DELETE | Remove produto |
| `uploadProductImage(id, file)` | POST | Upload de imagem |
| `getCategorias()` | GET | Lista categorias |

##### vendas.ts
| Função | Método | Descrição |
|--------|--------|-----------|
| `getVendas()` | GET | Lista vendas com JOIN |
| `getVenda(id)` | GET | Busca venda por ID |
| `createVenda(data)` | POST | Cria nova venda |
| `updateVenda(id, data)` | PUT | Atualiza venda |
| `deleteVenda(id)` | DELETE | Remove venda |

##### funcionarios.ts
| Função | Método | Descrição |
|--------|--------|-----------|
| `getFuncionarios()` | GET | Lista funcionários |
| `getFuncionario(id)` | GET | Busca funcionário |
| `createFuncionario(data)` | POST | Cria funcionário |
| `updateFuncionario(id, data)` | PUT | Atualiza funcionário |
| `deleteFuncionario(id)` | DELETE | Remove funcionário |

#### 5.2 Rotas de API (app/api/)

##### /api/webhooks/mercadopago
- Método: POST
- Descrição: Webhook do Mercado Pago para atualização de status
- Payload: `{ type: 'payment', data: { id: string } }`

##### /api/produtos
- Método: GET
- Descrição: Retorna produtos para o frontend

#### 5.3 Validações (app/_lib/validations.ts)
- Schemas Zod para cada entidade
- CheckoutSchema com todos os campos obrigatórios

---

### 6. FRONTEND

#### 6.1 Páginas Principais

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | HomePage | Página inicial com produtos |
| `/produtos` | ProductsPage | Catálogo de produtos |
| `/checkout` | CheckoutPage | Finalização da compra |
| `/obrigado` | ObrigadoPage | Confirmação do pedido |
| `/admin` | AdminLayout | Painel administrativo |

#### 6.2 Componentes do Checkout

##### CustomerForm
- Campos: Nome, Telefone, Email, CPF, Endereço
- Validação em tempo real

##### PaymentMethodSelector
- Opções: Pix ou Cartão de Crédito
- Integração com Brick do Mercado Pago

##### CardForm
- Integração com Card Payment Brick
- Processamento direto no callback onSubmit

##### PayButton
- Botão para pagamento Pix
- Geração de QR Code

##### OrderSummary
- Resumo do pedido
- Lista de itens e totais

#### 6.3 Estado Global
- React Context para carrinho
- localStorage para persistência

---

### 7. INTEGRAÇÕES EXTERNAS

#### 7.1 Mercado Pago

##### Configuração
```typescript
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})
```

##### Fluxo Pix
1. Cliente seleciona Pix
2. `createPayment()` cria Preference
3. Retorna `init_point` para redirecionamento
4. Webhook notifica pagamento

##### Fluxo Cartão de Crédito
1. Cliente preenche dados no Card Payment Brick
2. Brick gera token seguro
3. `processCardPayment()` envia para API
4. Webhook notifica status

##### Webhook
- URL: `/api/webhooks/mercadopago`
- Verificação de assinatura: `MERCADO_PAGO_WEBHOOK_SECRET`
- Processamento assíncrono

#### 7.2 Resend (Email)

##### Configuração
```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
```

##### Templates
- `order-confirmation.tsx` — Email de confirmação de pedido
- Envio automático após pagamento aprovado

#### 7.3 Neon (PostgreSQL)

##### Configuração
```typescript
// DATABASE_URL via environment variable
// Prisma Composer para queries
// raw SQL via tx.unsafe() para queries complexas
```

---

### 8. DEPLOY E CONFIGURAÇÃO

#### 8.1 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexão com Neon | Sim |
| `AUTH_SECRET` | Secret para NextAuth | Sim |
| `GOOGLE_CLIENT_ID` | Client ID do Google OAuth | Sim |
| `GOOGLE_CLIENT_SECRET` | Client Secret do Google | Sim |
| `MERCADO_PAGO_ACCESS_TOKEN` | Token de acesso MP | Sim |
| `MERCADO_PAGO_PUBLIC_KEY` | Chave pública MP | Sim |
| `MERCADO_PAGO_WEBHOOK_SECRET` | Secret do webhook MP | Não |
| `RESEND_API_KEY` | Chave da API Resend | Sim |
| `NEXT_PUBLIC_BASE_URL` | URL base da aplicação | Sim |

#### 8.2 Deploy no Vercel
1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Build automático

#### 8.3 Configuração do Mercado Pago
1. Criar aplicação no painel MP
2. Configurar credenciais de teste
3. Configurar webhook
4. Ativar credenciais de produção

---

### 9. GUIA DE DESENVOLVIMENTO

#### 9.1 Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Neon (banco de dados)
- Conta no Mercado Pago (pagamentos)
- Conta no Resend (emails)

#### 9.2 Setup Local
```bash
# 1. Clonar repositório
git clone <url>

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 4. Rodar migrações
npx prisma migrate dev

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

#### 9.3 Comandos Úteis
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | Verifica código com ESLint |
| `npx prisma migrate dev` | Roda migrações |
| `npx prisma db push` | Sincroniza schema com banco |

#### 9.4 Padrões de Código
- Usar Server Actions para mutações
- Validação com Zod em todas as entradas
- Tratamento de erros com try/catch
- `requireAdmin()` em todas as ações administrativas

---

### 10. ROADMAP E MELHORIAS

#### 10.1 Prioridades
| Prioridade | Item | Status |
|------------|------|--------|
| P1 | Validação de CPF no checkout | ✅ Concluído |
| P1 | Remoção de logs sensíveis | ✅ Concluído |
| P2 | Verificação de webhook | ✅ Concluído |
| P2 | Rate limiting no login | ⏳ Pendente |
| P2 | Validação de uploads | ✅ Concluído |
| P3 | Row-Level Security | ⏳ Pendente |
| P3 | Migração para Prisma ORM | ⏳ Pendente |

#### 10.2 Funcionalidades Futuras
- Sistema de cupons de desconto
- Programa de fidelidade
- App mobile
- Integração com transportadoras

---

### 11. REFERÊNCIAS

#### 11.1 Documentação Externa
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Prisma Composer Docs](https://www.prisma.io/docs)
- [Mercado Pago Docs](https://www.mercadopago.com.br/developers)
- [Resend Docs](https://resend.com/docs)
- [NextAuth v5 Docs](https://next-auth.js.org/)

#### 11.2 Contato
- Suporte: [contato@floresca.com.br]
- Repositório: [GitHub]

---

## Instruções de Geração

### Fase 1: Análise do Código
1. Ler todos os arquivos fonte do projeto
2. Extrair schemas do banco de dados
3. Mapear todas as Server Actions
4. Identificar componentes React
5. Documentar integrações externas

### Fase 2: Geração do Documento
1. Usar `gerar_documento_word` ou `gerar_documento_pdf`
2. Formatar com Markdown suportado
3. Incluir blocos de código com syntax highlighting
4. Adicionar tabelas formatadas
5. Gerar sumário automático

### Fase 3: Validação
1. Verificar todas as seções estão presentes
2. Confirmar que tabelas estão formatadas
3. Validar syntax highlighting nos códigos
4. Testar links internos

---

## Exemplo de Uso

```
"Gere documentação técnica completa do projeto Floresca Floricultura 
em formato Word (.docx) e PDF. Siga a estrutura definida no prompt 
acima, analisando todo o código-fonte e gerando um documento profissional 
com tabelas, blocos de código e syntax highlighting."
```

---

## Critérios de Qualidade

- [ ] Todas as seções obrigatórias estão presentes
- [ ] Tabelas formatadas corretamente
- [ ] Blocos de código com syntax highlighting
- [ ] Sumário com números de página
- [ ] Capa profissional
- [ ] Linguagem clara e objetiva (Português BR)
- [ ] Código de exemplo funcional
- [ ] Referências atualizadas
