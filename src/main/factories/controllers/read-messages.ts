import { NotifyMessageService } from '../../../data/services/notify-message'
import { ReadMessagesService } from '../../../data/services/read-messages'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { ReadMessagesController } from '../../../presentation/controllers/read-messages'
import { makeReadMessagesValidator } from '../validators/read-messages'

export const makeReadMessagesController = (): ReadMessagesController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const userConnectionSocket = new UserConnectionSocket()
  const notifyMessageService = new NotifyMessageService(userConnectionSocket)
  const readMessagesService = new ReadMessagesService(ticketRepositoryPG, loginRepositoryPG, messageRepositoryPG, notifyMessageService)
  return new ReadMessagesController(makeReadMessagesValidator(), readMessagesService)
}
