import { ReadMessagesModel } from '../../domain/models/read-messages'
import { ReadMessagesUseCase } from '../../domain/useCases/read-messages'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class ReadMessagesService implements ReadMessagesUseCase {
  constructor (private readonly ticketRepository: TicketRepository,
    private readonly loginRepository: LoginRepository,
    private readonly messageRepository: MessageRepository) {}

  async read ({ idTicket, idLoginRead }: ReadMessagesModel): Promise<void | Error> {
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    const loginReceive = await this.loginRepository.findById(idLoginRead)
    if (!loginReceive) {
      return new Error('Esse login não existe!')
    }
    const messageStatusSent = 2
    const messageStatusRead = 4
    await this.messageRepository.updateStatusByTicketAndNotLogin(messageStatusSent, loginReceive.id, messageStatusRead)
  }
}
