import { ClockIcon, CheckCircleIcon, XCircleIcon, RotateCcwIcon } from 'lucide-react'
import { cn } from '@/app/_lib/utils'

type PaymentStatus = 'pendente' | 'aprovado' | 'cancelado' | 'reembolsado'

const statusConfig: Record<PaymentStatus, { label: string; className: string; icon: React.ElementType }> = {
  pendente: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800',
    icon: ClockIcon,
  },
  aprovado: {
    label: 'Aprovado',
    className: 'bg-green-100 text-green-800',
    icon: CheckCircleIcon,
  },
  cancelado: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
    icon: XCircleIcon,
  },
  reembolsado: {
    label: 'Reembolsado',
    className: 'bg-gray-100 text-gray-800',
    icon: RotateCcwIcon,
  },
}

type PaymentStatusBadgeProps = {
  status: PaymentStatus
}

export default function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pendente
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        config.className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}
