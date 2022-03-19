import { OnConnectService } from '../../../data/services/on-connect'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { OnConnectController } from '../../../presentation/controllers/on-connect'

export const makeOnConnectController = (): OnConnectController => {
  const userConnectionSocket = new UserConnectionSocket()
  const onConnectService = new OnConnectService(userConnectionSocket)
  return new OnConnectController(onConnectService)
}
