import { ReceiveMessagesModel } from '../models/receive-messages'

export interface ReceiveMessagesUseCase {
  receive: (data: ReceiveMessagesModel) => Promise<void>
}
