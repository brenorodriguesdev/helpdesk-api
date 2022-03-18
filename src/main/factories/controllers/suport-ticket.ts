import { SuportTicketService } from '../../../data/services/suport-ticket'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { SuportTicketController } from '../../../presentation/controllers/suport-ticket'
import { makeSuportTicketValidator } from '../validators/suport-ticket'

export const makeCreateTicketController = (): SuportTicketController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const suportTicketService = new SuportTicketService(loginRepositoryPG, ticketRepositoryPG)
  return new SuportTicketController(makeSuportTicketValidator(), suportTicketService)
}
