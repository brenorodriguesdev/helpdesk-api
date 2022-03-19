import { GetMessagesByTicketModel } from '../models/get-messages-by-ticket'
import { MessageModel } from '../models/message'

export interface GetMessagesByTicketUseCase {
  get: (data: GetMessagesByTicketModel) => Promise<MessageModel[] | Error>
}
