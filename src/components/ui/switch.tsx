import { cn } from '@/lib/utils'

type Props = { checked: boolean; onCheckedChange: (checked: boolean) => void }

export function Switch({ checked, onCheckedChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn('h-6 w-11 rounded-full p-1 transition', checked ? 'bg-primary' : 'bg-muted')}
    >
      <span className={cn('block h-4 w-4 rounded-full bg-white transition', checked ? 'translate-x-5' : '')} />
    </button>
  )
}
