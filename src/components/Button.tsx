import React from 'react'
import '../styles/button.css'
type ButtonProps = {
  children: React.ReactNode
  isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>
function Button({
  children,
  type = 'submit',
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`custom-button ${isLoading ? 'loading' : ''} `}
      {...props}
    >
      {isLoading ? 'Submitting...' : children}
    </button>
  )
}

export default Button
