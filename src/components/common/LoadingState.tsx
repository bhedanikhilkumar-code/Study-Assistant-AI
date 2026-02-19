export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return <div className="rounded-lg border p-4 text-sm text-muted-foreground">{message}</div>
}
