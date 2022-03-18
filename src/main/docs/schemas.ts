import {
  signInParamsSchema,
  signUpParamsSchema,
  createTicketParamsSchema,
  suportTicketParamsSchema,
  finishTicketParamsSchema,
  sendMessageParamsSchema,
  receiveMessagesParamsSchema,
  readMessagesParamsSchema,
  delegateTicketParamsSchema
} from './schemas/'

export default {
  signInParams: signInParamsSchema,
  signUpParams: signUpParamsSchema,
  createTicketParams: createTicketParamsSchema,
  suportTicketParams: suportTicketParamsSchema,
  finishTicketParams: finishTicketParamsSchema,
  sendMessageParams: sendMessageParamsSchema,
  receiveMessagesParams: receiveMessagesParamsSchema,
  readMessagesParams: readMessagesParamsSchema,
  delegateTicketParams: delegateTicketParamsSchema
}
