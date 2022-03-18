import { TicketModel } from '../models/ticket'

export interface GetTicketsBySuportUseCase {
  get: (idLoginSuport: number) => Promise<TicketModel[]>
}
