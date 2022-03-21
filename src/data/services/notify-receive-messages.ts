import { NotifyReadMessagesModel } from '../../domain/models/notify-read-messages'
import { NotifyReceiveMessagesUseCase } from '../../domain/useCases/notify-receive-messages'
import { UserConnection } from '../contracts/user-connection'

export class NotifyReceiveMessagesService implements NotifyReceiveMessagesUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async notify ({ idLogin, messages }: NotifyReadMessagesModel): Promise<void> {
    await this.userConnection.sendPacket(idLogin, 'notifyReceiveMessages', messages)
  }
}
