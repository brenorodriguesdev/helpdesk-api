import { SignUpService } from '../../../data/services/sign-up'
import { BcryptAdapter } from '../../../infra/bcrypt'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { SignUpController } from '../../../presentation/controllers/sign-up'
import { makeSignUpValidator } from '../validators/sign-up'

export const makeSignUpController = (): SignUpController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const bcryptAdapter = new BcryptAdapter()
  const signUpService = new SignUpService(loginRepositoryPG, bcryptAdapter)
  return new SignUpController(makeSignUpValidator(), signUpService)
}
