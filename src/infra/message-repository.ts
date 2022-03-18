import { MessageRepository } from '../data/contracts/message-repository'
import { Message } from '../data/entities/message'
import { database } from '../main/config/database'

export class MessageRepositoryPG implements MessageRepository {
  async create (message: Message): Promise<void> {
    await database.none('insert into message (body, createat, idticket, idmessagestatus, idloginsend) values ($1, $2, $3, $4, $5)', [message.body, message.createAt, message.ticket.id, message.messageStatus.id, message.loginSend.id])
  }
}
