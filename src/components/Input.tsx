import React from 'react'
import '../styles/input.css'
type InputProps = {
  label?: string
  err?: string
} & React.InputHTMLAttributes<HTMLInputElement>
function Input({ label, err, ...props }: InputProps) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...props} />
      <small className="error">{err || '\u00A0'}</small>
    </div>
  )
}

export default Input
