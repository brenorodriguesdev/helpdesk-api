export interface UserConnection {
  connect: (idLogin: number, idConnection: string) => Promise<void>
  disconnect: (idConnection: string) => Promise<void>
  sendPacket: (idLogin: number, namePacket: string, packet: any) => Promise<void>
}
