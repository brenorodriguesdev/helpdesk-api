import { ReadMessagesModel } from '../../domain/models/read-messages'
import { NotifyMessageUseCase } from '../../domain/useCases/notify-message'
import { ReadMessagesUseCase } from '../../domain/useCases/read-messages'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class ReadMessagesService implements ReadMessagesUseCase {
  constructor (private readonly ticketRepository: TicketRepository,
    private readonly loginRepository: LoginRepository,
    private readonly messageRepository: MessageRepository,
    private readonly notifyMessage: NotifyMessageUseCase) {}

  async read ({ idTicket, idLoginRead }: ReadMessagesModel): Promise<void | Error> {
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    const loginRead = await this.loginRepository.findById(idLoginRead)
    if (!loginRead) {
      return new Error('Esse login não existe!')
    }
    const messageStatusReceive = 3
    const messageStatusRead = 4
    let messagesRead = await this.messageRepository.getByTicketAndNotLogin(messageStatusReceive, loginRead.id)
    await this.messageRepository.updateStatusByTicketAndNotLogin(messageStatusReceive, loginRead.id, messageStatusRead)
    const idLogin = loginRead.id === ticket.loginClient.id ? ticket.loginSuport.id : ticket.loginClient.id
    messagesRead = messagesRead.map(message => {
      message.messageStatus.id = messageStatusRead
      message.messageStatus.name = 'READ'
      return message
    })
    for (const messageRead of messagesRead) {
      await this.notifyMessage.notify({
        idLogin,
        message: messageRead
      })
    }
  }
}
