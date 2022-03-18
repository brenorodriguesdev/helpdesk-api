import { Login } from './login'
import { TicketStatus } from './ticket-status'

export interface Ticket {
  id?: number
  subject: string
  createAt: Date
  updateAt: Date
  loginClient: Login
  loginSuport?: Login
  ticketStatus: TicketStatus
}
