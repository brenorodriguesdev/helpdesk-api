import { GetTicketsBySuportService } from '../../../data/services/get-tickets-by-suport'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { GetTicketsBySuportController } from '../../../presentation/controllers/get-tickets-by-suport'
import { makeGetTicketsBySuportValidator } from '../validators/get-tickets-by-suport'

export const makeGetTicketsBySuportController = (): GetTicketsBySuportController => {
  const ticketRepositoryPG = new TicketRepositoryPG()
  const getTicketsBySuportService = new GetTicketsBySuportService(ticketRepositoryPG)
  return new GetTicketsBySuportController(makeGetTicketsBySuportValidator(), getTicketsBySuportService)
}
