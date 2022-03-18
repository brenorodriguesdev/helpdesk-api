import { MessageStatus } from './message-status'
import { Ticket } from './ticket'

export interface Message {
  id?: number
  body: string
  createAt: Date
  ticket: Ticket
  messageStatus: MessageStatus
}
