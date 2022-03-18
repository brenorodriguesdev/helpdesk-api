import { DelegateTicketModel } from '../../domain/models/delegate-ticket'
import { DelegateTicketUseCase } from '../../domain/useCases/delegate-ticket'
import { LoginRepository } from '../contracts/login-repository'
import { TicketRepository } from '../contracts/ticket-repository'

export class DelegateTicketService implements DelegateTicketUseCase {
  constructor (private readonly loginRepository: LoginRepository,
    private readonly ticketRepository: TicketRepository) {}

  async delegate ({ idFromSuportLogin, idToSuportLogin, idTicket }: DelegateTicketModel): Promise<void | Error> {
    const suportFromLogin = await this.loginRepository.findById(idFromSuportLogin)
    if (!suportFromLogin) {
      return new Error('O login que está delegando não existe!')
    }
    const toSuportLogin = await this.loginRepository.findById(idToSuportLogin)
    if (!toSuportLogin) {
      return new Error('O login que está sendo delegado não existe!')
    }
    const ticket = await this.ticketRepository.findById(idTicket)
    if (!ticket) {
      return new Error('Esse ticket não existe!')
    }
    ticket.loginSuport = toSuportLogin
    await this.ticketRepository.update(ticket)
  }
}
