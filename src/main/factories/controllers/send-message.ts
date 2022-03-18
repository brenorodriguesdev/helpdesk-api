import { SendMessageService } from '../../../data/services/send-message'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { SendMessageController } from '../../../presentation/controllers/send-message'
import { makeSendMessageValidator } from '../validators/send-message'

export const makeSendMessageController = (): SendMessageController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const sendMessageService = new SendMessageService(loginRepositoryPG, ticketRepositoryPG, messageRepositoryPG)
  return new SendMessageController(makeSendMessageValidator(), sendMessageService)
}
