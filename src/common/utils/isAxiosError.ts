import { AxiosError } from 'axios'

export const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}
