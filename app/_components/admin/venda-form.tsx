'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import {
  createVenda,
  updateVenda,
} from '@/app/_lib/actions/vendas'
import type { VendaInput } from '@/app/_lib/validations'

type Funcionario = { idFuncionario: number; nome: string }
type Cliente = { idCliente: number; nome: string }
type FormaPagto = { idFormaPgto: number; descricao: string }
type Produto = { idProduto: number; descricao: string; preco: number; quantidade: number }

type VendaFormProps = {
  initialData?: {
    idVenda: number
    dataVenda: string
    produto: string
    quantidade: number
    preco: number
    totalVenda: number
    idFormaPgto: number
    idFuncionario: number | null
    idCliente: number | null
  }
  funcionarios: Funcionario[]
  clientes: Cliente[]
  formasPagto: FormaPagto[]
  produtos: Produto[]
}

export function VendaForm({
  initialData,
  funcionarios,
  clientes,
  formasPagto,
  produtos,
}: VendaFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sellerType, setSellerType] = useState<'funcionario' | 'cliente'>(
    initialData?.idFuncionario ? 'funcionario' : 'cliente'
  )
  const [selectedFuncionario, setSelectedFuncionario] = useState<string>(
    initialData?.idFuncionario?.toString() || ''
  )
  const [selectedCliente, setSelectedCliente] = useState<string>(
    initialData?.idCliente?.toString() || ''
  )
  const [selectedProduto, setSelectedProduto] = useState<string>(
    initialData?.produto || ''
  )
  const [selectedFormaPgto, setSelectedFormaPgto] = useState<string>(
    initialData?.idFormaPgto?.toString() || ''
  )

  function handleSelect(setter: React.Dispatch<React.SetStateAction<string>>) {
    return (value: string | null) => setter(value ?? '')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    const produtoSelecionado = produtos.find((p) => p.descricao === selectedProduto)
    const quantidade = Number(formData.get('quantidade'))
    const preco = produtoSelecionado?.preco || 0
    const totalVenda = preco * quantidade

    const data: VendaInput = {
      dataVenda: formData.get('dataVenda') as string,
      produto: selectedProduto,
      quantidade,
      preco,
      totalVenda,
      idFormaPgto: Number(selectedFormaPgto),
      idFuncionario: sellerType === 'funcionario' ? Number(selectedFuncionario) : null,
      idCliente: sellerType === 'cliente' ? Number(selectedCliente) : null,
      itens: produtoSelecionado ? [{ idProduto: produtoSelecionado.idProduto }] : [],
    }

    try {
      if (initialData) {
        await updateVenda(initialData.idVenda, data)
      } else {
        await createVenda(data)
      }
    } catch {
      setError('Erro ao salvar venda. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">Dados da Venda</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dataVenda" className="text-sm font-medium">
                Data da Venda *
              </Label>
              <Input
                id="dataVenda"
                name="dataVenda"
                type="date"
                required
                defaultValue={initialData?.dataVenda || new Date().toISOString().split('T')[0]}
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Produto *
              </Label>
              <Select
                value={selectedProduto}
                onValueChange={handleSelect(setSelectedProduto)}
              >
                <SelectTrigger className="h-10 text-black">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((p) => (
                    <SelectItem key={p.idProduto} value={p.descricao}>
                      {p.descricao} - {p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade" className="text-sm font-medium">
                Quantidade *
              </Label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                min="1"
                required
                defaultValue={initialData?.quantidade || 1}
                className="h-10 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Forma de Pagamento *
              </Label>
              <Select
                value={selectedFormaPgto}
                onValueChange={handleSelect(setSelectedFormaPgto)}
              >
                <SelectTrigger className="h-10 text-black">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {formasPagto.map((f) => (
                    <SelectItem key={f.idFormaPgto} value={f.idFormaPgto.toString()}>
                      {f.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">Vendedor</h3>
          <p className="mb-4 text-sm text-gray-500">
            Quem está realizando esta venda?
          </p>

          <div className="mb-4 flex gap-2">
            <Button
              type="button"
              variant={sellerType === 'funcionario' ? 'default' : 'outline'}
              onClick={() => setSellerType('funcionario')}
              className={sellerType === 'funcionario' ? 'bg-purple-700 hover:bg-purple-800' : ''}
            >
              Funcionário
            </Button>
            <Button
              type="button"
              variant={sellerType === 'cliente' ? 'default' : 'outline'}
              onClick={() => setSellerType('cliente')}
              className={sellerType === 'cliente' ? 'bg-purple-700 hover:bg-purple-800' : ''}
            >
              Cliente Externo
            </Button>
          </div>

          {sellerType === 'funcionario' ? (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Funcionário *</Label>
              <Select
                value={selectedFuncionario}
                onValueChange={handleSelect(setSelectedFuncionario)}
              >
                <SelectTrigger className="h-10 text-black">
                  <SelectValue placeholder="Selecione o funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {funcionarios.map((f) => (
                    <SelectItem key={f.idFuncionario} value={f.idFuncionario.toString()}>
                      {f.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Cliente *</Label>
              <Select
                value={selectedCliente}
                onValueChange={handleSelect(setSelectedCliente)}
              >
                <SelectTrigger className="h-10 text-black">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((c) => (
                    <SelectItem key={c.idCliente} value={c.idCliente.toString()}>
                      {c.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={loading} className="h-10 bg-purple-700 hover:bg-purple-800">
          {loading ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Registrar Venda'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/vendas')}
          className="h-10"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
