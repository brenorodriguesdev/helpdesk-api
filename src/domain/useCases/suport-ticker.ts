import { SuportTicketModel } from '../models/suport-ticket'

export interface SuportTicketUseCase {
  suport: (data: SuportTicketModel) => Promise<void | Error>
}
