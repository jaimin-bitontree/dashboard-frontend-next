import React, { useState } from 'react'
import { validateLogin } from '../utils/validation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

// import { useProfileContext } from '../context/ProfileContext'
import axios from 'axios'
import { api } from '@/services/axios'
type LoginFormData = {
  email: string
  password: string
}
export const useLogin = () => {
  const router = useRouter()

  //   const {fetchUser} = useProfileContext()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof LoginFormData, boolean>>
  >({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }))
    if (touched[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const validationErrors = validateLogin(formData)
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      email: true,
      password: true,
    })
    const validationErrors = validateLogin(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.post('/auth/login', formData)
    //   localStorage.setItem('token', res.data.token)
      console.log('login success:', res)
      toast.success('Login Successfully')

      router.push('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'Login failed'
        )
      }
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        email: '',
        password: '',
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
