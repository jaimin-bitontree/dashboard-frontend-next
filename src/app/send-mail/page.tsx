'use client'
import '@/styles/send-mail.css'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useSendMail } from '@/hooks/useSendMail'

function ForgotPasswordRequest() {
  const {
    formData,
    errors,
    touched,
    handleBlur,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSendMail()

  return (
    <div className="mailsend-page">
      <div className="request-wrapper auth-wrapper">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="auth-card request-card"
        >
          <Input
            err={touched.email ? errors.email : ''}
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            onBlur={handleBlur}
          />
          <Button disabled={isLoading} isLoading={isLoading}>
            Send Email
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordRequest
