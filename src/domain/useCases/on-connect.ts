import { OnConnectModel } from '../models/on-connect'

export interface OnConnectUseCase {
  connect: (data: OnConnectModel) => Promise<void>
}
