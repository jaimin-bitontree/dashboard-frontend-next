'use client'
import '@/styles/login.css'

import Link from 'next/link'
import { CiLogin } from 'react-icons/ci'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useLogin } from '@/hooks/useLogin'
function Login() {
  const {
    formData,
    errors,
    handleBlur,
    touched,
    isLoading,
    handleChange,
    handleSubmit,
  } = useLogin()
  return (
    <div className="login-page">
      <div className="login-container two-column ">
        <div className="login-left left-panel">
          <h1>Hello!</h1>
          <h2>
            Have a <br />
            GOOD DAY
          </h2>
        </div>
        <div className="login-right right-panel">
          <CiLogin size={32} className="login-icon" />

          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-card form-card">
            <Input
              err={touched.email ? errors.email : ''}
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              // required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              err={touched.password ? errors.password : ''}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter a Password"
              // required
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button disabled={isLoading} isLoading={isLoading}>
              Login
            </Button>
          </form>

          <p>
            Don&apos;t have an account?{' '}
            <Link className="auth-link" href="/signup">
              Signup
            </Link>
          </p>

          <Link className="auth-link" href="/forgot-password-request">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
