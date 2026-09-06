import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // 1. Login
  await prisma.login.upsert({
    where: { iditemUsuario: 1 },
    update: {},
    create: {
      iditemUsuario: 1,
      descricao: 'ADM',
    },
  })

  // 2. Cliente
  await prisma.cliente.upsert({
    where: { idCliente: 1 },
    update: {},
    create: {
      idCliente: 1,
      nome: 'JOÃO DIAS',
      cpf: '232323234-98',
      telefone: '(11)4567-0990',
      endereco: 'RUA 25 DE MARÇO, Nº 25',
      email: 'joao.dias@email.com',
    },
  })

  await prisma.cliente.upsert({
    where: { idCliente: 2 },
    update: {},
    create: {
      idCliente: 2,
      nome: 'MARIA SILVA',
      cpf: '123456789-00',
      telefone: '(47)99999-1234',
      endereco: 'RUA DAS FLORES, Nº 100',
      email: 'maria.silva@email.com',
    },
  })

  await prisma.cliente.upsert({
    where: { idCliente: 3 },
    update: {},
    create: {
      idCliente: 3,
      nome: 'ANA OLIVEIRA',
      cpf: '987654321-00',
      telefone: '(47)88888-5678',
      endereco: 'AVENIDA BRASIL, Nº 500',
      email: 'ana.oliveira@email.com',
    },
  })

  // 3. Funcionário
  await prisma.funcionario.upsert({
    where: { idFuncionario: 1 },
    update: {},
    create: {
      idFuncionario: 1,
      nome: 'PEDRO SOARES',
      cpf: '869876562-89',
      telefone: '(11)6737-4040',
      email: 'pedroca@gmail.com',
      dataAdmissao: new Date('2023-01-20'),
      idUsuario: 1,
      salario: 2500.0,
    },
  })

  await prisma.funcionario.upsert({
    where: { idFuncionario: 2 },
    update: {},
    create: {
      idFuncionario: 2,
      nome: 'LUCIA SANTOS',
      cpf: '112233445-56',
      telefone: '(47)77777-9012',
      email: 'lucia.santos@email.com',
      dataAdmissao: new Date('2023-06-15'),
      idUsuario: null,
      salario: 2200.0,
    },
  })

  // 4. Tipo_produto
  await prisma.tipoProduto.upsert({
    where: { idCategoria: 1 },
    update: {},
    create: {
      idCategoria: 1,
      categoria: 'FLORES',
    },
  })

  await prisma.tipoProduto.upsert({
    where: { idCategoria: 2 },
    update: {},
    create: {
      idCategoria: 2,
      categoria: 'BUQUÊS',
    },
  })

  await prisma.tipoProduto.upsert({
    where: { idCategoria: 3 },
    update: {},
    create: {
      idCategoria: 3,
      categoria: 'ARRANJOS',
    },
  })

  await prisma.tipoProduto.upsert({
    where: { idCategoria: 4 },
    update: {},
    create: {
      idCategoria: 4,
      categoria: 'CESTAS',
    },
  })

  // 5. Produto
  await prisma.produto.upsert({
    where: { idProduto: 1 },
    update: {},
    create: {
      idProduto: 1,
      codBarras: 1234567890123,
      descricao: 'ORQUIDEA AMOR',
      categoria: 'FLORES',
      quantidade: 10,
      preco: 165.0,
      precoOriginal: 195.0,
      parcelas: 2,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 2 },
    update: {},
    create: {
      idProduto: 2,
      codBarras: 1234567890124,
      descricao: 'RAMO DE LÍRIO',
      categoria: 'FLORES',
      quantidade: 8,
      preco: 45.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 3 },
    update: {},
    create: {
      idProduto: 3,
      codBarras: 1234567890125,
      descricao: 'ARRANJO TROPICAL',
      categoria: 'ARRANJOS',
      quantidade: 5,
      preco: 65.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 3,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 4 },
    update: {},
    create: {
      idProduto: 4,
      codBarras: 1234567890126,
      descricao: 'CESTA COM FLORES',
      categoria: 'CESTAS',
      quantidade: 3,
      preco: 80.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 4,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 5 },
    update: {},
    create: {
      idProduto: 5,
      codBarras: 1234567890127,
      descricao: 'ORQUÍDEA BRANCA',
      categoria: 'FLORES',
      quantidade: 6,
      preco: 55.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 6 },
    update: {},
    create: {
      idProduto: 6,
      codBarras: 1234567890128,
      descricao: 'GIRASSÓIS',
      categoria: 'FLORES',
      quantidade: 12,
      preco: 40.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 7 },
    update: {},
    create: {
      idProduto: 7,
      codBarras: 1234567890129,
      descricao: 'MIX DE FLORES',
      categoria: 'BUQUÊS',
      quantidade: 7,
      preco: 70.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 2,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 8 },
    update: {},
    create: {
      idProduto: 8,
      codBarras: 1234567890130,
      descricao: 'ROSAS VERMELHAS',
      categoria: 'FLORES',
      quantidade: 15,
      preco: 55.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 9 },
    update: {},
    create: {
      idProduto: 9,
      codBarras: 1234567890131,
      descricao: 'LAVANDA PERFUMADA',
      categoria: 'FLORES',
      quantidade: 9,
      preco: 35.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 1,
    },
  })

  await prisma.produto.upsert({
    where: { idProduto: 10 },
    update: {},
    create: {
      idProduto: 10,
      codBarras: 1234567890132,
      descricao: 'CESTA ROMÂNTICA',
      categoria: 'CESTAS',
      quantidade: 4,
      preco: 120.0,
      precoOriginal: null,
      parcelas: 1,
      idCategoria: 4,
    },
  })

  // 6. Formas de Pagamento
  await prisma.formaPagto.upsert({
    where: { idFormaPgto: 1 },
    update: {},
    create: {
      idFormaPgto: 1,
      descricao: 'CARTÃO CRÉDITO',
    },
  })

  await prisma.formaPagto.upsert({
    where: { idFormaPgto: 2 },
    update: {},
    create: {
      idFormaPgto: 2,
      descricao: 'CARTÃO DÉBITO',
    },
  })

  await prisma.formaPagto.upsert({
    where: { idFormaPgto: 3 },
    update: {},
    create: {
      idFormaPgto: 3,
      descricao: 'VALE REFEIÇÃO',
    },
  })

  await prisma.formaPagto.upsert({
    where: { idFormaPgto: 4 },
    update: {},
    create: {
      idFormaPgto: 4,
      descricao: 'DINHEIRO',
    },
  })

  await prisma.formaPagto.upsert({
    where: { idFormaPgto: 5 },
    update: {},
    create: {
      idFormaPgto: 5,
      descricao: 'PIX',
    },
  })

  // 7. Vendas
  await prisma.venda.upsert({
    where: { idVenda: 1 },
    update: {},
    create: {
      idVenda: 1,
      dataVenda: new Date('2026-09-01'),
      produto: 'BUQUÊ DE ROSAS',
      quantidade: 2,
      preco: 50.0,
      totalVenda: 100.0,
      idFormaPgto: 1,
      idFuncionario: 1,
      idCliente: 1,
    },
  })

  await prisma.venda.upsert({
    where: { idVenda: 2 },
    update: {},
    create: {
      idVenda: 2,
      dataVenda: new Date('2026-09-02'),
      produto: 'ARRANJO TROPICAL',
      quantidade: 1,
      preco: 65.0,
      totalVenda: 65.0,
      idFormaPgto: 4,
      idFuncionario: 1,
      idCliente: 2,
    },
  })

  await prisma.venda.upsert({
    where: { idVenda: 3 },
    update: {},
    create: {
      idVenda: 3,
      dataVenda: new Date('2026-09-03'),
      produto: 'CESTA COM FLORES',
      quantidade: 1,
      preco: 80.0,
      totalVenda: 80.0,
      idFormaPgto: 5,
      idFuncionario: 1,
      idCliente: 3,
    },
  })

  await prisma.venda.upsert({
    where: { idVenda: 4 },
    update: {},
    create: {
      idVenda: 4,
      dataVenda: new Date('2026-09-05'),
      produto: 'MIX DE FLORES',
      quantidade: 3,
      preco: 70.0,
      totalVenda: 210.0,
      idFormaPgto: 2,
      idFuncionario: 1,
      idCliente: 1,
    },
  })

  // 8. ItemVenda
  await prisma.itemVenda.upsert({
    where: { idVenda_idProduto: { idVenda: 1, idProduto: 1 } },
    update: {},
    create: {
      idVenda: 1,
      idProduto: 1,
    },
  })

  await prisma.itemVenda.upsert({
    where: { idVenda_idProduto: { idVenda: 2, idProduto: 3 } },
    update: {},
    create: {
      idVenda: 2,
      idProduto: 3,
    },
  })

  await prisma.itemVenda.upsert({
    where: { idVenda_idProduto: { idVenda: 3, idProduto: 4 } },
    update: {},
    create: {
      idVenda: 3,
      idProduto: 4,
    },
  })

  await prisma.itemVenda.upsert({
    where: { idVenda_idProduto: { idVenda: 4, idProduto: 7 } },
    update: {},
    create: {
      idVenda: 4,
      idProduto: 7,
    },
  })

  console.log('Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
