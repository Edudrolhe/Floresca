'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'
import { XIcon } from 'lucide-react'
import { Button } from './button'

function Sheet({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/50 duration-200',
        className
      )}
      {...props}
    />
  )
}

type SheetContentProps = DialogPrimitive.Popup.Props & {
  side?: 'left' | 'right'
}

function SheetContent({
  className,
  children,
  side = 'left',
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          'data-open:animate-in data-closed:animate-out fixed z-50 flex flex-col bg-white shadow-xl outline-none duration-200',
          side === 'left' && 'data-open:slide-in-from-left data-closed:slide-out-to-left inset-y-0 left-0 h-full w-72',
          side === 'right' && 'data-open:slide-in-from-right data-closed:slide-out-to-right inset-y-0 right-0 h-full w-72',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({
  className,
  onClose,
  children,
  ...props
}: React.ComponentProps<'div'> & { onClose?: () => void }) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex items-center justify-between border-b p-4', className)}
      {...props}
    >
      {children}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-8 shrink-0"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      )}
    </div>
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-body"
      className={cn('flex-1 overflow-y-auto p-4', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('border-t p-4', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
