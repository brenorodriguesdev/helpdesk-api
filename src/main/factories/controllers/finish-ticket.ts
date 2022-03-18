import { FinishTicketService } from '../../../data/services/finish-ticket'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { FinishTicketController } from '../../../presentation/controllers/finish-ticket'
import { makeFinishTicketValidator } from '../validators/finish-ticket'

export const makeFinishTicketController = (): FinishTicketController => {
  const ticketRepositoryPG = new TicketRepositoryPG()
  const finishTicketService = new FinishTicketService(ticketRepositoryPG)
  return new FinishTicketController(makeFinishTicketValidator(), finishTicketService)
}
