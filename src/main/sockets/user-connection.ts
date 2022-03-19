import { Socket } from 'socket.io'
import { adaptEvent } from '../adapters/socket-controller'
import { makeOnConnectController } from '../factories/controllers/on-connect'
import { makeOnDisconnectController } from '../factories/controllers/on-disconnect'

export default (socket: Socket): void => {
  socket.on('onConnect', async (packet: any) => await adaptEvent(socket, packet, makeOnConnectController()))
  socket.on('disconnect', async (packet: any) => await adaptEvent(socket, packet, makeOnDisconnectController()))
}
