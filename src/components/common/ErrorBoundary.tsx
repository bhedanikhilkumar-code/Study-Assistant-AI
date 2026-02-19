import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-6 rounded-lg border border-destructive p-6">
          <div className="font-medium">Something went wrong.</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Please refresh the app. If the issue persists, try clearing site data.
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
