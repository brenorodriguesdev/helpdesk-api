import { Server, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { readdirSync } from 'fs'

export const setupSocket = (httpServer: HTTPServer): Server => {
  const io = new Server(httpServer, { cors: { origin: '*' } })

  io.on('connection', (socket: Socket) => {
    readdirSync(`${__dirname}/../sockets`).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`../sockets/${file}`)).default(io, socket)
      }
    })
  })

  return io
}
