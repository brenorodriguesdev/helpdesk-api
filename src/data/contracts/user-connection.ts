export interface UserConnection {
  connect: (idLogin: number, idConnection: number) => Promise<void>
  disconnect: (idLogin: number) => Promise<void>
  sendPacket: (idLogin: number, packet: any) => Promise<void>
}
