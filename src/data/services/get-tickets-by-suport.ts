import { TicketModel } from '../../domain/models/ticket'
import { GetTicketsBySuportUseCase } from '../../domain/useCases/get-tickets-by-suport'
import { TicketRepository } from '../contracts/ticket-repository'

export class GetTicketsBySuportService implements GetTicketsBySuportUseCase {
  constructor (private readonly ticketRepository: TicketRepository) {}
  async get (idLoginSuport: number): Promise<TicketModel[]> {
    const tickets = await this.ticketRepository.getAllByLoginSuport(idLoginSuport)
    return tickets
  }
}
