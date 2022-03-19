import { OnDisconnectUseCase } from '../../domain/useCases/on-disconnect'
import { UserConnection } from '../contracts/user-connection'

export class OnDisconnectService implements OnDisconnectUseCase {
  constructor (private readonly userConnection: UserConnection) {}
  async disconnect (idLogin: number): Promise<void> {
    await this.userConnection.disconnect(idLogin)
  }
}
