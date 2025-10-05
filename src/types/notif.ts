export interface Notification {
  id: number
  message: string
  type: 'info' | 'warn' | 'error'
}

export interface Notifier {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}
