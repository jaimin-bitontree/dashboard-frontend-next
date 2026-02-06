'use client'
import { useState } from 'react'
import { validateForgotPassword } from '../utils/validation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { api } from '@/services/axios'
type ForgotPasswordData = {
  newPassword: string
  confirmPassword: string
}
export const useForgotPassword = (token: string | string[]) => {
  const router = useRouter()
  const [formData, setFormData] = useState<ForgotPasswordData>({
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof ForgotPasswordData, string>>
  >({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof ForgotPasswordData, boolean>>
  >({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const field = name as keyof ForgotPasswordData

    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    const field = name as keyof ForgotPasswordData

    setTouched((prev) => ({ ...prev, [field]: true }))
    const validationErrors = validateForgotPassword(formData)
    setErrors((prev) => ({
      ...prev,
      [field]: validationErrors[field],
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      newPassword: true,
      confirmPassword: true,
    })
    const validationErrors = validateForgotPassword(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.put('/auth/forgot-password', {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      })
      console.log('password updated', res)
      toast.success('Password Updated Successfully')
      router.push('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'reset password failed'
        )
      }
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        newPassword: '',
        confirmPassword: '',
      })
    }
  }
  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  }
}
