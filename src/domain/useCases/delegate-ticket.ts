import { DelegateTicketModel } from '../models/delegate-ticket'

export interface DelegateTicketUseCase {
  delegate: (data: DelegateTicketModel) => Promise<void | Error>
}
