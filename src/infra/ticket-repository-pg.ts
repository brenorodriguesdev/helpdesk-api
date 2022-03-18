import { TicketRepository } from '../data/contracts/ticket-repository'
import { Login } from '../data/entities/login'
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

  async getAllByLoginClient (idLoginClient: any): Promise<Ticket[]> {
    const ticketsTable = await database.manyOrNone(`
    select
    ticket.id as id,
    ticket.subject as subject,
    ticket.createat as createAt,
    ticket.updateat as updateAt,
    
    loginClient.id as loginClientId,
    loginClient.email as loginClientEmail,
    loginClient.name as loginClientName,
    loginClient.password as loginClientPassword,
    loginClient.company as loginClientCompany,
    loginTypeClient.id as loginTypeClientId,
    loginTypeClient.name as loginTypeClientName
    ticket.idloginsuport,

    ticketStatus.id as ticketStatusId,
    ticketStatus.name as ticketStatusName
    
    from ticket ticket, 
    login loginClient, 
    loginType loginTypeClient,
    ticketStatus ticketStatus

    where 
    ticket.idloginclient = loginClient.id 
    and loginClient.idlogintype = loginTypeClient.id
    and ticket.idloginclient = $1
    and ticketStatus.id = ticket.idticketstatus
    `, [idLoginClient])

    const ticketsEntities = await Promise.all(ticketsTable.map(async (ticketTable: any) => {
      const adaptLogin = (loginTable: any): Login => ({
        id: loginTable.id,
        email: loginTable.email,
        name: loginTable.name,
        password: loginTable.password,
        company: loginTable.company,
        type: {
          id: loginTable.idlogintype,
          name: loginTable.namelogintype
        }
      })

      const loginSuport: Login = ticketTable.idloginsuport
        ? adaptLogin(await database.oneOrNone(
        `select
        login.id as id,
        login.email as email,
        login.name as name,
        login.password as password
        login.company as company
        logintype.id as idlogintype
        logintype.name as namelogintype
        from 
        login login, 
        loginType 
        loginType 
        where 
        login.id = $1 
        and loginType.id = login.idlogintype`))
        : null

      const ticketEntity: Ticket = {
        id: ticketTable.id,
        subject: ticketTable.subject,
        createAt: ticketTable.createat,
        updateAt: ticketTable.updateat,
        loginClient: {
          id: ticketTable.loginclientid,
          email: ticketTable.loginclientemail,
          name: ticketTable.loginclientname,
          password: ticketTable.loginclientpassword,
          company: ticketTable.loginclientcompany,
          type: {
            id: ticketTable.logintypeclientid,
            name: ticketTable.logintypeclientname
          }

        },
        loginSuport,
        ticketStatus: {
          id: ticketTable.ticketStatusId,
          name: ticketTable.ticketStatusName
        }
      }

      return ticketEntity
    }))

    return ticketsEntities
  }

  async getAllByLoginSuport (idLoginSuport: any): Promise<Ticket[]> {
    const ticketsTable = await database.manyOrNone(`
    select
    ticket.id as id,
    ticket.subject as subject,
    ticket.createat as createAt,
    ticket.updateat as updateAt,
    
    loginClient.id as loginClientId,
    loginClient.email as loginClientEmail,
    loginClient.name as loginClientName,
    loginClient.password as loginClientPassword,
    loginClient.company as loginClientCompany,
    loginTypeClient.id as loginTypeClientId,
    loginTypeClient.name as loginTypeClientName
    ticket.idloginsuport,

    ticketStatus.id as ticketStatusId,
    ticketStatus.name as ticketStatusName
    
    from ticket ticket, 
    login loginClient, 
    loginType loginTypeClient,
    ticketStatus ticketStatus


    where 
    ticket.idloginclient = loginClient.id 
    and loginClient.idlogintype = loginTypeClient.id
    and ticketStatus.id = ticket.idticketstatus
    and ticket.idloginsuport = $1
    `, [idLoginSuport])

    const ticketsEntities = await Promise.all(ticketsTable.map(async (ticketTable: any) => {
      const adaptLogin = (loginTable: any): Login => ({
        id: loginTable.id,
        email: loginTable.email,
        name: loginTable.name,
        password: loginTable.password,
        company: loginTable.company,
        type: {
          id: loginTable.idlogintype,
          name: loginTable.namelogintype
        }
      })

      const loginSuport: Login = ticketTable.idloginsuport
        ? adaptLogin(await database.oneOrNone(
        `select
        login.id as id,
        login.email as email,
        login.name as name,
        login.password as password
        login.company as company
        logintype.id as idlogintype
        logintype.name as namelogintype
        from 
        login login, 
        loginType 
        loginType 
        where 
        login.id = $1 
        and loginType.id = login.idlogintype`))
        : null

      const ticketEntity: Ticket = {
        id: ticketTable.id,
        subject: ticketTable.subject,
        createAt: ticketTable.createat,
        updateAt: ticketTable.updateat,
        loginClient: {
          id: ticketTable.loginclientid,
          email: ticketTable.loginclientemail,
          name: ticketTable.loginclientname,
          password: ticketTable.loginclientpassword,
          company: ticketTable.loginclientcompany,
          type: {
            id: ticketTable.logintypeclientid,
            name: ticketTable.logintypeclientname
          }

        },
        loginSuport,
        ticketStatus: {
          id: ticketTable.ticketStatusId,
          name: ticketTable.ticketStatusName
        }
      }

      return ticketEntity
    }))

    return ticketsEntities
  }

  async getAllByTicketStatus (idTicketStatus: any): Promise<Ticket[]> {
    const ticketsTable = await database.manyOrNone(`
    select
    ticket.id as id,
    ticket.subject as subject,
    ticket.createat as createAt,
    ticket.updateat as updateAt,
    
    loginClient.id as loginClientId,
    loginClient.email as loginClientEmail,
    loginClient.name as loginClientName,
    loginClient.password as loginClientPassword,
    loginClient.company as loginClientCompany,
    loginTypeClient.id as loginTypeClientId,
    loginTypeClient.name as loginTypeClientName
    ticket.idloginsuport,

    ticketStatus.id as ticketStatusId,
    ticketStatus.name as ticketStatusName
    
    from ticket ticket, 
    login loginClient, 
    loginType loginTypeClient,
    ticketStatus ticketStatus

    
    where 
    ticket.idloginclient = loginClient.id 
    and loginClient.idlogintype = loginTypeClient.id
    and ticketStatus.id = ticket.idticketstatus
    and ticket.idticketstatus = $1
    `, [idTicketStatus])

    const ticketsEntities = await Promise.all(ticketsTable.map(async (ticketTable: any) => {
      const adaptLogin = (loginTable: any): Login => ({
        id: loginTable.id,
        email: loginTable.email,
        name: loginTable.name,
        password: loginTable.password,
        company: loginTable.company,
        type: {
          id: loginTable.idlogintype,
          name: loginTable.namelogintype
        }
      })

      const loginSuport: Login = ticketTable.idloginsuport
        ? adaptLogin(await database.oneOrNone(
        `select
        login.id as id,
        login.email as email,
        login.name as name,
        login.password as password
        login.company as company
        logintype.id as idlogintype
        logintype.name as namelogintype
        from 
        login login, 
        loginType 
        loginType 
        where 
        login.id = $1 
        and loginType.id = login.idlogintype`))
        : null

      const ticketEntity: Ticket = {
        id: ticketTable.id,
        subject: ticketTable.subject,
        createAt: ticketTable.createat,
        updateAt: ticketTable.updateat,
        loginClient: {
          id: ticketTable.loginclientid,
          email: ticketTable.loginclientemail,
          name: ticketTable.loginclientname,
          password: ticketTable.loginclientpassword,
          company: ticketTable.loginclientcompany,
          type: {
            id: ticketTable.logintypeclientid,
            name: ticketTable.logintypeclientname
          }

        },
        loginSuport,
        ticketStatus: {
          id: ticketTable.ticketStatusId,
          name: ticketTable.ticketStatusName
        }
      }

      return ticketEntity
    }))

    return ticketsEntities
  }
}
