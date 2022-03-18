import { Ticket } from '../entities/ticket'

export interface TicketRepository {
  create: (ticket: Ticket) => Promise<Ticket>
}
