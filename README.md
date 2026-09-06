# Floresca Floricultura

Sistema de gerenciamento para floricultura desenvolvido com Next.js 16, React 19, Prisma 8 e PostgreSQL.

## Visão Geral

O **Floresca** é uma aplicação full-stack para gerenciamento de operações de uma floricultura, incluindo cadastro de clientes, funcionários, produtos, vendas e formas de pagamento.

## Funcionalidades

- **Cadastro de Clientes** - Gerenciamento completo de clientes (nome, CPF, telefone, endereço, email)
- **Gestão de Funcionários** - Cadastro e administração de funcionários com vínculo ao sistema de login
- **Controle de Produtos** - Cadastro de produtos com código de barras, categoria, estoque e preços
- **Registro de Vendas** - Sistema de vendas com cálculo automático de totais e itens da venda
- **Formas de Pagamento** - Suporte a múltiplas formas de pagamento (cartão crédito, débito, vale refeição, dinheiro)
- **Categorias de Produtos** - Organização de produtos por categorias (ex: FLORES)

## Tech Stack

| Tecnologia     | Versão       | Propósito                       |
| -------------- | ------------ | ------------------------------- |
| Next.js        | 16.3.4       | Framework React (App Router)    |
| React          | 19.2.8       | Biblioteca de UI                |
| TypeScript     | ^5           | Tipagem estática                |
| Tailwind CSS   | ^4           | Framework CSS utility-first     |
| Prisma         | ^8.0.0-rc.13 | ORM (Release Candidate)         |
| PostgreSQL     | 15+          | Banco de dados                  |
| Docker Compose | -            | Serviço local de banco de dados |

## Pré-requisitos

- Node.js v18+
- npm
- PostgreSQL 15+ (via Docker ou Neon cloud)
- Cliente `psql` (para seed do banco)

## Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

**Opção A - Docker (local):**

```bash
docker-compose up -d
```

Inicia PostgreSQL 15 na porta 5432 com:

- Usuário: `postgres`
- Senha: `postgres`
- Banco: `mydb`

**Opção B - Neon (cloud):**

A configuração já está no arquivo `.env` com a conexão do Neon.

### 3. Configurar schema do banco

```bash
npm run db:update
npm run db:migrate
```

### 4. Gerar contrato Prisma

```bash
npm run contract:emit
```

### 5. Popula dados iniciais

```bash
npm run db:seed
```

### 6. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

| Script          | Comando                | Descrição                    |
| --------------- | ---------------------- | ---------------------------- |
| `dev`           | `next dev`             | Servidor de desenvolvimento  |
| `build`         | `next build`           | Build para produção          |
| `start`         | `next start`           | Iniciar servidor de produção |
| `lint`          | `eslint`               | Verificação de código        |
| `db:update`     | `prisma db update`     | Atualizar banco              |
| `db:migrate`    | `prisma db migrate`    | Executar migrações           |
| `db:seed`       | `bash seed.sh`         | Popular dados iniciais       |
| `contract:emit` | `prisma contract emit` | Gerar contratos TypeScript   |

## Estrutura do Projeto

```
floresca-floricultura/
├── app/                          # Next.js App Router (páginas)
│   ├── globals.css               # Estilos globais (Tailwind CSS)
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página inicial
│
├── src/
│   └── prisma/                   # Camada de banco de dados
│       ├── contract.prisma       # Schema Prisma
│       ├── contract.json         # Contrato gerado
│       ├── contract.d.ts         # Tipos TypeScript
│       ├── composer.ts           # Configuração Prisma Composer
│       └── db.ts                 # Conexão singleton
│
├── migrations/                   # Histórico de migrações
├── public/                       # Assets estáticos
├── docker-compose.yml            # Serviço PostgreSQL local
├── prisma.config.ts              # Configuração Prisma ORM
├── seed.sh                       # Script de seed
└── package.json                  # Dependências
```

## Modelo de Dados

### Tabelas Principais

#### Cliente

| Campo     | Tipo         | Descrição              |
| --------- | ------------ | ---------------------- |
| idCliente | Int (PK)     | Identificador único    |
| nome      | VarChar(50)  | Nome do cliente        |
| cpf       | VarChar(15)  | CPF (documento fiscal) |
| telefone  | VarChar(15)  | Telefone de contato    |
| endereco  | VarChar(50)  | Endereço completo      |
| email     | VarChar(50)? | Email (opcional)       |

#### Produto

| Campo       | Tipo        | Descrição              |
| ----------- | ----------- | ---------------------- |
| idProduto   | Int (PK)    | Identificador único    |
| codBarras   | Decimal     | Código de barras       |
| descricao   | VarChar(50) | Descrição do produto   |
| categoria   | VarChar(50) | Nome da categoria      |
| quantidade  | Int         | Quantidade em estoque  |
| preco       | Float       | Preço unitário         |
| idCategoria | Int (FK)    | Chave para TipoProduto |

#### Funcionario

| Campo         | Tipo        | Descrição           |
| ------------- | ----------- | ------------------- |
| idFuncionario | Int (PK)    | Identificador único |
| nome          | VarChar(50) | Nome do funcionário |
| cpf           | VarChar(50) | CPF                 |
| telefone      | VarChar(15) | Telefone            |
| email         | VarChar(50) | Email               |
| dataAdmissao  | Date?       | Data de admissão    |
| salario       | Float?      | Salário             |
| idUsuario     | Int (FK)    | Chave para Login    |

#### Venda

| Campo         | Tipo        | Descrição               |
| ------------- | ----------- | ----------------------- |
| idVenda       | Int (PK)    | Identificador único     |
| dataVenda     | Date        | Data da venda           |
| produto       | VarChar(50) | Nome do produto vendido |
| quantidade    | Int         | Quantidade vendida      |
| preco         | Float       | Preço unitário          |
| totalVenda    | Float       | Valor total da venda    |
| idFormaPgto   | Int (FK)    | Forma de pagamento      |
| idFuncionario | Int (FK)    | Funcionário responsável |
| idCliente     | Int (FK)?   | Cliente (opcional)      |

#### Login

| Campo         | Tipo        | Descrição           |
| ------------- | ----------- | ------------------- |
| iditemUsuario | Int (PK)    | Identificador único |
| descricao     | VarChar(50) | Perfil (ex: "ADM")  |

#### TipoProduto

| Campo       | Tipo        | Descrição           |
| ----------- | ----------- | ------------------- |
| idCategoria | Int (PK)    | Identificador único |
| categoria   | VarChar(50) | Nome da categoria   |

#### FormaPagto

| Campo       | Tipo        | Descrição                  |
| ----------- | ----------- | -------------------------- |
| idFormaPgto | Int (PK)    | Identificador único        |
| descricao   | VarChar(50) | Nome da forma de pagamento |

#### ItemVenda

| Campo     | Tipo     | Descrição       |
| --------- | -------- | --------------- |
| idVenda   | Int (PK) | FK para Venda   |
| idProduto | Int (PK) | FK para Produto |

### Relacionamentos

```
Cliente ──< Venda (1:N)
Funcionario ──< Venda (1:N)
Funcionario >── Login (N:1)
TipoProduto ──< Produto (1:N)
Venda ──< ItemVenda (1:N)
ItemVenda >── Produto (N:1)
Venda >── FormaPagto (N:1)
```

## Dados Iniciais (Seed)

O script `seed.sh` insere os seguintes registros:

- **Login:** ADM (perfil administrador)
- **Cliente:** JOÃO DIAS
- **Funcionário:** PEDRO SOARES
- **Categoria:** FLORES
- **Produto:** BUQUÊ DE ROSAS (10 em estoque, R$ 50,00)
- **Formas de Pagamento:** Cartão Crédito, Cartão Débito, Vale Refeição, Dinheiro
- **Venda exemplo:** 2 BUQUÊS DE ROSAS = R$ 100,00

## Build e Deploy

### Build para produção

```bash
npm run build
npm run start
```

### Deploy no Vercel

O projeto está configurado para deploy fácil no [Vercel](https://vercel.com):

1. Conecte o repositório ao Vercel
2. Configure a variável de ambiente `DATABASE_URL`
3. O deploy será automático a cada push

## Licença

Projeto privado - Floresca Floricultura 2024
