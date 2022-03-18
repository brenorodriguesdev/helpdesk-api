import { ReadMessagesService } from '../../../data/services/read-messages'
import { LoginRepositoryPG } from '../../../infra/login-repository-pg'
import { MessageRepositoryPG } from '../../../infra/message-repository'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { ReadMessagesController } from '../../../presentation/controllers/read-messages'
import { makeReadMessagesValidator } from '../validators/read-messages'

export const makeReadMessagesController = (): ReadMessagesController => {
  const loginRepositoryPG = new LoginRepositoryPG()
  const ticketRepositoryPG = new TicketRepositoryPG()
  const messageRepositoryPG = new MessageRepositoryPG()
  const readMessagesService = new ReadMessagesService(ticketRepositoryPG, loginRepositoryPG, messageRepositoryPG)
  return new ReadMessagesController(makeReadMessagesValidator(), readMessagesService)
}
