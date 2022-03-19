import { GetMessagesByTicketService } from '../../../data/services/get-messages-by-ticket'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { GetMessagesByTicketController } from '../../../presentation/controllers/get-messages-by-ticket'
import { makeGetMessagesByTicketValidator } from '../validators/get-messages-by-ticket'

export const makeGetMessagesByTicketController = (): GetMessagesByTicketController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const getMessagesByTicketService = new GetMessagesByTicketService(ticketRepositoryPG, loginRepositoryPG, messageRepositoryPG)
  return new GetMessagesByTicketController(makeGetMessagesByTicketValidator(), getMessagesByTicketService)
}
