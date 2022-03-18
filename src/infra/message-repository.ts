import { MessageRepository } from '../data/contracts/message-repository'
import { Message } from '../data/entities/message'
import { database } from '../main/config/database'

export class MessageRepositoryPG implements MessageRepository {
  async create (message: Message): Promise<void> {
    await database.none('insert into message (body, createat, idticket, idmessagestatus, idloginsend) values ($1, $2, $3, $4, $5)', [message.body, message.createAt, message.ticket.id, message.messageStatus.id, message.loginSend.id])
  }

  async updateStatusByTicketAndNotLogin (idMessageStatus: number, idLoginReceive: number, idNewMessageStatus: number): Promise<void> {
    await database.none('update message set idmessagestatus = $1 where idloginsend <> $2 and idmessagestatus = $3', [idNewMessageStatus, idLoginReceive, idMessageStatus])
  }
}
