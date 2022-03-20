import { Login } from '../entities/login'

export interface LoginRepository {
  create: (login: Login) => Promise<void>
  findByEmail: (email: string) => Promise<Login>
  findById: (id: number) => Promise<Login>
  getAllByType: (idLoginType: number) => Promise<Login[]>
}
