
import { ControllerSocket } from '../../presentation/contracts/controller'
import { Socket } from 'socket.io'
import { SocketRequest } from '../../presentation/contracts/socket'

export const adaptEvent = async (socket: Socket, packet: any, controller: ControllerSocket): Promise<void> => {
  const socketRequest: SocketRequest = {
    idSocket: socket.id,
    packet
  }
  return await controller.handle(socketRequest)
}
