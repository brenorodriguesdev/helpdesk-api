import { GetTicketsInQueueService } from '../../../data/services/get-tickets-in-queue'
import { TicketRepositoryPG } from '../../../infra/ticket-repository-pg'
import { GetTicketsInQueueController } from '../../../presentation/controllers/get-tickets-in-queue'

export const makeGetTicketsInQueueController = (): GetTicketsInQueueController => {
  const ticketRepositoryPG = new TicketRepositoryPG()
  const getTicketsInQueueService = new GetTicketsInQueueService(ticketRepositoryPG)
  return new GetTicketsInQueueController(getTicketsInQueueService)
}
