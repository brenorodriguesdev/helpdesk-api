import { SendMessageModel } from '../models/send-message'

export interface SendMessageUseCase {
  send: (data: SendMessageModel) => Promise<void | Error>
}
