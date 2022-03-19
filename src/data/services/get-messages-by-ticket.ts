import { GetMessagesByTicketModel } from '../../domain/models/get-messages-by-ticket'
import { MessageModel } from '../../domain/models/message'
import { GetMessagesByTicketUseCase } from '../../domain/useCases/get-messages-by-ticket'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class GetMessagesByTicketService implements GetMessagesByTicketUseCase {
  constructor (private readonly ticketRepository: TicketRepository,
    private readonly loginRepository: LoginRepository,
    private readonly messageRepository: MessageRepository) {}

  async get ({ idLogin, idTicket }: GetMessagesByTicketModel): Promise<MessageModel[] | Error> {
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    const login = await this.loginRepository.findById(idLogin)
    if (!login) {
      return new Error('Esse login não existe!')
    }
    const client = 1
    const isLoginClient = login.type.id === client
    if (isLoginClient && ticket.loginClient.id !== idLogin) {
      return new Error('Você não tem permissão para ver as mensagens desse ticket!')
    }
    const messages = await this.messageRepository.getByTicket(idTicket)
    return messages
  }
}
