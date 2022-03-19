import { Message } from '../entities/message'

export interface MessageRepository {
  create: (message: Message) => Promise<void>
  getByTicketAndNotLogin: (idMessageStatus: number, idLoginReceive: number) => Promise<Message[]>
  updateStatusByTicketAndNotLogin: (idMessageStatus: number, idLoginReceive: number, idNewMessageStatus: number) => Promise<void>
  getByTicket: (idTicket: number) => Promise<Message[]>
}
