import { LoginModel } from './login'
import { TicketStatusModel } from './ticket-status'

export interface TicketModel {
  id?: number
  subject: string
  createAt: Date
  updateAt: Date
  loginClient: LoginModel
  loginSuport?: LoginModel
  ticketStatus: TicketStatusModel
}
