# Documentação do Banco de Dados

## Visão Geral

O banco de dados do Floresca Floricultura é composto por 8 tabelas que modelam completamente as operações de uma floricultura.

## Diagrama Entidade-Relacionamento

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │         │  Funcionario│
├─────────────┤         ├─────────────┤
│ idCliente   │◄───┐    │ idFuncionario│
│ nome        │    │    │ nome        │
│ cpf         │    │    │ cpf         │
│ telefone    │    │    │ telefone    │
│ endereco    │    │    │ email       │
│ email       │    │    │ dataAdmissao│
└─────────────┘    │    │ salario     │
                   │    │ idUsuario   │──┐
                   │    └─────────────┘  │
                   │                     │
                   │    ┌─────────────┐  │
                   │    │    Login    │  │
                   │    ├─────────────┤  │
                   │    │iditemUsuario│◄─┘
                   │    │ descricao   │
                   │    └─────────────┘
                   │
                   │    ┌─────────────┐
                   │    │   Venda     │
                   │    ├─────────────┤
                   └───►│ idCliente   │
                        │ idVenda     │
                        │ dataVenda   │
        ┌───────────────│ produto     │
        │               │ quantidade  │
        │               │ preco       │
        │               │ totalVenda  │
        │               │ idFormaPgto │──┐
        │               │ idFuncionario│  │
        │               └─────────────┘  │
        │                                │
        │               ┌─────────────┐  │
        │               │ FormaPagto  │  │
        │               ├─────────────┤  │
        │               │idFormaPgto  │◄─┘
        │               │ descricao   │
        │               └─────────────┘
        │
        │               ┌─────────────┐
        │               │  Produto    │
        │               ├─────────────┤
        │               │ idProduto   │◄────┐
        │               │ codBarras   │     │
        │               │ descricao   │     │
        │               │ categoria   │     │
        │               │ quantidade  │     │
        │               │ preco       │     │
        │               │ idCategoria │──┐  │
        │               └─────────────┘  │  │
        │                                │  │
        │               ┌─────────────┐  │  │
        │               │ TipoProduto │  │  │
        │               ├─────────────┤  │  │
        │               │idCategoria  │◄─┘  │
        │               │ categoria   │     │
        │               └─────────────┘     │
        │                                   │
        │    ┌─────────────┐                │
        └───►│ ItemVenda   │                │
             ├─────────────┤                │
             │ idVenda     │                │
             │ idProduto   │────────────────┘
             └─────────────┘
```

## Tabelas Detalhadas

### 1. Cliente

Armazena informações dos clientes da floricultura.

```sql
CREATE TABLE "Cliente" (
    "idCliente" INTEGER PRIMARY KEY,
    "nome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "endereco" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50)
);
```

| Campo     | Tipo        | Restrição   | Descrição                      |
| --------- | ----------- | ----------- | ------------------------------ |
| idCliente | INTEGER     | PRIMARY KEY | Identificador único do cliente |
| nome      | VARCHAR(50) | NOT NULL    | Nome completo do cliente       |
| cpf       | VARCHAR(15) | NOT NULL    | Cadastro de Pessoa Física      |
| telefone  | VARCHAR(15) | NOT NULL    | Telefone de contato            |
| endereco  | VARCHAR(50) | NOT NULL    | Endereço completo              |
| email     | VARCHAR(50) | NULLABLE    | Endereço de email              |

**Dados de exemplo:**

| idCliente | nome      | cpf          | telefone      | endereco               | email |
| --------- | --------- | ------------ | ------------- | ---------------------- | ----- |
| 1         | JOÃO DIAS | 232323234-98 | (11)4567-0990 | RUA 25 DE MARÇO, Nº 25 | NULL  |

---

### 2. Funcionario

Cadastro dos funcionários que trabalham na floricultura.

```sql
CREATE TABLE "Funcionario" (
    "idFunconario" INTEGER PRIMARY KEY,
    "nome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "dataAdmissao" DATE,
    "salario" FLOAT,
    "idUsuario" INTEGER REFERENCES "Login"("iditemUsuario")
);
```

| Campo         | Tipo        | Restrição   | Descrição           |
| ------------- | ----------- | ----------- | ------------------- |
| idFuncionario | INTEGER     | PRIMARY KEY | Identificador único |
| nome          | VARCHAR(50) | NOT NULL    | Nome do funcionário |
| cpf           | VARCHAR(50) | NOT NULL    | CPF                 |
| telefone      | VARCHAR(15) | NOT NULL    | Telefone            |
| email         | VARCHAR(50) | NOT NULL    | Email profissional  |
| dataAdmissao  | DATE        | NULLABLE    | Data de admissão    |
| salario       | FLOAT       | NULLABLE    | Salário mensal      |
| idUsuario     | INTEGER     | FK → Login  | Vínculo com login   |

**Dados de exemplo:**

| idFuncionario | nome         | cpf          | email             | dataAdmissao | idUsuario |
| ------------- | ------------ | ------------ | ----------------- | ------------ | --------- |
| 1             | PEDRO SOARES | 869876562-89 | pedroca@gmail.com | 2023-01-20   | 1         |

---

### 3. Login

Sistema de autenticação e perfis de acesso.

```sql
CREATE TABLE "Login" (
    "iditemUsuario" INTEGER PRIMARY KEY,
    "descricao" VARCHAR(50) NOT NULL
);
```

| Campo         | Tipo        | Restrição   | Descrição           |
| ------------- | ----------- | ----------- | ------------------- |
| iditemUsuario | INTEGER     | PRIMARY KEY | Identificador único |
| descricao     | VARCHAR(50) | NOT NULL    | Perfil (ex: "ADM")  |

**Dados de exemplo:**

| iditemUsuario | descricao |
| ------------- | --------- |
| 1             | ADM       |

---

### 4. TipoProduto

Categorias de produtos disponíveis na floricultura.

```sql
CREATE TABLE "Tipo_produto" (
    "idCategoria" INTEGER PRIMARY KEY,
    "categoria" VARCHAR(50) NOT NULL
);
```

| Campo       | Tipo        | Restrição   | Descrição           |
| ----------- | ----------- | ----------- | ------------------- |
| idCategoria | INTEGER     | PRIMARY KEY | Identificador único |
| categoria   | VARCHAR(50) | NOT NULL    | Nome da categoria   |

**Dados de exemplo:**

| idCategoria | categoria |
| ----------- | --------- |
| 1           | FLORES    |

---

### 5. Produto

Produtos disponíveis para venda.

```sql
CREATE TABLE "Produto" (
    "idProduto" INTEGER PRIMARY KEY,
    "cod_Barras" DECIMAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "categoria" VARCHAR(50) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" FLOAT NOT NULL,
    "idCategoria" INTEGER REFERENCES "Tipo_produto"("idCategoria")
);
```

| Campo       | Tipo        | Restrição        | Descrição             |
| ----------- | ----------- | ---------------- | --------------------- |
| idProduto   | INTEGER     | PRIMARY KEY      | Identificador único   |
| codBarras   | DECIMAL     | NOT NULL         | Código de barras      |
| descricao   | VARCHAR(50) | NOT NULL         | Descrição do produto  |
| categoria   | VARCHAR(50) | NOT NULL         | Nome da categoria     |
| quantidade  | INTEGER     | NOT NULL         | Quantidade em estoque |
| preco       | FLOAT       | NOT NULL         | Preço unitário (R$)   |
| idCategoria | INTEGER     | FK → TipoProduto | Chave para categoria  |

**Dados de exemplo:**

| idProduto | codBarras     | descricao      | categoria | quantidade | preco | idCategoria |
| --------- | ------------- | -------------- | --------- | ---------- | ----- | ----------- |
| 1         | 1234567890123 | BUQUÊ DE ROSAS | FLORES    | 10         | 50.00 | 1           |

---

### 6. FormaPagto

Formas de pagamento aceitas na floricultura.

```sql
CREATE TABLE "FormaPagto" (
    "idFormaPgto" INTEGER PRIMARY KEY,
    "descricao" VARCHAR(50) NOT NULL
);
```

| Campo       | Tipo        | Restrição   | Descrição                  |
| ----------- | ----------- | ----------- | -------------------------- |
| idFormaPgto | INTEGER     | PRIMARY KEY | Identificador único        |
| descricao   | VARCHAR(50) | NOT NULL    | Nome da forma de pagamento |

**Dados de exemplo:**

| idFormaPgto | descricao      |
| ----------- | -------------- |
| 1           | CARTÃO CREDITO |
| 2           | CARTÃO DEBITO  |
| 3           | VALE REFEIÇÃO  |
| 4           | DINHEIRO       |

---

### 7. Venda

Registro de todas as vendas realizadas.

```sql
CREATE TABLE "Venda" (
    "idVenda" INTEGER PRIMARY KEY,
    "dataVenda" DATE NOT NULL,
    "produto" VARCHAR(50) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" FLOAT NOT NULL,
    "Total_Venda" FLOAT NOT NULL,
    "idFormaPgto" INTEGER NOT NULL REFERENCES "FormaPagto"("idFormaPgto"),
    "idFuncionario" INTEGER NOT NULL REFERENCES "Funcionario"("idFunconario"),
    "idCliente" INTEGER REFERENCES "Cliente"("idCliente")
);
```

| Campo         | Tipo        | Restrição               | Descrição               |
| ------------- | ----------- | ----------------------- | ----------------------- |
| idVenda       | INTEGER     | PRIMARY KEY             | Identificador único     |
| dataVenda     | DATE        | NOT NULL                | Data da venda           |
| produto       | VARCHAR(50) | NOT NULL                | Nome do produto         |
| quantidade    | INTEGER     | NOT NULL                | Quantidade vendida      |
| preco         | FLOAT       | NOT NULL                | Preço unitário          |
| totalVenda    | FLOAT       | NOT NULL                | Valor total             |
| idFormaPgto   | INTEGER     | FK → FormaPagto         | Forma de pagamento      |
| idFuncionario | INTEGER     | FK → Funcionário        | Funcionário responsável |
| idCliente     | INTEGER     | FK → Cliente (opcional) | Cliente                 |

**Dados de exemplo:**

| idVenda | dataVenda  | produto        | quantidade | preco | totalVenda | idFormaPgto | idFuncionario | idCliente |
| ------- | ---------- | -------------- | ---------- | ----- | ---------- | ----------- | ------------- | --------- |
| 1       | 2020-02-12 | BUQUÊ DE ROSAS | 2          | 50.00 | 100.00     | 1           | 1             | 1         |

---

### 8. ItemVenda (Tabela de Junção)

Relaciona vendas com produtos (muitos-para-muitos).

```sql
CREATE TABLE "item_venda" (
    "idVenda" INTEGER NOT NULL REFERENCES "Venda"("idVenda"),
    "idProduto" INTEGER NOT NULL REFERENCES "Produto"("idProduto"),
    PRIMARY KEY ("idVenda", "idProduto")
);
```

| Campo     | Tipo    | Restrição        | Descrição        |
| --------- | ------- | ---------------- | ---------------- |
| idVenda   | INTEGER | PK, FK → Venda   | Chave da venda   |
| idProduto | INTEGER | PK, FK → Produto | Chave do produto |

**Dados de exemplo:**

| idVenda | idProduto |
| ------- | --------- |
| 1       | 1         |

---

## Relacionamentos

| Relação               | Tabela Origem | Tabela Destino | Tipo | Chave Estrangeira     |
| --------------------- | ------------- | -------------- | ---- | --------------------- |
| Cliente → Venda       | Cliente       | Venda          | 1:N  | Venda.idCliente       |
| Funcionário → Venda   | Funcionario   | Venda          | 1:N  | Venda.idFuncionario   |
| Funcionário → Login   | Funcionario   | Login          | N:1  | Funcionario.idUsuario |
| TipoProduto → Produto | TipoProduto   | Produto        | 1:N  | Produto.idCategoria   |
| Venda → ItemVenda     | Venda         | ItemVenda      | 1:N  | ItemVenda.idVenda     |
| Produto → ItemVenda   | Produto       | ItemVenda      | 1:N  | ItemVenda.idProduto   |
| FormaPagto → Venda    | FormaPagto    | Venda          | 1:N  | Venda.idFormaPgto     |

## Consultas Úteis

### Listar todas as vendas com cliente e funcionário

```sql
SELECT
    v.idVenda,
    v.dataVenda,
    v.produto,
    v.quantidade,
    v.totalVenda,
    c.nome AS cliente,
    f.nome AS funcionario,
    fp.descricao AS forma_pagamento
FROM "Venda" v
LEFT JOIN "Cliente" c ON v."idCliente" = c."idCliente"
JOIN "Funcionario" f ON v."idFuncionario" = f."idFunconario"
JOIN "FormaPagto" fp ON v."idFormaPgto" = fp."idFormaPgto";
```

### Listar produtos com estoque baixo

```sql
SELECT
    p.idProduto,
    p.descricao,
    p.quantidade,
    p.preco,
    t.categoria
FROM "Produto" p
JOIN "Tipo_produto" t ON p."idCategoria" = t."idCategoria"
WHERE p.quantidade < 5
ORDER BY p.quantidade ASC;
```

### Total de vendas por funcionário

```sql
SELECT
    f.nome,
    COUNT(v.idVenda) AS total_vendas,
    SUM(v.totalVenda) AS valor_total
FROM "Funcionario" f
JOIN "Venda" v ON f."idFunconario" = v."idFuncionario"
GROUP BY f.nome
ORDER BY valor_total DESC;
```

### Vendas por forma de pagamento

```sql
SELECT
    fp.descricao,
    COUNT(v.idVenda) AS quantidade_vendas,
    SUM(v.totalVenda) AS valor_total
FROM "FormaPagto" fp
JOIN "Venda" v ON fp."idFormaPgto" = v."idFormaPgto"
GROUP BY fp.descricao
ORDER BY valor_total DESC;
```

## Índices Recomendados

```sql
-- Performance para buscas por CPF
CREATE INDEX idx_cliente_cpf ON "Cliente"("cpf");
CREATE INDEX idx_funcionario_cpf ON "Funcionario"("cpf");

-- Performance para consultas por data
CREATE INDEX idx_venda_data ON "Venda"("dataVenda");

-- Performance para relatórios
CREATE INDEX idx_venda_funcionario ON "Venda"("idFuncionario");
CREATE INDEX idx_venda_cliente ON "Venda"("idCliente");
CREATE INDEX idx_produto_categoria ON "Produto"("idCategoria");
```

## Regras de Negócio

1. **CPF Único:** Cada cliente e funcionário deve ter um CPF único
2. **Estoque:** A quantidade em estoque deve ser atualizada a cada venda
3. **Total da Venda:** Deve ser calculado automaticamente (quantidade × preço)
4. **Cliente Opcional:** Uma venda pode ser realizada sem cadastro de cliente
5. **Funcionário Obrigatório:** Toda venda deve ter um funcionário responsável
