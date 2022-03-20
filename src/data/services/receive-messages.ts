import { ReceiveMessagesModel } from '../../domain/models/receive-messages'
import { NotifyMessageUseCase } from '../../domain/useCases/notify-message'
import { ReceiveMessagesUseCase } from '../../domain/useCases/receive-messages'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class ReceiveMessagesService implements ReceiveMessagesUseCase {
  constructor (private readonly ticketRepository: TicketRepository,
    private readonly loginRepository: LoginRepository,
    private readonly messageRepository: MessageRepository,
    private readonly notifyMessage: NotifyMessageUseCase) {}

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
    let messagesReceive = await this.messageRepository.getByTicketAndNotLogin(messageStatusSent, loginReceive.id)
    await this.messageRepository.updateStatusByTicketAndNotLogin(messageStatusSent, loginReceive.id, messageStatusReceive)
    const idLogin = loginReceive.id === ticket.loginClient.id ? ticket.loginSuport.id : ticket.loginClient.id
    messagesReceive = messagesReceive.map(message => {
      message.messageStatus.id = messageStatusReceive
      message.messageStatus.name = 'RECEIVE'
      return message
    })
    for (const messageReceive of messagesReceive) {
      await this.notifyMessage.notify({
        idLogin,
        message: messageReceive
      })
    }
  }
}
