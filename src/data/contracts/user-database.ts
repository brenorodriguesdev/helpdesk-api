export interface UserDatabase {
  add: (idLogin: number, idConnection: number) => Promise<void>
  remove: (idLogin: number) => Promise<void>
  send: (idLogin: number, packet: any) => Promise<void>
}
