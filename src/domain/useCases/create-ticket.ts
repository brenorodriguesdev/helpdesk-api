import { CreateTicketModel } from '../models/create-ticket'

export interface CreateTicketUseCase {
  create: (data: CreateTicketModel) => Promise<void>
}
