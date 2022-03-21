import { NotifyReadMessagesModel } from '../../domain/models/notify-read-messages'
import { NotifyReadMessagesUseCase } from '../../domain/useCases/notify-read-messages'
import { UserConnection } from '../contracts/user-connection'

export class NotifyReadMessagesService implements NotifyReadMessagesUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async notify ({ idLogin, messages }: NotifyReadMessagesModel): Promise<void> {
    await this.userConnection.sendPacket(idLogin, 'notifyReadMessages', messages)
  }
}
