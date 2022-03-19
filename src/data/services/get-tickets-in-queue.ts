import { TicketModel } from '../../domain/models/ticket'
import { GetTicketsInQueueUseCase } from '../../domain/useCases/get-tickets-in-queue'
import { TicketRepository } from '../contracts/ticket-repository'

export class GetTicketsInQueueService implements GetTicketsInQueueUseCase {
  constructor (private readonly ticketRepository: TicketRepository) {}
  async get (): Promise<TicketModel[]> {
    const ticketInQueue = 2
    const tickets = await this.ticketRepository.getAllByTicketStatus(ticketInQueue)
    return tickets
  }
}
