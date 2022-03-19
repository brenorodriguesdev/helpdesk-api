import { GetTicketsByClientService } from '../../../data/services/get-tickets-by-client'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { GetTicketsByClientController } from '../../../presentation/controllers/get-tickets-by-client'
import { makeGetTicketsByClientValidator } from '../validators/get-tickets-by-client'

export const makeGetTicketsByClientController = (): GetTicketsByClientController => {
  const ticketRepositoryPG = new TicketRepositoryPG()
  const getTicketsByClientService = new GetTicketsByClientService(ticketRepositoryPG)
  return new GetTicketsByClientController(makeGetTicketsByClientValidator(), getTicketsByClientService)
}
