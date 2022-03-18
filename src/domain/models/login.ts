import { LoginTypeModel } from './login-type'

export interface LoginModel {
  id?: number
  name: string
  company: string
  type: LoginTypeModel
}
