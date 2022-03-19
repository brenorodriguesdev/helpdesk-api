import { NotifyMessageService } from '../../../data/services/notify-message'
import { ReceiveMessagesService } from '../../../data/services/receive-messages'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { ReceiveMessagesController } from '../../../presentation/controllers/receive-messages'
import { makeReceiveMessagesValidator } from '../validators/receive-messages'

export const makeReceiveMessagesController = (): ReceiveMessagesController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const userConnectionSocket = new UserConnectionSocket()
  const notifyMessageService = new NotifyMessageService(userConnectionSocket)
  const receiveMessagesService = new ReceiveMessagesService(ticketRepositoryPG, loginRepositoryPG, messageRepositoryPG, notifyMessageService)
  return new ReceiveMessagesController(makeReceiveMessagesValidator(), receiveMessagesService)
}
