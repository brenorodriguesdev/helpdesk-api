import { CreateTicketModel } from '../../domain/models/create-ticket'
import { CreateTicketUseCase } from '../../domain/useCases/create-ticket'
import { NotifyNewTicketUseCase } from '../../domain/useCases/notify-new-ticket'
import { LoginRepository } from '../contracts/login-repository'
import { MessageRepository } from '../contracts/message-repository'
import { TicketRepository } from '../contracts/ticket-repository'
import { Message } from '../entities/message'
import { MessageStatus } from '../entities/message-status'
import { Ticket } from '../entities/ticket'
import { TicketStatus } from '../entities/ticket-status'

export class CreateTicketService implements CreateTicketUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly messageRepository: MessageRepository,
    private readonly notifyNewTicketUseCase: NotifyNewTicketUseCase) {}

  async create ({ subject, idLoginClient, body }: CreateTicketModel): Promise<void | Error> {
    const loginClient = await this.loginRepository.findById(idLoginClient)
    if (!loginClient) {
      return new Error('Esse cliente não existe!')
    }

    const inQueue: TicketStatus = {
      id: 1,
      name: 'IN QUEUE'
    }

    let ticket: Ticket = {
      subject,
      createAt: new Date(),
      updateAt: new Date(),
      loginClient,
      ticketStatus: inQueue
    }

    ticket = await this.ticketRepository.create(ticket)

    const send: MessageStatus = {
      id: 2,
      name: 'SENT'
    }
    const message: Message = {
      body,
      createAt: new Date(),
      ticket,
      loginSend: loginClient,
      messageStatus: send
    }

    await this.messageRepository.create(message)

    const loginTypeSuport = 2
    const loginsSuport = await this.loginRepository.getAllByType(loginTypeSuport)

    for (const loginSuport of loginsSuport) {
      await this.notifyNewTicketUseCase.notify({
        idLogin: loginSuport.id,
        ticket
      })
    }
  }
}
