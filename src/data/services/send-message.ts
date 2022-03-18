import { SendMessageModel } from '../../domain/models/send-message'
import { SendMessageUseCase } from '../../domain/useCases/send-message'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'
import { Message } from '../entities/message'
import { MessageStatus } from '../entities/message-status'

export class SendMessageService implements SendMessageUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly messageRepository: MessageRepository) {}

  async send ({ idLoginSend, idTicket, body }: SendMessageModel): Promise<void | Error> {
    const loginSend = await this.loginRepository.findById(idLoginSend)
    if (!loginSend) {
      return new Error('Esse login não existe!')
    }
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }

    if (ticket.ticketStatus.id !== 2) {
      return new Error('Só é possível enviar mensagens para ticket em suporte!')
    }

    const messageSent: MessageStatus = {
      id: 2,
      name: 'SENT'
    }
    const message: Message = {
      body,
      createAt: new Date(),
      ticket,
      loginSend,
      messageStatus: messageSent
    }

    await this.messageRepository.create(message)
  }
}
