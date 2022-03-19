import { UserConnection } from '../data/contracts/user-connection'
import { winSockServer } from '../main/config/app'

export interface User {
  idSocket: string
  idLogin: number
}

let usersConnection: User[] = []

export class UserConnectionSocket implements UserConnection {
  async connect (idLogin: number, idConnection: string): Promise<void> {
    usersConnection.push({
      idLogin,
      idSocket: idConnection
    })
  }

  async disconnect (idConnection: string): Promise<void> {
    usersConnection = usersConnection.filter(userConnection => userConnection.idSocket !== idConnection)
  }

  async sendPacket (idLogin: number, namePacket: string, packet: any): Promise<void> {
    const userConnection = usersConnection.find(userConnection => userConnection.idLogin === idLogin)
    winSockServer.to(userConnection.idSocket).emit(namePacket, packet)
  }
}
