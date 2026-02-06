'use client'
import Input from '@/components/Input'
import Button from '@/components/Button'
import '@/styles/resetpassword.css'

import { useResetPassword } from '@/hooks/useResetPassword'
function ResetPassword() {
  const {
    formData,
    errors,
    handleBlur,
    touched,
    isLoading,
    handleChange,
    handleSubmit,
  } = useResetPassword()
  return (
    <div className="resetpassword-page">
      <div className="auth-wrapper resetPassword-wrapper">
        <h2>Reset Password</h2>
        <form action="" onSubmit={handleSubmit} className="auth-card reset-card">
          <Input
            onBlur={handleBlur}
            err={touched.oldPassword ? errors.oldPassword : ''}
            name="oldPassword"
            label="Old Password"
            type="password"
            placeholder="Enter a Old Password"
            required
            onChange={handleChange}
            value={formData.oldPassword}
          />
          <Input
            onBlur={handleBlur}
            err={touched.newPassword ? errors.newPassword : ''}
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter a New Password"
            required
            onChange={handleChange}
            value={formData.newPassword}
          />
          <Input
            onBlur={handleBlur}
            err={touched.confirmPassword ? errors.confirmPassword : ''}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Enter a Confirm Password"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <Button disabled={isLoading}>Reset Password</Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword