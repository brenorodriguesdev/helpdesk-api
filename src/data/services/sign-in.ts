import { SignInModel } from '../../domain/models/sign-in'
import { SignInUseCase } from '../../domain/useCases/sign-in'
import { Encrypter } from '../contracts/encrypter'
import { HasherComparer } from '../contracts/hasher-comparer'
import { LoginRepository } from '../contracts/login-repository'

export class SignInService implements SignInUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter) {}

  async sign (data: SignInModel): Promise<string | Error> {
    const login = await this.loginRepository.findByEmail(data.email)
    if (!login) {
      return new Error('Email ou senha incorreta!')
    }
    const isValid = await this.hasherComparer.compare(data.password, login.password)
    if (!isValid) {
      return new Error('Email ou senha incorreta!')
    }
    const token = await this.encrypter.encrypt(login)
    return token
  }
}
