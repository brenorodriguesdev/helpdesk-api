import {
  signInParamsSchema,
  signUpParamsSchema,
  createTicketParamsSchema,
  suportTicketParamsSchema,
  finishTicketParamsSchema,
  sendMessageParamsSchema,
  receiveMessagesParamsSchema
} from './schemas/'

export default {
  signInParams: signInParamsSchema,
  signUpParams: signUpParamsSchema,
  createTicketParams: createTicketParamsSchema,
  suportTicketParams: suportTicketParamsSchema,
  finishTicketParams: finishTicketParamsSchema,
  sendMessageParams: sendMessageParamsSchema,
  receiveMessagesParams: receiveMessagesParamsSchema
}
