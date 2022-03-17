import { LoginType } from './login-type'

export interface Login {
  id: number
  email: string
  name: string
  password: string
  company: string
  type: LoginType
}
