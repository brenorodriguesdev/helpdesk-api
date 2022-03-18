export interface FinishTicketUseCase {
  finish: (idTicket: number) => Promise<void>
}
