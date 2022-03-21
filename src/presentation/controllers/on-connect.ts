import { OnConnectUseCase } from '../../domain/useCases/on-connect'
import { VerifyLoginUseCase } from '../../domain/useCases/verify-login'
import { ControllerSocket } from '../contracts/controller'
import { SocketRequest } from '../contracts/socket'

export class OnConnectController implements ControllerSocket {
  constructor (private readonly verifyLoginUseCase: VerifyLoginUseCase,
    private readonly onConnectUseCase: OnConnectUseCase) { }

  async handle ({ idSocket, packet }: SocketRequest): Promise<void> {
    try {
      const login = await this.verifyLoginUseCase.verify(packet)
      if (login instanceof Error) {
        return
      }
      await this.onConnectUseCase.connect({
        idLogin: login?.id,
        idConnection: idSocket
      })
    } catch (error) {

    }
  }
}
