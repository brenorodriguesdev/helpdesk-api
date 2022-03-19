import { NotifyMessageService } from '../../../data/services/notify-message'
import { SendMessageService } from '../../../data/services/send-message'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { UserConnectionSocket } from '../../../infra/user-connection-socket'
import { SendMessageController } from '../../../presentation/controllers/send-message'
import { makeSendMessageValidator } from '../validators/send-message'

export const makeSendMessageController = (): SendMessageController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const userConnectionSocket = new UserConnectionSocket()
  const notifyMessageService = new NotifyMessageService(userConnectionSocket)
  const sendMessageService = new SendMessageService(loginRepositoryPG, ticketRepositoryPG, messageRepositoryPG, notifyMessageService)
  return new SendMessageController(makeSendMessageValidator(), sendMessageService)
}
