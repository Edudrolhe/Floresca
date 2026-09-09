export { cn } from 'cn'

export function toPlainDate(dateStr: string) {
  return (globalThis as any).Temporal.PlainDate.from(dateStr)
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '-'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
