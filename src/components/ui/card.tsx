import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('rounded-lg border bg-card p-4', className)}>{children}</section>
}
