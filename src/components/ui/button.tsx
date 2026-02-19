import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'secondary' | 'ghost' | 'destructive' }

export function Button({ className, variant = 'default', ...props }: Props) {
  const styles = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
  }

  return (
    <button
      className={cn('rounded-md px-3 py-2 text-sm font-medium transition disabled:opacity-50', styles[variant], className)}
      {...props}
    />
  )
}
