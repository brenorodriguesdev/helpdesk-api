import { MessageModel } from './message'

export interface NotifyReadMessagesModel {
  idLogin: number
  messages: MessageModel[]
}
