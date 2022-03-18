import { Ticket } from '../entities/ticket'

export interface TicketRepository {
  create: (ticket: Ticket) => Promise<Ticket>
  findById: (id: number) => Promise<Ticket>
  update: (ticket: Ticket) => Promise<void>
}
