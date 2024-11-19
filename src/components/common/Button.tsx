import { ReactNode } from 'react'

interface Props {
  color?: string
  children: ReactNode
  className?: string
  loading?: boolean
  disabled?: () => boolean
  onClick?: () => void
}

export const Button = ({
  color,
  children,
  loading,
  className,
  onClick,
  disabled,
}: Props) => {
  const isDisabled = loading ? true : disabled ? disabled() : false

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`border px-4 py-2 rounded-md w-fit ${className}`}
      style={{
        color: isDisabled ? 'gray' : color,
        borderColor: isDisabled ? 'gray' : color,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  )
}
