import { TicketRepository } from '../data/contracts/ticket-repository'
import { Ticket } from '../data/entities/ticket'
import { database } from '../main/config/database'

export class TicketRepositoryPG implements TicketRepository {
  async create (ticket: Ticket): Promise<Ticket> {
    const ticketTable = await database.oneOrNone('insert into ticket (subject, createat, updateat, idloginclient, idticketstatus) values ($1, $2, $3, $4, $5) returning *', [ticket.subject, ticket.createAt, ticket.updateAt, ticket.loginClient.id, ticket.ticketStatus.id])
    if (!ticketTable) {
      return null
    }
    const idLoginClient = ticketTable.idloginclient
    const loginClient = await database.oneOrNone('select * from login where id = $1', [idLoginClient])
    const idTicketStatus = ticketTable.idticketstatus
    const ticketStatus = await database.oneOrNone('select * from ticketstatus where id = $1', [idTicketStatus])
    const ticketModel = { ...ticketTable, loginClient, ticketStatus }
    delete ticketModel.idloginclient
    delete ticketModel.idticketstatus
    return ticketModel
  }
}