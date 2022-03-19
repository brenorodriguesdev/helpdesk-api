import { TicketModel } from '../../domain/models/ticket'
import { GetTicketsByClientUseCase } from '../../domain/useCases/get-tickets-by-client'
import { TicketRepository } from '../contracts/ticket-repository'

export class GetTicketsByClientService implements GetTicketsByClientUseCase {
  constructor (private readonly ticketRepository: TicketRepository) {}
  async get (idLoginClient: number): Promise<TicketModel[]> {
    const tickets = await this.ticketRepository.getAllByLoginClient(idLoginClient)
    return tickets
  }
}
