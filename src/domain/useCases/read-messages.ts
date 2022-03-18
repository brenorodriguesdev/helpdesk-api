import { ReceiveMessagesModel } from '../models/receive-messages'

export interface ReadMessagesUseCase {
  read: (data: ReceiveMessagesModel) => Promise<void>
}
