import { NotifyMessageModel } from '../models/notify-message'

export interface NotifyMessageUseCase {
  notify: (notify: NotifyMessageModel) => Promise<void>
}
