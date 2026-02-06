'use client'

import React, { useState } from 'react'
import { validateEmail } from '../utils/validation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { api } from '@/services/axios'
type EmailData = {
  email: string
}
export const useSendMail = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<EmailData>({
    email: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof EmailData, string>>
  >({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState<
    Partial<Record<keyof EmailData, boolean>>
  >({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const field = name as keyof EmailData
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'email' ? value.toLowerCase() : value,
    }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    const field = name as keyof EmailData

    setTouched((prev) => ({ ...prev, [field]: true }))
    const validationErrors = validateEmail(formData)
    setErrors((prev) => ({
      ...prev,
      [field]: validationErrors[field],
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setTouched({ email: true })
    const validationErrors = validateEmail(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      await api.post('/auth/send-Email', formData)
      toast.success('Email Send Successfully')
      router.push('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'Failed to send reset email'
        )
      }
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        email: '',
      })
    }
  }
  return {
    handleBlur,
    touched,
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  }
}
