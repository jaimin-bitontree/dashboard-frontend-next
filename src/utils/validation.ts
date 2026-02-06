type FormValue = string | number | null | undefined
const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=\S{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/
export const validateAge = (
  value: FormValue,
  message: string
): string | null => {
  if (value === '' || value === null || value === undefined) {
    return message
  }
  const age = Number(value)
  if (Number.isNaN(age)) {
    return 'Age must be a number'
  }
  if (age <= 0) {
    return 'Age must be greater than 0'
  }
  if (age > 120) {
    return 'Age must be less than or equal to 120'
  }
  return null
}

const validateRequired = (
  value: string | null | undefined,
  message: string
): string | null => {
  if (!value?.trim()) return message
  return null
}

const validateRegex = (
  value: string | null | undefined,
  regex: RegExp,
  message: string
): string | null => {
  if (value && !regex.test(value.trim())) return message
  return null
}

const cleanErrors = (
  errors: Record<string, string | null>
): Record<string, string> => {
  Object.keys(errors).forEach((key) => {
    if (!errors[key]) delete errors[key]
  })
  return errors as Record<string, string>
}
type SignupData = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}
export const validateSignup = (data: SignupData) => {
  const errors: Record<string, string | null> = {}
  errors.name =
    validateRequired(data.name, 'full name is required') ||
    validateRegex(data.name, nameRegex, 'Only alphabets are allowed')
  errors.email =
    validateRequired(data.email, 'Email is required') ||
    validateRegex(
      data.email,
      emailRegex,
      'Email format is not correct (ex: abc@gmail.com)'
    )
  errors.password =
    validateRequired(data.password, 'Password is required') ||
    validateRegex(
      data.password,
      passwordRegex,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    )
  errors.confirmPassword =
    validateRequired(data.confirmPassword, 'Confirm password is required') ||
    (data.password?.trim() !== data.confirmPassword?.trim()
      ? 'Passwords do not match'
      : null)
  return cleanErrors(errors)
}
type LoginData = {
  email?: string
  password?: string
}
export const validateLogin = (data: LoginData) => {
  const errors: Partial<Record<keyof LoginData, string | null>> = {}
  errors.email =
    validateRequired(data.email, 'Email is required') ||
    validateRegex(
      data.email,
      emailRegex,
      'Email format is not correct (ex:abc@gmail.com)'
    )
  errors.password =
    validateRequired(data.password, 'password is required') ||
    validateRegex(
      data.password,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  return cleanErrors(errors)
}

type ResetPasswordData={
    oldPassword:string,
    newPassword:string,
    confirmPassword:string
}
export const validateResetPassword = (data:ResetPasswordData) => {
  const errors: Partial<Record<keyof ResetPasswordData, string | null>> = {}
  errors.oldPassword =
    validateRequired(data.oldPassword, 'password is required') ||
    validateRegex(
      data.oldPassword,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  errors.newPassword =
    validateRequired(data.newPassword, 'password is required') ||
    validateRegex(
      data.newPassword,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  errors.confirmPassword =
    validateRequired(data.confirmPassword, 'Confirm password is required') ||
    (data.newPassword?.trim() !== data.confirmPassword?.trim() ?
      'Passwords do not match':undefined)
  return cleanErrors(errors)
}
