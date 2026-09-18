#!/bin/bash
# Seed script using psql directly
set -e

source .env

psql "$DATABASE_URL" << 'SQL'
-- 1. Login
INSERT INTO "Login" ("iditemUsuario", "descricao") VALUES (1, 'ADM') ON CONFLICT ("iditemUsuario") DO NOTHING;

-- 2. Cliente
INSERT INTO "Cliente" ("idCliente", "nome", "cpf", "telefone", "endereco", "email") VALUES
(1, 'JOÃO DIAS', '232323234-98', '(11)4567-0990', 'RUA 25 DE MARÇO, Nº 25', 'joao.dias@email.com'),
(2, 'MARIA SILVA', '123456789-00', '(47)99999-1234', 'RUA DAS FLORES, Nº 100', 'maria.silva@email.com'),
(3, 'ANA OLIVEIRA', '987654321-00', '(47)88888-5678', 'AVENIDA BRASIL, Nº 500', 'ana.oliveira@email.com')
ON CONFLICT ("idCliente") DO NOTHING;

-- 3. Funcionário
INSERT INTO "Funcionario" ("idFunconario", "nome", "cpf", "telefone", "email", "dataAdmissao", "idUsuario", "salario") VALUES
(1, 'PEDRO SOARES', '869876562-89', '(11)6737-4040', 'pedroca@gmail.com', '2023-01-20', 1, 2500.00),
(2, 'LUCIA SANTOS', '112233445-56', '(47)77777-9012', 'lucia.santos@email.com', '2023-06-15', NULL, 2200.00)
ON CONFLICT ("idFunconario") DO NOTHING;

-- 4. Tipo_produto
INSERT INTO "Tipo_produto" ("idCategoria", "categoria") VALUES
(1, 'FLORES'),
(2, 'BUQUÊS'),
(3, 'ARRANJOS'),
(4, 'CESTAS')
ON CONFLICT ("idCategoria") DO NOTHING;

-- 5. Produto
INSERT INTO "Produto" ("idProduto", "cod_Barras", "descricao", "categoria", "quantidade", "preco", "preco_original", "parcelas", "idCategoria") VALUES
(1, 1234567890123, 'ORQUÍDEA ROSA', 'FLORES', 10, 50.00, NULL, 1, 1),
(2, 1234567890124, 'CESTA ROMÂNTICA', 'CESTAS', 8, 45.00, 55.00, 3, 4),
(3, 1234567890125, 'BUQUÊ COLORIDO', 'BUQUÊS', 5, 65.00, 85.00, 2, 2),
(4, 1234567890126, 'ORQUÍDEA BORGONHA', 'FLORES', 3, 80.00, NULL, 1, 1),
(5, 1234567890127, 'BUQUÊ DE ROSAS ROSAS', 'BUQUÊS', 6, 55.00, 70.00, 2, 2),
(6, 1234567890128, 'BUQUÊ DE ROSAS', 'BUQUÊS', 12, 40.00, 55.00, 2, 2),
(7, 1234567890129, 'BUQUÊ VERMELHO', 'BUQUÊS', 7, 70.00, NULL, 1, 2),
(8, 1234567890130, 'ORQUÍDEA ROSA', 'FLORES', 15, 55.00, 70.00, 2, 1),
(9, 1234567890131, 'CESTA ROMÂNTICA', 'CESTAS', 9, 35.00, NULL, 1, 4),
(10, 1234567890132, 'BUQUÊ COLORIDO', 'BUQUÊS', 4, 120.00, 150.00, 3, 2)
ON CONFLICT ("idProduto") DO UPDATE SET
  "descricao" = EXCLUDED."descricao",
  "categoria" = EXCLUDED."categoria",
  "preco" = EXCLUDED."preco",
  "preco_original" = EXCLUDED."preco_original",
  "parcelas" = EXCLUDED."parcelas",
  "idCategoria" = EXCLUDED."idCategoria";

-- 6. Formas de Pagamento
INSERT INTO "FormaPagto" ("idFormaPgto", "descricao") VALUES
(1, 'CARTÃO CRÉDITO'),
(2, 'CARTÃO DÉBITO'),
(3, 'VALE REFEIÇÃO'),
(4, 'DINHEIRO'),
(5, 'PIX')
ON CONFLICT ("idFormaPgto") DO NOTHING;

-- 7. Vendas
INSERT INTO "Venda" ("idVenda", "dataVenda", "produto", "quantidade", "preco", "Total_Venda", "idFormaPgto", "idFuncionario", "idCliente") VALUES
(1, '2026-09-01', 'BUQUÊ DE ROSAS', 2, 50.00, 100.00, 1, 1, 1),
(2, '2026-09-02', 'ARRANJO TROPICAL', 1, 65.00, 65.00, 4, 1, 2),
(3, '2026-09-03', 'CESTA COM FLORES', 1, 80.00, 80.00, 5, 1, 3),
(4, '2026-09-05', 'MIX DE FLORES', 3, 70.00, 210.00, 2, 1, 1)
ON CONFLICT ("idVenda") DO NOTHING;

-- 8. item_venda
INSERT INTO "item_venda" ("idVenda", "idProduto") VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 7)
ON CONFLICT DO NOTHING;

SELECT 'Seeding finalizado com sucesso!' as status;
SQL
