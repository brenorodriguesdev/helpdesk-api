import { VerifyLoginUseCase } from '../../domain/useCases/verify-login'
import { Decrypter } from '../contracts/decrypter'
import { LoginRepository } from '../contracts/login-repository'

export class VerifyLoginService implements VerifyLoginUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly decrypter: Decrypter) {}

  async verify (token: string): Promise<object | Error> {
    const object = await this.decrypter.decrypt(token)
    if (!object) {
      return new Error('Esse token não é válido!')
    }
    const login = await this.loginRepository.findByEmail(object.id)
    if (!login) {
      return new Error('Esse usuário não existe!')
    }

    return login
  }
}
