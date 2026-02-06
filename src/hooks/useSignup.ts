'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { validateSignup } from '@/utils/validation'
import { api } from '@/services/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'
type SignupFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export const useSignup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState<
    Partial<Record<keyof SignupFormData, boolean>>
  >({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }))
    if (touched[name as keyof SignupFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target

    setTouched((prev) => ({ ...prev, [name]: true }))

    const validationErrors = validateSignup(formData)

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    })
    const validationErrors = validateSignup(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.post('/auth/signup', formData)
      console.log('Signup success:', res)
      toast.success('Sign Up Successfully')
      //   setFormData({
      //     name: '',
      //     email: '',
      //     password: '',
      //     confirmPassword: '',
      //   })
      setErrors({})
      setTouched({})
      router.push('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'signup failed'
        )
      }
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    }
  }
  return {
    touched,
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleBlur,
  }
}
