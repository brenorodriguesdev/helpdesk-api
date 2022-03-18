import { ReadMessagesModel } from '../models/read-messages'

export interface ReadMessagesUseCase {
  read: (data: ReadMessagesModel) => Promise<void | Error>
}
