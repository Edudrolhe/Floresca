import { z } from 'zod'

export const ProductSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória').max(50),
  preco: z.number().min(0, 'Preço deve ser positivo'),
  precoOriginal: z.number().min(0).nullable().optional(),
  parcelas: z.number().int().min(1).optional(),
  categoria: z.string().min(1, 'Categoria é obrigatória').max(50),
  quantidade: z.number().int().min(0, 'Quantidade não pode ser negativa'),
  codBarras: z.number(),
  idCategoria: z.number().int().nullable().optional(),
})

export const FuncionarioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(50),
  cpf: z.string().min(1, 'CPF é obrigatório').max(50),
  telefone: z.string().min(1, 'Telefone é obrigatório').max(15),
  email: z.string().email('Email inválido').max(50),
  dataAdmissao: z.string().min(1, 'Data de admissão é obrigatória'),
  salario: z.number().min(0, 'Salário deve ser positivo'),
})

export const VendaSchema = z.object({
  dataVenda: z.string().min(1, 'Data é obrigatória'),
  produto: z.string().min(1, 'Produto é obrigatório'),
  quantidade: z.number().int().min(1, 'Quantidade deve ser pelo menos 1'),
  preco: z.number().min(0, 'Preço deve ser positivo'),
  totalVenda: z.number().min(0, 'Total deve ser positivo'),
  idFormaPgto: z.number().int().min(1, 'Forma de pagamento é obrigatória'),
  idFuncionario: z.number().int().nullable().optional(),
  idCliente: z.number().int().nullable().optional(),
  itens: z.array(z.object({ idProduto: z.number().int() })).min(1, 'Adicione pelo menos um produto'),
}).refine((data) => data.idFuncionario || data.idCliente, {
  message: 'Selecione um funcionário ou cliente',
})

export type ProductInput = z.infer<typeof ProductSchema>
export type FuncionarioInput = z.infer<typeof FuncionarioSchema>
export type VendaInput = z.infer<typeof VendaSchema>

export const CheckoutSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF inválido'),
  rua: z.string().min(3, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(3, 'Bairro é obrigatório'),
  cidade: z.string().min(3, 'Cidade é obrigatória'),
  cep: z.string().length(8, 'CEP deve ter 8 dígitos'),
  metodoPagamento: z.enum(['pix', 'credit_card']),
})

export type CheckoutInput = z.infer<typeof CheckoutSchema>
