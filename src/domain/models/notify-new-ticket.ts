import { Ticket } from '../../data/entities/ticket'

export interface NotifyNewTicketModel {
  idLogin: number
  ticket: Ticket
}
