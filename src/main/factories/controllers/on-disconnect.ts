import { OnDisconnectService } from '../../../data/services/on-disconnect'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { OnDisconnectController } from '../../../presentation/controllers/on-disconnect'

export const makeOnDisconnectController = (): OnDisconnectController => {
  const userConnectionSocket = new UserConnectionSocket()
  const onDisconnectService = new OnDisconnectService(userConnectionSocket)
  return new OnDisconnectController(onDisconnectService)
}
