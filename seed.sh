#!/bin/bash
# Seed script using psql directly
set -e

source .env

psql "$DATABASE_URL" << 'SQL'
-- 1. Login
INSERT INTO "Login" ("iditemUsuario", "descricao") VALUES (1, 'ADM') ON CONFLICT ("iditemUsuario") DO NOTHING;

-- 2. Cliente
INSERT INTO "Cliente" ("idCliente", "nome", "cpf", "telefone", "endereco") VALUES (1, 'JOÃO DIAS', '232323234-98', '(11)4567-0990', 'RUA 25 DE MARÇO, Nº 25') ON CONFLICT ("idCliente") DO NOTHING;

-- 3. Funcionário
INSERT INTO "Funcionario" ("idFunconario", "nome", "cpf", "telefone", "email", "dataAdmissao", "idUsuario") VALUES (1, 'PEDRO SOARES', '869876562-89', '(11)6737-4040', 'pedroca@gmail.com', '2023-01-20', 1) ON CONFLICT ("idFunconario") DO NOTHING;

-- 4. Tipo_produto
INSERT INTO "Tipo_produto" ("idCategoria", "categoria") VALUES (1, 'FLORES') ON CONFLICT ("idCategoria") DO NOTHING;

-- 5. Produto
INSERT INTO "Produto" ("idProduto", "cod_Barras", "descricao", "categoria", "quantidade", "preco", "idCategoria") VALUES (1, 1234567890123, 'BUQUÊ DE ROSAS', 'FLORES', 10, 50.00, 1) ON CONFLICT ("idProduto") DO NOTHING;

-- 6. Formas de Pagamento
INSERT INTO "FormaPagto" ("idFormaPgto", "descricao") VALUES (1, 'CARTÃO CREDITO'), (2, 'CARTÃO DEBITO'), (3, 'VALE REFEIÇÃO'), (4, 'DINHEIRO') ON CONFLICT ("idFormaPgto") DO NOTHING;

-- 7. Venda
INSERT INTO "Venda" ("idVenda", "dataVenda", "produto", "quantidade", "preco", "Total_Venda", "idFormaPgto", "idFuncionario", "idCliente") VALUES (1, '2020-02-12', 'BUQUÊ DE ROSAS', 2, 50.00, 100.00, 1, 1, 1) ON CONFLICT ("idVenda") DO NOTHING;

-- 8. item_venda
INSERT INTO "item_venda" ("idVenda", "idProduto") VALUES (1, 1) ON CONFLICT DO NOTHING;

SELECT 'Seeding finalizado com sucesso!' as status;
SQL
