import { TicketModel } from '../models/ticket'

export interface GetTicketsByClientUseCase {
  get: (idLoginClient: number) => Promise<TicketModel[]>
}
