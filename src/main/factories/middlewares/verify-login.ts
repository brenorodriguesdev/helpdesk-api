import { VerifyLoginService } from '../../../data/services/verify-login'
import { JwtAdapter } from '../../../infra/jwt'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { VerifyLoginMiddleware } from '../../../presentation/middlewares/verify-login'

export const makeVerifyLoginMiddleware = (): VerifyLoginMiddleware => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const jwtAdapter = new JwtAdapter()
  const verifyLoginService = new VerifyLoginService(loginRepositoryPG, jwtAdapter)
  return new VerifyLoginMiddleware(verifyLoginService)
}
