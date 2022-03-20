import { MessageRepository } from '../data/contracts/message-repository'
import { Login } from '../data/entities/login'
import { LoginType } from '../data/entities/login-type'
import { Message } from '../data/entities/message'
import { MessageStatus } from '../data/entities/message-status'
import { Ticket } from '../data/entities/ticket'
import { TicketStatus } from '../data/entities/ticket-status'
import { database } from '../main/config/database'

export class MessageRepositoryPG implements MessageRepository {
  async create (message: Message): Promise<void> {
    await database.none('insert into message (body, createat, idticket, idmessagestatus, idloginsend) values ($1, $2, $3, $4, $5)', [message.body, message.createAt, message.ticket.id, message.messageStatus.id, message.loginSend.id])
  }

  async updateStatusByTicketAndNotLogin (idMessageStatus: number, idLoginReceive: number, idNewMessageStatus: number): Promise<void> {
    await database.none('update message set idmessagestatus = $1 where idloginsend <> $2 and idmessagestatus = $3', [idNewMessageStatus, idLoginReceive, idMessageStatus])
  }

  async getByTicketAndNotLogin (idMessageStatus: number, idLoginReceive: number): Promise<Message[]> {
    const messagesTable = await database.manyOrNone('select * from message where idmessagestatus = $1 and idloginsend <> $2', [idMessageStatus, idLoginReceive])
    const messages = await Promise.all(messagesTable.map(async messageTable => {
      const ticketTable = await database.oneOrNone('select * from ticket where id = $1', [messageTable.idTicket])
      const loginClientTable = await database.oneOrNone('select * from login where id = $1', [ticketTable.idloginclient])
      const loginClientTypeTable = await database.oneOrNone('select * from loginType where id = $1', [ticketTable.idloginclient])
      const loginSuportTable = await database.oneOrNone('select * from login where id = $1', [ticketTable.idloginsuport])
      const loginSuportTypeTable = await database.oneOrNone('select * from loginType where id = $1', [ticketTable.idloginclient])
      const ticketStatusTable = await database.oneOrNone('select * from ticketStatus where id = $1', [ticketTable.idticketstatus])
      const messageStatusTable = await database.oneOrNone('select * from messagestatus where id = $1', [messageTable.idmessagestatus])

      const loginClientType: LoginType = {
        id: loginClientTypeTable.id,
        name: loginClientTypeTable.name
      }

      const loginClient: Login = {
        id: loginClientTable.id,
        email: loginClientTable.email,
        name: loginClientTable.name,
        password: loginClientTable.password,
        company: loginClientTable.company,
        type: loginClientType

      }

      const loginSuportType: LoginType = {
        id: loginSuportTypeTable?.id,
        name: loginSuportTypeTable?.name
      }

      const loginSuport: Login = {
        id: loginSuportTable?.id,
        email: loginSuportTable?.email,
        name: loginSuportTable?.name,
        password: loginSuportTable?.password,
        company: loginSuportTable?.company,
        type: loginSuportType
      }

      const ticketStatus: TicketStatus = {
        id: ticketStatusTable.id,
        name: ticketStatusTable.name
      }

      const ticket: Ticket = {
        id: ticketTable.id,
        subject: ticketTable.subject,
        createAt: ticketTable.createat,
        updateAt: ticketTable.updateat,
        loginClient,
        loginSuport,
        ticketStatus
      }

      const loginSend = messageTable.idloginsend === loginClient.id ? loginClient : loginSuport

      const messageStatus: MessageStatus = {
        id: messageStatusTable.id,
        name: messageStatusTable.name
      }

      const message: Message = {
        id: messageTable.id,
        createAt: messageTable.createat,
        body: messageTable.body,
        ticket,
        loginSend,
        messageStatus
      }
      return message
    }))
    return messages
  }

  async getByTicket (idTicket: number): Promise<Message[]> {
    const messagesTable = await database.manyOrNone('select * from message where idticket = $1', [idTicket])
    const messages = await Promise.all(messagesTable.map(async messageTable => {
      const ticketTable = await database.oneOrNone('select * from ticket where id = $1', [messageTable.idticket])
      const loginClientTable = await database.oneOrNone('select * from login where id = $1', [ticketTable.idloginclient])
      const loginClientTypeTable = await database.oneOrNone('select * from loginType where id = $1', [loginClientTable.idlogintype])
      const loginSuportTable = await database.oneOrNone('select * from login where id = $1', [ticketTable.idloginsuport])
      const loginSuportTypeTable = await database.oneOrNone('select * from loginType where id = $1', [loginSuportTable?.idlogintype])
      const ticketStatusTable = await database.oneOrNone('select * from ticketStatus where id = $1', [ticketTable.idticketstatus])
      const messageStatusTable = await database.oneOrNone('select * from messagestatus where id = $1', [messageTable.idmessagestatus])

      const loginClientType: LoginType = {
        id: loginClientTypeTable.id,
        name: loginClientTypeTable.name
      }

      const loginClient: Login = {
        id: loginClientTable.id,
        email: loginClientTable.email,
        name: loginClientTable.name,
        password: loginClientTable.password,
        company: loginClientTable.company,
        type: loginClientType

      }

      const loginSuportType: LoginType = {
        id: loginSuportTypeTable?.id,
        name: loginSuportTypeTable?.name
      }

      const loginSuport: Login = {
        id: loginSuportTable?.id,
        email: loginSuportTable?.email,
        name: loginSuportTable?.name,
        password: loginSuportTable?.password,
        company: loginSuportTable?.company,
        type: loginSuportType
      }

      const ticketStatus: TicketStatus = {
        id: ticketStatusTable.id,
        name: ticketStatusTable.name
      }

      const ticket: Ticket = {
        id: ticketTable.id,
        subject: ticketTable.subject,
        createAt: ticketTable.createat,
        updateAt: ticketTable.updateat,
        loginClient,
        loginSuport,
        ticketStatus
      }

      const loginSend = messageTable.idloginsend === loginClient.id ? loginClient : loginSuport

      const messageStatus: MessageStatus = {
        id: messageStatusTable.id,
        name: messageStatusTable.name
      }

      const message: Message = {
        id: messageTable.id,
        createAt: messageTable.createat,
        body: messageTable.body,
        ticket,
        loginSend,
        messageStatus
      }
      return message
    }))
    return messages
  }
}
