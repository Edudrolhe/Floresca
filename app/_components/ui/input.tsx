import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from 'cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:ring-purple-500/50 disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 h-8 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 transition-colors outline-none focus:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
