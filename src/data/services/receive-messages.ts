import { ReceiveMessagesModel } from '../../domain/models/receive-messages'
import { ReceiveMessagesUseCase } from '../../domain/useCases/receive-messages'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class ReceiveMessagesService implements ReceiveMessagesUseCase {
  constructor (private readonly ticketRepository: TicketRepository,
    private readonly loginRepository: LoginRepository,
    private readonly messageRepository: MessageRepository) {}

  async receive ({ idLoginReceive, idTicket }: ReceiveMessagesModel): Promise<void | Error> {
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    const loginReceive = await this.loginRepository.findById(idLoginReceive)
    if (!loginReceive) {
      return new Error('Esse login não existe!')
    }
    const messageStatusSent = 2
    const messageStatusReceive = 3
    await this.messageRepository.updateStatusByTicketAndNotLogin(messageStatusSent, loginReceive.id, messageStatusReceive)
  }
}
