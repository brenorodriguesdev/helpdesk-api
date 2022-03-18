import { TicketModel } from '../models/ticket'

export interface GetTicketsInQueueUseCase {
  get: () => Promise<TicketModel[]>
}
