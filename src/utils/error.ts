import { AxiosError } from 'axios'
import { toast } from '@pheralb/toast'

export interface AppError {
  status: string
  message: string
}

export function handleError(error: unknown): AppError {
  console.error(error)

  let appError: AppError
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<{ message: string }>
    const status = axiosError.response?.status.toString() ?? 'Unknown'
    const message = axiosError.response?.data.message ?? error.message
    appError = {
      status,
      message,
    }
  } else if (error instanceof Error) {
    appError = {
      status: 'Unknown',
      message: error.message || 'An unknown error occurred',
    }
  } else {
    appError = {
      status: 'Unknown',
      message: 'An unkown error occurred',
    }
  }

  toast.error({
    text: `${appError.status} Error`,
    description: appError.message,
  })
  return appError
}
