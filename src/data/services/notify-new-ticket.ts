import { NotifyNewTicketModel } from '../../domain/models/notify-new-ticket'
import { NotifyNewTicketUseCase } from '../../domain/useCases/notify-new-ticket'
import { UserConnection } from '../contracts/user-connection'

export class NotifyNewTicketService implements NotifyNewTicketUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async notify ({ idLogin, ticket }: NotifyNewTicketModel): Promise<void> {
    await this.userConnection.sendPacket(idLogin, 'notifyNewTicket', ticket)
  }
}
