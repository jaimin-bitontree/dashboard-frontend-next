import { useState } from 'react'
import { validateResetPassword } from '../utils/validation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


import axios from 'axios'
import { api } from '@/services/axios'
type ResetPasswordData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export const useResetPassword = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<ResetPasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResetPasswordData, string>>
  >({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof ResetPasswordData, boolean>>
  >({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const field = name as keyof ResetPasswordData
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    const field = name as keyof ResetPasswordData
    setTouched((prev) => ({ ...prev, [field]: true }))
    const validationErrors = validateResetPassword(formData)
    setErrors((prev) => ({
      ...prev,
      [field]: validationErrors[field],
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    })
    const validationErrors = validateResetPassword(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsLoading(true)
    try {
      await api.put('/auth/reset-password', formData)
      toast.success('Password Updated Successfully')
      localStorage.removeItem('token')
      router.push('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'Reset password failed'
        )
      }
    } finally {
      setIsLoading(false)
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setErrors({})
      setTouched({})
    }
  }

  return {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
