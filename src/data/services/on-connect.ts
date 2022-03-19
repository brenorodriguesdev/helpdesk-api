import { OnConnectModel } from '../../domain/models/on-connect'
import { OnConnectUseCase } from '../../domain/useCases/on-connect'
import { UserConnection } from '../contracts/user-connection'

export class OnConnectService implements OnConnectUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async connect ({ idLogin, idConnection }: OnConnectModel): Promise<void> {
    await this.userConnection.connect(idLogin, idConnection)
  }
}
