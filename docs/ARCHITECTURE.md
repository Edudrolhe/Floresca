# Arquitetura do Sistema

## Visão Geral da Arquitetura

O Floresca Floricultura utiliza uma arquitetura full-stack moderna com Next.js App Router no frontend e Prisma ORM para comunicação com o banco de dados PostgreSQL.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE                                  │
│                   (Browser / App)                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP/HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS 16                                  │
│              (App Router + React 19)                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Pages     │  │   Layouts   │  │ Components  │             │
│  │  (app/)     │  │  (layout)   │  │  (React)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Prisma Client
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRISMA 8 (RC)                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Schema    │  │  Composer   │  │   Client    │             │
│  │ (contract)  │  │  (module)   │  │  (queries)  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   POSTGRESQL 15+                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Cliente  │ │ Produto  │ │  Venda   │ │  Login   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │Funcionar │ │TipoProdt │ │ItemVenda │ │FormaPgt  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Camadas da Aplicação

### 1. Frontend (Next.js App Router)

**Localização:** `app/`

O frontend utiliza Next.js 16 com App Router, que suporta:

- Server Components (React 19)
- Client Components
- Server Actions
- Layouts aninhados

**Arquivos principais:**

- `app/layout.tsx` - Layout raiz com fontes Geist
- `app/page.tsx` - Página inicial
- `app/globals.css` - Estilos globais com Tailwind CSS

### 2. Banco de Dados (Prisma + PostgreSQL)

**Localização:** `src/prisma/`

O banco de dados é gerenciado pelo Prisma 8 (Release Candidate) com o sistema de "contracts":

**Arquivos do Prisma:**

- `contract.prisma` - Definição do schema do banco
- `contract.json` - Contrato gerado (metadata ORM)
- `contract.d.ts` - Tipos TypeScript gerados
- `composer.ts` - Configuração do Prisma Composer
- `db.ts` - Singleton de conexão com o banco

### 3. Infraestrutura

**Docker:**

- `docker-compose.yml` - Serviço PostgreSQL local para desenvolvimento

**Deploy:**

- Vercel (recomendado)
- Neon (banco de dados cloud)

## Fluxo de Dados

### Consulta de Produtos

```
1. Usuário acessa página de produtos
2. Server Component busca dados via Prisma
3. Prisma gera query SQL otimizada
4. PostgreSQL executa consulta
5. Dados retornam como JSON
6. React renderiza componente com dados
```

### Processamento de Venda

```
1. Usuário seleciona produtos
2. Frontend envia dados da venda
3. Prisma cria registro na tabela Venda
4. Prisma cria registros em ItemVenda
5. Estoque é atualizado no Produto
6. Confirmação retornada ao usuário
```

## Tecnologias Utilizadas

### Frontend

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **Tailwind CSS 4** - Framework CSS utility-first
- **TypeScript 5** - Tipagem estática

### Backend

- **Prisma 8 (RC)** - ORM com sistema de contracts
- **Prisma Composer** - Módulos e serviços composáveis
- **PostgreSQL 15+** - Banco de dados relacional

### DevOps

- **Docker Compose** - Containerização local
- **ESLint** - Análise estática de código
- **Vercel** - Plataforma de deploy

## Padrões de Código

### Estrutura de Diretórios

```
src/prisma/
├── contract.prisma    # Schema do banco
├── contract.json      # Contrato gerado
├── contract.d.ts      # Tipos TypeScript
├── composer.ts        # Configuração Composer
└── db.ts              # Conexão singleton

app/
├── layout.tsx         # Layout principal
├── page.tsx           # Página inicial
└── globals.css        # Estilos globais
```

### Conexão com Banco

O arquivo `db.ts` implementa um singleton para evitar múltiplas conexões:

```typescript
// Padrão singleton para Prisma Client
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Naming Conventions

- **Tabelas:** PascalCase (ex: `Cliente`, `TipoProduto`)
- **Colunas:** camelCase (ex: `idCliente`, `dataAdmissao`)
- **Relacionamentos:** camelCase (ex: `vendas`, `funcionarios`)
- **Foreign Keys:** prefixo `id` (ex: `idCategoria`, `idFuncionario`)

## Segurança

- **Variáveis de ambiente:** Sensíveis armazenadas em `.env`
- **Prisma Client:** Validação automática de queries
- **TypeScript:** Segurança de tipos em tempo de compilação
- **ESLint:** Regras de qualidade de código

## Performance

- **Server Components:** Renderização no servidor para SEO e performance
- **Prisma Client:** Queries otimizadas e cache de conexão
- **Next.js:** Otimações automáticas (code splitting, lazy loading)
- **Tailwind CSS:** CSS mínimo em produção via purging

## Escalabilidade

### Horizontal

- Deploy em múltiplas regiões via Vercel
- Read replicas do PostgreSQL (Neon)

### Vertical

- Prisma Composer para gerenciamento de infraestrutura
- Neon autoscaling para banco de dados

## Próximos Passos Recomendados

1. Implementar páginas CRUD para cada entidade
2. Criar API routes para operações REST
3. Adicionar autenticação com NextAuth.js
4. Implementar middleware para proteção de rotas
5. Criar testes unitários e de integração
6. Adicionar validação de formulários (Zod)
7. Implementar tratamento de erros global
8. Criar dashboard com métricas de vendas
