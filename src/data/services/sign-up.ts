import { SignUpModel } from '../../domain/models/sign-up'
import { SignUpUseCase } from '../../domain/useCases/sign-up'
import { Hasher } from '../contracts/hasher'
import { LoginRepository } from '../contracts/login-repository'
import { LoginType } from '../entities/login-type'

export class SignUpService implements SignUpUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly hasher: Hasher) {}

  async sign (data: SignUpModel): Promise<void | Error> {
    const login = await this.loginRepository.findByEmail(data.email)
    if (login) {
      return new Error('Esse e-mail já está cadastrado!')
    }
    data.password = await this.hasher.hash(data.password)
    const loginClientType: LoginType = { id: 1, name: 'client' }
    await this.loginRepository.create({ ...data, type: loginClientType })
  }
}
