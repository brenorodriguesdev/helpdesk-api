export const receiveMessagesParamsSchema = {
  type: 'object',
  properties: {
    idTicket: {
      type: 'integer'
    }
  },
  required: ['idTicket']
}
