'use client'
import { api } from '@/services/axios'
import axios from 'axios'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Profile {
  name: string
  email: string
  age: number
  gender: string
}
interface ProfileContextType {
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  loading: boolean
  error: string | null
  fetchUser: () => Promise<void>
}
type ProfileProviderProps = {
  children: ReactNode
}
const ProfileContext = createContext<ProfileContextType | null>(null)

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await api.get('/auth/get-profile')
      setProfile(res.data.payload)
      setError(null)
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setProfile(null)
        setError(null)
      } else {
        setError('Failed to fetch profile')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        error,
        fetchUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfileContext must be used inside ProfileProvider')
  }

  return context
}

export default ProfileContext
