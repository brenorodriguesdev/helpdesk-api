import { Message } from '../entities/message'

export interface MessageRepository {
  create: (message: Message) => Promise<Message>
}
