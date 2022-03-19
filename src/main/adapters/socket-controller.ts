
import { ControllerSocket } from '../../presentation/contracts/controller'
import { Socket } from 'socket.io'
import { SocketRequest } from '../../presentation/contracts/socket'

export const adaptRouter = (controller: ControllerSocket) => {
  return async (socket: Socket, packet: any) => {
    const socketRequest: SocketRequest = {
      idSocket: socket.id,
      packet
    }
    await controller.handle(socketRequest)
  }
}
