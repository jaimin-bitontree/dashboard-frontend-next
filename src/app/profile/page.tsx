'use client'
import Input from '@/components/Input'
import Button from '@/components/Button'
import ClipLoader from 'react-spinners/ClipLoader'
import { CiEdit } from 'react-icons/ci'
import '@/styles/profile.css'
import { FaSave } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'
import { useProfile } from '@/hooks/useProfile'
import { useRouter } from 'next/navigation'


function Profile() {
  const router = useRouter()

  const {
    errors,
    profile,
    formData,
    loading,
    saving,
    isEditing,
    startEdit,
    cancelEdit,
    handleChange,
    saveProfile,
    isChanged,
  } = useProfile()

  if (loading) {
    return (
      <div className="profile-loading">
        <ClipLoader size={40} color="#4f46e5" />
        Loading profile...
      </div>
    )
  }
  if (!profile) {
    return <div className="profile-error">Profile not found</div>
  }
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <Input
          err={errors.name}
          label="Full Name"
          name="name"
          value={isEditing ? formData.name : profile.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input label="Email" value={profile.email} disabled />
        <Input
          label="Age"
          type="number"
          name="age"
          value={isEditing ? formData.age : profile.age || ''}
          onChange={handleChange}
          disabled={!isEditing}
          err={errors.age}
        />
        <div className="input-group">
          <label>Gender</label>
          <select
            name="gender"
            value={isEditing ? formData.gender : profile.gender || ''}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <small className="error">{errors.gender || '\u00A0'}</small>
        </div>
        <div className="profile-action">
          {isEditing ? (
            <>
              <Button
                type="button"
                disabled={!isChanged || saving}
                onClick={saveProfile}
                isLoading={saving}
              >
                <FaSave />
                Save
              </Button>

              <Button type="button" onClick={cancelEdit} disabled={saving}>
                <MdOutlineCancel />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={startEdit}>
                <CiEdit size={20} />
                Edit Profile
              </Button>
              <Button type="button" onClick={() => router.push('/reset-password')}>
                Reset Password
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile