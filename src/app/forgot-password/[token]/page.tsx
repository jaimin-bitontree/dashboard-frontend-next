'use client'
import { useParams } from 'next/navigation'
import Input from '@/components/Input'
import Button from '@/components/Button'
import '@/styles/forgotpassword.css'
import { useForgotPassword } from '@/hooks/useForgotPassword'

function ForgotPassword() {
  const { token } = useParams()
  if (!token) {
    throw new Error('token not found')
  }
  const {
    formData,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleSubmit,
    isLoading,
  } = useForgotPassword(token)
  return (
    <div className="forgotpassword-page">
      <div className="auth-wrapper forgotpassword-wrapper">
        <h2>Forgot Password </h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="auth-card forgotpassword-card"
        >
          <Input
            err={touched.newPassword ? errors.newPassword : ''}
            value={formData.newPassword}
            label="New Password"
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            err={touched.confirmPassword ? errors.confirmPassword : ''}
            value={formData.confirmPassword}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button disabled={isLoading} isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
