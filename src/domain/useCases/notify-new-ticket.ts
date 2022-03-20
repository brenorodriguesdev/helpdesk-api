import { NotifyNewTicketModel } from '../models/notify-new-ticket'

export interface NotifyNewTicketUseCase {
  notify: (data: NotifyNewTicketModel) => Promise<void>
}
