import { NotifyReceiveMessagesModel } from '../models/notify-receive-messages'

export interface NotifyReceiveMessagesUseCase {
  notify: (notify: NotifyReceiveMessagesModel) => Promise<void>
}
