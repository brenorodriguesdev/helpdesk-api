import { Login } from '../entities/login'

export interface LoginRepository {
  create: (login: Login) => Promise<void>
  findByEmail: (email: string) => Promise<Login>
}
