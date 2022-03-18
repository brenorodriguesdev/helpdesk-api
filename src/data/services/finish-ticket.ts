import { FinishTicketUseCase } from '../../domain/useCases/finish-ticket'
import { TicketRepository } from '../contracts/ticket-repository'

export class FinishTicketService implements FinishTicketUseCase {
  constructor (private readonly ticketRepository: TicketRepository) {}
  async finish (idTicket: number): Promise<void | Error> {
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    ticket.ticketStatus.id = 3
    ticket.ticketStatus.name = 'FINISH'
    await this.ticketRepository.update(ticket)
  }
}
