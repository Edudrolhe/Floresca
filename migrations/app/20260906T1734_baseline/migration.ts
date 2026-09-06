#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c5d9bd3a44573fc5c545bd3e8700d8daa3bfd4a000f969acd193caeba3efe745/contract'
import endContract from '../../snapshots/c5d9bd3a44573fc5c545bd3e8700d8daa3bfd4a000f969acd193caeba3efe745/contract.json' with { type: 'json' }
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration'

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Cliente',
        columns: [
          col('cpf', 'character varying(15)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
          col('email', 'character varying(50)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('endereco', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('idCliente', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nome', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('telefone', 'character varying(15)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
        ],
        constraints: [primaryKey(['idCliente'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'FormaPagto',
        columns: [
          col('descricao', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('idFormaPgto', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['idFormaPgto'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Funcionario',
        columns: [
          col('cpf', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('dataAdmissao', 'date', { codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('email', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('idFunconario', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idUsuario', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('nome', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('salario', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('telefone', 'character varying(15)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
        ],
        constraints: [primaryKey(['idFunconario'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Login',
        columns: [
          col('descricao', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('iditemUsuario', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['iditemUsuario'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Produto',
        columns: [
          col('categoria', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('cod_Barras', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('descricao', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('idCategoria', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('idProduto', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('preco', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('quantidade', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['idProduto'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Tipo_produto',
        columns: [
          col('categoria', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('idCategoria', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['idCategoria'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Venda',
        columns: [
          col('Total_Venda', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('dataVenda', 'date', { notNull: true, codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('idCliente', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('idFormaPgto', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idFuncionario', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idVenda', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('preco', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('produto', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('quantidade', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['idVenda'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'item_venda',
        columns: [
          col('idProduto', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idVenda', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['idVenda', 'idProduto'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Funcionario',
        index: 'Funcionario_idUsuario_idx_2255b915',
        columns: ['idUsuario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Produto',
        index: 'Produto_idCategoria_idx_430ced79',
        columns: ['idCategoria'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Venda',
        index: 'Venda_idCliente_idx_f51e9825',
        columns: ['idCliente'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Venda',
        index: 'Venda_idFormaPgto_idx_1e5a0c4a',
        columns: ['idFormaPgto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Venda',
        index: 'Venda_idFuncionario_idx_a3fb447f',
        columns: ['idFuncionario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'item_venda',
        index: 'item_venda_idProduto_idx_5613a5d0',
        columns: ['idProduto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'item_venda',
        index: 'item_venda_idVenda_idx_7d9ee885',
        columns: ['idVenda'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Funcionario',
        foreignKey: {
          name: 'FK_idUsuario',
          columns: ['idUsuario'],
          references: { schema: 'public', table: 'Login', columns: ['iditemUsuario'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Produto',
        foreignKey: {
          name: 'FK_idCategoria',
          columns: ['idCategoria'],
          references: { schema: 'public', table: 'Tipo_produto', columns: ['idCategoria'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Venda',
        foreignKey: {
          name: 'FK_idCliente',
          columns: ['idCliente'],
          references: { schema: 'public', table: 'Cliente', columns: ['idCliente'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Venda',
        foreignKey: {
          name: 'FK_idFuncionario',
          columns: ['idFuncionario'],
          references: { schema: 'public', table: 'Funcionario', columns: ['idFunconario'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Venda',
        foreignKey: {
          name: 'FK_idFormaPgto',
          columns: ['idFormaPgto'],
          references: { schema: 'public', table: 'Login', columns: ['iditemUsuario'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'item_venda',
        foreignKey: {
          name: 'item_venda_idVenda_fkey',
          columns: ['idVenda'],
          references: { schema: 'public', table: 'Venda', columns: ['idVenda'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'item_venda',
        foreignKey: {
          name: 'item_venda_idProduto_fkey',
          columns: ['idProduto'],
          references: { schema: 'public', table: 'Produto', columns: ['idProduto'] },
        },
      }),
    ]
  }
}

MigrationCLI.run(import.meta.url, M)
