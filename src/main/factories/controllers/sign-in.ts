import { SignInService } from '../../../data/services/sign-in'
import { BcryptAdapter } from '../../../infra/bcrypt'
import { JwtAdapter } from '../../../infra/jwt'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { SignInController } from '../../../presentation/controllers/sign-in'
import { makeSignInValidator } from '../validators/sign-in'

export const makeSignInController = (): SignInController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter()
  const signInService = new SignInService(loginRepositoryPG, bcryptAdapter, jwtAdapter)
  return new SignInController(makeSignInValidator(), signInService)
}
