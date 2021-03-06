import { Ticket } from '../entities/ticket'

export interface TicketRepository {
  create: (ticket: Ticket) => Promise<Ticket>
  findById: (id: number) => Promise<Ticket>
  update: (ticket: Ticket) => Promise<void>
  getAllByLoginClient: (idLoginClient) => Promise<Ticket[]>
  getAllByLoginSuport: (idLoginSuport) => Promise<Ticket[]>
  getAllByTicketStatus: (idTicketStatus) => Promise<Ticket[]>
}
