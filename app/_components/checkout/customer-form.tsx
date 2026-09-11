'use client'

import { useState } from 'react'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'

type CustomerFormProps = {
  onFormChange: (data: Record<string, string>) => void
}

export default function CustomerForm({ onFormChange }: CustomerFormProps) {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    cep: '',
  })

  const handleChange = (field: string, value: string) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    onFormChange(updated)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 border-b border-purple-200 pb-3 text-xl font-bold text-purple-800">Dados Pessoais</h2>
      <div className="grid gap-5">
        <div>
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input
            id="nome"
            value={form.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Seu nome completo"
            className="mt-2 h-12 text-base"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={form.telefone}
              onChange={(e) => handleChange('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
        </div>
        <div className="w-1/2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={form.cpf}
            onChange={(e) => handleChange('cpf', e.target.value.replace(/\D/g, '').slice(0, 11))}
            placeholder="000.000.000-00"
            maxLength={11}
            className="mt-2 h-12 text-base"
            required
          />
        </div>
      </div>

      <h2 className="mb-6 mt-8 border-b border-purple-200 pb-3 text-xl font-bold text-purple-800">Endereço de Entrega</h2>
      <div className="grid gap-5">
        <div className="grid grid-cols-[1fr_120px] gap-4">
          <div>
            <Label htmlFor="rua">Rua *</Label>
            <Input
              id="rua"
              value={form.rua}
              onChange={(e) => handleChange('rua', e.target.value)}
              placeholder="Nome da rua"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="numero">Número *</Label>
            <Input
              id="numero"
              value={form.numero}
              onChange={(e) => handleChange('numero', e.target.value)}
              placeholder="123"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            value={form.complemento}
            onChange={(e) => handleChange('complemento', e.target.value)}
            placeholder="Apto, Bloco, etc."
            className="mt-2 h-12 text-base"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bairro">Bairro *</Label>
            <Input
              id="bairro"
              value={form.bairro}
              onChange={(e) => handleChange('bairro', e.target.value)}
              placeholder="Bairro"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
          <div>
            <Label htmlFor="cidade">Cidade *</Label>
            <Input
              id="cidade"
              value={form.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              placeholder="Cidade"
              className="mt-2 h-12 text-base"
              required
            />
          </div>
        </div>
        <div className="w-1/2">
          <Label htmlFor="cep">CEP *</Label>
          <Input
            id="cep"
            value={form.cep}
            onChange={(e) => handleChange('cep', e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="00000-000"
            maxLength={8}
            className="mt-2 h-12 text-base"
            required
          />
        </div>
      </div>
    </div>
  )
}
