import { OnDisconnectUseCase } from '../../domain/useCases/on-disconnect'
import { ControllerSocket } from '../contracts/controller'
import { SocketRequest } from '../contracts/socket'

export class OnDisconnectController implements ControllerSocket {
  constructor (private readonly onDisconnectUseCase: OnDisconnectUseCase) { }
  async handle ({ idSocket }: SocketRequest): Promise<void> {
    try {
      await this.onDisconnectUseCase.disconnect(idSocket)
    } catch (error) {

    }
  }
}
