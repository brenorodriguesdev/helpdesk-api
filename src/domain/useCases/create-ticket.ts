import { CreateTicketModel } from '../../create-ticket'

export interface CreateTicketUseCase {
  create: (data: CreateTicketModel) => Promise<void | Error>
}
