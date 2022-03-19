import { OnConnectUseCase } from '../../domain/useCases/on-connect'
import { ControllerSocket } from '../contracts/controller'
import { SocketRequest } from '../contracts/socket'

export class OnConnectController implements ControllerSocket {
  constructor (private readonly onConnectUseCase: OnConnectUseCase) { }
  async handle ({ idSocket, packet }: SocketRequest): Promise<void> {
    try {
      await this.onConnectUseCase.connect({
        idLogin: packet,
        idConnection: idSocket
      })
    } catch (error) {

    }
  }
}
