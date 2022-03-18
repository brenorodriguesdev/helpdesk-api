import {
  signInParamsSchema,
  signUpParamsSchema,
  createTicketParamsSchema,
  suportTicketParamsSchema,
  finishTicketParamsSchema,
  sendMessageParamsSchema
} from './schemas/'

export default {
  signInParams: signInParamsSchema,
  signUpParams: signUpParamsSchema,
  createTicketParams: createTicketParamsSchema,
  suportTicketParams: suportTicketParamsSchema,
  finishTicketParams: finishTicketParamsSchema,
  sendMessageParams: sendMessageParamsSchema
}
