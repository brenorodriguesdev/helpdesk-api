import { NotifyMessageModel } from '../../domain/models/notify-message'
import { NotifyMessageUseCase } from '../../domain/useCases/notify-message'
import { UserConnection } from '../contracts/user-connection'

export class NotifyMessageService implements NotifyMessageUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async notify ({ idLogin, message }: NotifyMessageModel): Promise<void> {
    await this.userConnection.sendPacket(idLogin, 'notifyMessage', message)
  }
}
