import { NotifyMessageModel } from '../models/notify-message'

export interface NotifyReadMessagesUseCase {
  notify: (notify: NotifyMessageModel) => Promise<void>
}
