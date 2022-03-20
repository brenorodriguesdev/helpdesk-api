import { CreateTicketService } from '../../../data/services/create-ticket'
import { NotifyNewTicketService } from '../../../data/services/notify-new-ticket'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { CreateTicketController } from '../../../presentation/controllers/create-ticket'
import { makeCreateTicketValidator } from '../validators/create-ticket'

export const makeCreateTicketController = (): CreateTicketController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const userConnectionSocket = new UserConnectionSocket()
  const notifyNewTicketService = new NotifyNewTicketService(userConnectionSocket)
  const createTicketService = new CreateTicketService(loginRepositoryPG, ticketRepositoryPG, messageRepositoryPG, notifyNewTicketService)
  return new CreateTicketController(makeCreateTicketValidator(), createTicketService)
}
