import { LoginModel } from './login'
import { MessageStatusModel } from './message-status'
import { TicketModel } from './ticket'

export interface MessageModel {
  id?: number
  body: string
  createAt: Date
  ticket: TicketModel
  loginSend: LoginModel
  messageStatus: MessageStatusModel
}
