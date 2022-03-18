import { SuportTicketModel } from '../../domain/models/suport-ticket'
import { SuportTicketUseCase } from '../../domain/useCases/suport-ticker'
import { LoginRepository } from '../contracts/login-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class SuportTicketService implements SuportTicketUseCase {
  constructor (private readonly loginRepository: LoginRepository, private readonly ticketRepository: TicketRepository) {}
  async suport ({ idLoginSuport, idTicket }: SuportTicketModel): Promise<void | Error> {
    const loginSuport = await this.loginRepository.findById(idLoginSuport)
    if (!loginSuport) {
      return new Error('Esse atendente não existe!')
    }
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    ticket.updateAt = new Date()
    ticket.ticketStatus.id = 2
    ticket.ticketStatus.name = 'IN SUPORT'
    await this.ticketRepository.update(ticket)
  }
}
