import { MessageModel } from './message'

export interface NotifyReceiveMessagesModel {
  idLogin: number
  messages: MessageModel[]
}
