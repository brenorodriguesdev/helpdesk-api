import { Server, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { readdirSync } from 'fs'

export default (httpServer: HTTPServer): void => {
  const io = new Server(httpServer, { cors: { origin: '*' } })

  io.on('connection', (socket: Socket) => {
    readdirSync(`${__dirname}/../routes`).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`../sockets/${file}`)).default(io, socket)
      }
    })
  })
}
