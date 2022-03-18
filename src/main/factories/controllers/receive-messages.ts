import { ReceiveMessagesService } from '../../../data/services/receive-messages'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { ReceiveMessagesController } from '../../../presentation/controllers/receive-messages'
import { makeReadMessagesValidator } from '../validators/read-messages'

export const makeReceiveMessagesController = (): ReceiveMessagesController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const receiveMessagesService = new ReceiveMessagesService(ticketRepositoryPG, loginRepositoryPG, messageRepositoryPG)
  return new ReceiveMessagesController(makeReadMessagesValidator(), receiveMessagesService)
}
