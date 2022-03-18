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
    ticketModel.createAt = ticketTable.createat
    ticketModel.updateAt = ticketTable.updateat
    delete ticketModel.idloginclient
    delete ticketModel.idticketstatus
    return ticketModel
  }

  async findById (id: number): Promise<Ticket> {
    const ticketTable = await database.oneOrNone('select * from ticket where id = $1', [id])
    if (!ticketTable) {
      return null
    }
    let loginClient
    let loginSuport
    const idLoginClient = ticketTable.idloginclient
    const loginClientTable = await database.oneOrNone('select * from login where id = $1', [idLoginClient])

    if (loginClientTable) {
      const loginClientType = await database.oneOrNone('select * from loginType where id = $1', [loginClientTable.idlogintype])
      delete loginClientTable.idlogintype
      loginClient = { ...loginClientTable, type: loginClientType }
    }
    const idLoginSuport = ticketTable.idloginsuport
    const loginSuportTable = await database.oneOrNone('select * from login where id = $1', [idLoginSuport])
    if (loginSuportTable) {
      const loginSuportType = await database.oneOrNone('select * from loginType where id = $1', [loginSuportTable.idlogintype])
      delete loginSuportTable.idlogintype
      loginSuport = { ...loginSuportTable, type: loginSuportType }
    }
    const idTicketStatus = ticketTable.idticketstatus
    const ticketStatus = await database.oneOrNone('select * from ticketstatus where id = $1', [idTicketStatus])
    const ticketModel = { ...ticketTable, loginClient, loginSuport, ticketStatus }
    ticketModel.createAt = ticketTable.createat
    ticketModel.updateAt = ticketTable.updateat
    delete ticketModel.idloginclient
    delete ticketModel.idloginsuport
    delete ticketModel.idticketstatus
    return ticketModel
  }

  async update (ticket: Ticket): Promise<void> {
    await database.none('update ticket set subject = $1, createat = $2, updateat = $3, idloginclient = $4, idloginsuport = $5, idticketstatus = $6 where id = $7', [ticket.subject, ticket.createAt, ticket.updateAt, ticket.loginClient.id, ticket.loginSuport.id, ticket.ticketStatus.id, ticket.id])
  }
}
