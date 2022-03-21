import { OnConnectService } from '../../../data/services/on-connect'
import { VerifyLoginService } from '../../../data/services/verify-login'
import { JwtAdapter } from '../../../infra/jwt'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { OnConnectController } from '../../../presentation/controllers/on-connect'

export const makeOnConnectController = (): OnConnectController => {
  const userConnectionSocket = new UserConnectionSocket()
  const loginRepositoryPG = new LoginRepositoryPG()
  const jwtAdapter = new JwtAdapter()
  const verifyLoginService = new VerifyLoginService(loginRepositoryPG, jwtAdapter)
  const onConnectService = new OnConnectService(userConnectionSocket)
  return new OnConnectController(verifyLoginService, onConnectService)
}
