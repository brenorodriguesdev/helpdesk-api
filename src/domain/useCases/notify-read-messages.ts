import { NotifyReadMessagesModel } from '../models/notify-read-messages'

export interface NotifyReadMessagesUseCase {
  notify: (notify: NotifyReadMessagesModel) => Promise<void>
}
