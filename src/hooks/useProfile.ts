'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useProfileContext } from '../context/ProfileContext'
import axios from 'axios'
import { api } from '@/services/axios'
import { validateProfileUpdate } from '@/utils/validation'

interface ProfileFormData {
  name: string
  age: string
  gender: string
}

interface ProfileErrors {
  name?: string
  age?: string
  gender?: string
}
export const useProfile = () => {
  const { profile, setProfile, loading } = useProfileContext()
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    age: '',
    gender: '',
  })
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age ? String(profile.age) : '',
        gender: profile.gender || '',
      })
    }
  }, [profile])
  const isChanged =
    formData.name !== profile?.name ||
    formData.age !== String(profile?.age ?? '') ||
    formData.gender !== profile?.gender
  const startEdit = () => {
    setIsEditing(true)
  }
  const cancelEdit = () => {
    setErrors({})
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age ? String(profile.age) : '',
        gender: profile.gender || '',
      })
    }
    setIsEditing(false)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const saveProfile = async () => {
    if (!isChanged) return

    const validationError = validateProfileUpdate(formData)
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError)
      return
    }
    setErrors({})
    try {
      setSaving(true)
      await api.put('/auth/profile-update', formData)
      toast.success('Profile Updated Successfully')
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              ...formData,
              age: Number(formData.age),
            }
          : prev
      )
      setIsEditing(false)
    //   fetchUser()
    } catch (error: unknown) {
      console.log('update profile error:', error)
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            'Profile update fail'
        )
      }
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }
  return {
    profile,
    saving,
    loading,
    formData,
    startEdit,
    cancelEdit,
    handleChange,
    saveProfile,
    isEditing,
    errors,
    isChanged,
  }
}
