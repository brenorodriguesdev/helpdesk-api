import { DelegateTicketService } from '../../../data/services/delegate-ticket'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { DelegateTicketController } from '../../../presentation/controllers/delegate-ticket'
import { makeDelegateTicketValidator } from '../validators/delegate-ticket'

export const makeDelegateTicketController = (): DelegateTicketController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const delegateTicketService = new DelegateTicketService(loginRepositoryPG, ticketRepositoryPG)
  return new DelegateTicketController(makeDelegateTicketValidator(), delegateTicketService)
}
