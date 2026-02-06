'use client'
import Input from '@/components/Input'
import Button from '@/components/Button'

import '@/styles/signup.css'
import { useSignup } from '@/hooks/useSignup'
import Link from 'next/link'
import Image from 'next/image'
import { MdSupervisorAccount } from 'react-icons/md'

function Signup() {
  const {
    formData,
    handleBlur,
    errors,
    touched,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSignup()
  return (
    <div className="signup-page">
      <div className="signup-container two-column">
        <div className="signup-left left-panel">
        
          <Image
            src="/assets/signup-hero.png"
            alt="Signup illustration"
            className="signup-hero"
            width={400}
            height={400}
          ></Image>
        </div>
        <div className="signup-right right-panel">
          <MdSupervisorAccount size={35} />

          <h2>SignUp</h2>
          <form onSubmit={handleSubmit} action="" className="signup-card form-card">
            <Input
              err={touched.name ? (errors.name ?? '') : ''}
              value={formData.name}
              label="Full Name"
              type="Text"
              placeholder="FullName"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              err={touched.email ? (errors.email ?? '') : ''}
              value={formData.email}
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              err={touched.password ? (errors.password ?? '') : ''}
              value={formData.password}
              label="Password"
              type="password"
              placeholder="Enter a Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              err={
                touched.confirmPassword ? (errors.confirmPassword ?? '') : ''
              }
              value={formData.confirmPassword}
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button isLoading={isLoading}>Submit</Button>
          </form>
          <p>
            Already have an account?{' '}
            <Link className="auth-link" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
